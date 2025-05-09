import { Domain } from '@/ext/sloth/apps/rest/domain-factory.ts'
import { z } from 'npm:zod'
import { KeyPathParamsSchema } from '../schemas.ts'
import { kv } from '@/ext/deno/kv/instance.ts'

export const PutBodySchema = z.object({
    value: z.unknown().describe('Any JSON-compatible value to store at this key'),
    ttl: z.number().int().positive().optional().describe('Optional TTL in milliseconds')
})

export default (domain: Domain) => {
    domain
        .addRoute('put', '/kv/{keypath}', async (c) => {
            const keypath = (c.req.param('keypath') || "").split('.')
            const body = await c.req.json()
            const parsed = PutBodySchema.safeParse(body)

            if (!parsed.success) {
                return c.json({ error: parsed.error.message }, 400)
            }

            await kv.set(keypath, parsed.data.value, parsed.data.ttl ? { expireIn: parsed.data.ttl } : undefined)

            return c.json({ key: keypath.join('.'), stored: true })
        })
        .addParams(KeyPathParamsSchema)
        .addBody(PutBodySchema)
        .addResponse(200, z.object({
            key: z.string(),
            stored: z.boolean()
        }))
        .addResponse(400, z.object({
            error: z.string()
        }))
}

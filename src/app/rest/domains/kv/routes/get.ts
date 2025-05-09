import { Domain } from '@/ext/sloth/apps/rest/domain-factory.ts'
import { z } from 'npm:zod'
import { KeyPathParamsSchema } from '../schemas.ts'
import { kv } from '@/ext/deno/kv/instance.ts'

export const ListQuerySchema = z.object({
    list: z.string().optional().describe('If set to true, lists all keys under the keypath prefix')
})

export default (domain: Domain) => {
    domain
        .addRoute('get', '/kv/{keypath}', async (c) => {
            const keypath = c.req.param('keypath').split('.')
            const listMode = c.req.query('list') === 'true'

            if (listMode) {
                const results: string[] = []
                for await (const entry of kv.list({ prefix: keypath })) {
                    results.push(entry.key.join('.'))
                }
                return c.json({ keys: results })
            } else {
                const result = await kv.get(keypath)
                if (!result.value) {
                    return c.json({ error: 'Key not found' }, 404)
                }
                return c.json(result.value)
            }
        })
        .addParams(KeyPathParamsSchema)
        .addQuery(ListQuerySchema)
        .addResponse(200, z.unknown())
        .addResponse(404, z.object({ error: z.literal('Key not found') }))
}

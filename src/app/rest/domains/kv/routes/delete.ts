import { Domain } from '@/ext/sloth/apps/rest/domain-factory.ts'
import { z } from 'npm:zod'
import { KeyPathParamsSchema } from '../schemas.ts'
import { kv } from '@/ext/deno/kv/instance.ts'

export default (domain: Domain) => {
    domain
        .addRoute('delete', '/kv/{keypath}', async (c) => {
            const keypath = c.req.param('keypath').split('.')
            await kv.delete(keypath)

            return c.json({ key: keypath.join('.') })
        })
        .addParams(KeyPathParamsSchema)
        .addResponse(200, z.object({
            key: z.string()
        }))
}

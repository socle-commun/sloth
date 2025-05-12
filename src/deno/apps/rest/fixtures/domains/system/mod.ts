import { Context } from 'https://deno.land/x/hono@v4.3.7/mod.ts'
import { z } from 'npm:zod'
import { Domain } from '../../../domain.class.ts'

const StatusResponseSchema = z.object({
    uptime: z.number().describe('System uptime in seconds'),
    memoryUsage: z.object({
        rss: z.number(),
        heapTotal: z.number(),
        heapUsed: z.number(),
        external: z.number()
    }),
    timestamp: z.string()
})

export default () => {
    const domain = new Domain('🛠️ System', import.meta.url)

    domain.addRoute('get', '/status', (c: Context) => {
        const memory = Deno.memoryUsage()
        const uptime = Deno.osUptime()
        const timestamp = new Date().toISOString()
        return c.json({ uptime, memoryUsage: memory, timestamp })
    }).addResponse(200, StatusResponseSchema)

    return domain
}

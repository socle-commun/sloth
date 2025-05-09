import { Context } from 'https://deno.land/x/hono@v4.3.7/context.ts'
import { z } from 'npm:zod'
import { Domain } from '@/ext/sloth/apps/rest/domain-factory.ts'
import { getProjectVersion } from '@/ext/deno/util/get-project-version.ts'

export default () => {
    const domain = new Domain('🛠️ System', import.meta.url)

    // GET /
    domain.addRoute('get', '/', (c: Context) => {
        return c.json({ message: 'API is running' })
    })

    // GET /version
    const VersionResponseSchema = z.object({
        version: z.string().describe('Project version from deno.jsonc'),
        commit: z.string().optional().describe('Current commit SHA if available')
    })

    domain.addRoute('get', '/version', async (c: Context) => {
        const version = await getProjectVersion()
        const commit = Deno.env.get('GIT_COMMIT') || 'unknown'
        return c.json({ version, commit })
    }).addResponse(200, VersionResponseSchema)

    // GET /status
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

    domain.addRoute('get', '/status', (c: Context) => {
        const memory = Deno.memoryUsage()
        const uptime = Deno.osUptime()
        const timestamp = new Date().toISOString()
        return c.json({ uptime, memoryUsage: memory, timestamp })
    }).addResponse(200, StatusResponseSchema)

    return domain
}

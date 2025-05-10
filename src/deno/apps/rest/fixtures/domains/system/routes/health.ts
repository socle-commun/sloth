import { z } from 'zod'
import { Domain } from '@/deno/apps/rest/domain.class.ts'
import { Context } from 'hono'

const HealthResponseSchema = z.object({
    status: z.enum(['ok', 'degraded'], {
        description: 'Overall system health status: "ok" if all systems are operational, "degraded" if some checks failed.',
    }),
    uptime: z.number().nonnegative().describe('System uptime in seconds since last boot.'),
    timestamp: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, 'Must be a valid ISO 8601 UTC timestamp')
        .describe('Current server timestamp in ISO 8601 UTC format, e.g., 2025-05-08T12:34:56Z.')
});

export default (domain: Domain) => {
    domain.addRoute('get', '/health', (c: Context) => {
        const result: z.infer<typeof HealthResponseSchema> = {
            status: 'ok',
            uptime: Deno.osUptime(),
            timestamp: new Date().toISOString()
        };

        return c.json(result);
    })
    .addResponse(200, HealthResponseSchema)
}
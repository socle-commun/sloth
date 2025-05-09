import { MiddlewareHandler } from 'npm:hono'
import getEnv from '@/ext/deno/env/mod.ts'

export type ENV  = 'BEARER_TOKEN'

export const bearerAuthMiddleware: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header('authorization')
    const expectedToken = getEnv<ENV>("BEARER_TOKEN")

    if (!expectedToken) {
        console.warn('Server misconfigured: no BEARER_TOKEN set', 500)
        return await next()
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.text('Unauthorized: missing Bearer token', 401)
    }

    const token = authHeader.slice('Bearer '.length).trim()

    if (token !== expectedToken) {
        return c.text('Unauthorized: invalid Bearer token', 403)
    }

    await next()
}

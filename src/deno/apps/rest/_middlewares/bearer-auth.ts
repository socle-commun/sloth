import { MiddlewareHandler } from 'https://deno.land/x/hono@v4.3.7/mod.ts'
import getEnv from '../../../utils/env/mod.ts'

export type ENV  = 'BEARER_TOKEN'

/**
 * bearerAuthMiddleware
 * 
 * 🔒 Hono middleware enforcing Bearer token authentication.
 * 
 * Features:
 * - Reads token from Authorization header.
 * - Compares it with the BEARER_TOKEN env variable.
 * - Returns 401 or 403 on missing/invalid tokens.
 * 
 */
export const bearerAuthMiddleware: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header('authorization')
    const expectedToken = getEnv<ENV>("BEARER_TOKEN")

    if (!expectedToken) {
        console.warn('Server misconfigured: no BEARER_TOKEN set')
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

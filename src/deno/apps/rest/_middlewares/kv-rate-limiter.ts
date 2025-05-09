import { Context, MiddlewareHandler, Next } from 'https://deno.land/x/hono@v4.3.7/mod.ts'
import { StatusCode } from 'https://deno.land/x/hono@v4.3.7/utils/http-status.ts'

const kv = await Deno.openKv()

/**
 * kvRateLimiter
 * 
 * 🛡️ Rate limiting middleware using Deno KV as backend.
 * 
 * Features:
 * - Limits number of requests per IP or custom key.
 * - Configurable window and max requests.
 * - Automatically resets counters after window expiration.
 * 
 */
export function kvRateLimiter(options: {
  windowMs: number
  max: number
  keyGenerator?: (c: Context) => string
  message?: string
  statusCode?: StatusCode
}): MiddlewareHandler {
  const {
    windowMs,
    max,
    keyGenerator = (c) => c.req.header('x-forwarded-for') || c.req.raw.headers.get('x-real-ip') || 'unknown',
    message = '🐧',
    statusCode = 429,
  } = options

  return async (c: Context, next: Next) => {
    const key = `ratelimit:${keyGenerator(c)}`
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean up old entries (optional if using a rolling window)
    // We'll just overwrite for simplicity

    const record = await kv.get<{ count: number; lastRequest: number }>([key])

    if (!record.value || record.value.lastRequest < windowStart) {
      // Reset window
      await kv.set([key], { count: 1, lastRequest: now }, { expireIn: windowMs })
    } else if (record.value.count < max) {
      // Increment count
      await kv.set([key], { count: record.value.count + 1, lastRequest: now }, { expireIn: windowMs })
    } else {
      // Exceeded
      return c.text('', statusCode)
    }

    await next()
  }
}

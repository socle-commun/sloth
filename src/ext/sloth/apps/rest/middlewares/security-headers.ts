import { Context, Next } from 'https://deno.land/x/hono@v4.3.7/mod.ts'

export default async (c: Context, next: Next) => {
    // Empêche le navigateur d’interpréter le contenu différemment
    c.res.headers.set('X-Content-Type-Options', 'nosniff')

    // Empêche l’iframe embedding (clickjacking)
    c.res.headers.set('X-Frame-Options', 'DENY')

    // Active la protection XSS du navigateur (moins utile sur les navigateurs modernes mais pas mauvais)
    c.res.headers.set('X-XSS-Protection', '1; mode=block')

    // Limite les sources de contenu (Content Security Policy)
    // c.res.headers.set('Content-Security-Policy', "default-src 'self'")

    // Strict Transport Security (HTTPS obligatoire)
    c.res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

    // Referrer policy : réduit les infos transmises dans l’en-tête Referer
    c.res.headers.set('Referrer-Policy', 'no-referrer')

    // Permissions Policy : désactive les API sensibles inutiles
    c.res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

    await next()
}
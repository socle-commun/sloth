import { startTestServer } from '../../tests/helper.ts'


Deno.test('GET /status returns system status', async () => {
    const server = await startTestServer()
    try {
        const res = await fetch(server.url + '/app/status')
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`)
        const json = await res.json()
        if (typeof json.uptime !== 'number' || typeof json.timestamp !== 'string') {
            throw new Error('Invalid /status response format')
        }
    } finally {
        await server.stop()
    }
})

Deno.test('GET /health returns status ok and valid payload', async () => {
    const server = await startTestServer()
    try {
        const response = await fetch(`${server.url}/app/health`)
        if (response.status !== 200) {
            throw new Error(`Expected 200 OK, got ${response.status}`)
        }

        const body = await response.json()

        // Vérifie les champs principaux
        if (body.status !== 'ok' && body.status !== 'degraded') {
            throw new Error(`Invalid status value: ${body.status}`)
        }
        if (typeof body.uptime !== 'number' || body.uptime < 0) {
            throw new Error(`Invalid uptime value: ${body.uptime}`)
        }
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(body.timestamp)) {
            throw new Error(`Invalid timestamp format: ${body.timestamp}`)
        }
    } finally {
        await server.stop()
    }
})

import { startTestServer } from '../../../../../tests/e2e/helper.ts'

const testKey = 'e2e.test.key'
const testValue = { message: 'hello world' }

Deno.test('PUT /kv/{keypath} stores a value', async () => {
    const server = await startTestServer()
    try {
        const res = await fetch(`${server.url}/kv/${testKey}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: testValue })
        })
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`)
        const json = await res.json()
        if (!json.stored || json.key !== testKey) {
            throw new Error(`Invalid PUT response: ${JSON.stringify(json)}`)
        }
    } finally {
        await server.stop()
    }
})

Deno.test('GET /kv/{keypath} retrieves the stored value', async () => {
    const server = await startTestServer()
    try {
        const res = await fetch(`${server.url}/kv/${testKey}`)
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`)
        const json = await res.json()
        if (json.message !== 'hello world') {
            throw new Error(`Expected message 'hello world', got '${json.message}'`)
        }
    } finally {
        await server.stop()
    }
})

Deno.test('DELETE /kv/{keypath} removes the key', async () => {
    const server = await startTestServer()
    try {
        const res = await fetch(`${server.url}/kv/${testKey}`, {
            method: 'DELETE'
        })
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`)
        const json = await res.json()
        if (json.key !== testKey) {
            throw new Error(`Invalid DELETE response: ${JSON.stringify(json)}`)
        }
    } finally {
        await server.stop()
    }
})

Deno.test('GET /kv/{keypath} returns 404 after deletion', async () => {
    const server = await startTestServer()
    try {
        const res = await fetch(`${server.url}/kv/${testKey}`)
        if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`)
        const json = await res.json()
        if (json.error !== 'Key not found') {
            throw new Error(`Expected error 'Key not found', got '${json.error}'`)
        }
    } finally {
        await server.stop()
    }
})

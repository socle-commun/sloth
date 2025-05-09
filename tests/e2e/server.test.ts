import { startTestServer } from './helper.ts'

Deno.test('GET / responds with 200', async () => {
	const server = await startTestServer()

	try {
		const response = await fetch(server.url)
		const body = await response.text()

		console.log('Response status:', response.status)
		console.log('Response body:', body)

		if (response.status !== 200) {
			throw new Error(`Expected 200, got ${response.status}`)
		}
	} finally {
		await server.stop()
	}
})

Deno.test('GET /ui responds with 200', async () => {
	const server = await startTestServer()

	try {
		const response = await fetch(server.url + '/ui')
		const body = await response.text()

		console.log('Response status:', response.status)
		console.log('Response body:', body)

		if (response.status !== 200) {
			throw new Error(`Expected 200, got ${response.status}`)
		}
	} finally {
		await server.stop()
	}
})

Deno.test('GET /doc responds with 200', async () => {
	const server = await startTestServer()

	try {
		const response = await fetch(server.url + "/doc")
		const body = await response.text()

		console.log('Response status:', response.status)
		console.log('Response body:', body)

		if (response.status !== 200) {
			throw new Error(`Expected 200, got ${response.status}`)
		}
	} finally {
		await server.stop()
	}
})
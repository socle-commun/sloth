export interface TestServer {
	process: Deno.ChildProcess
	url: string
	stop: () => Promise<void>
}

export async function startTestServer(
	cmd: string[] = ['deno', 'serve', '--allow-all', '--unstable-kv', 'src/app/rest/main.ts'],
	port = 8000,
	waitMs = 1500
): Promise<TestServer> {
	const command = new Deno.Command(cmd[0], {
		args: cmd.slice(1),
		stdout: 'piped',
		stderr: 'piped'
	})

	const process = command.spawn()
	console.log(`🚀 Test server starting on port ${port}...`)

	// Optionnel : consommer stdout/stderr pour loguer (sinon fuite)
	consumeStream(process.stdout)
	consumeStream(process.stderr)

	// Attendre un délai pour laisser le serveur se lever
	await new Promise((resolve) => setTimeout(resolve, waitMs))

	return {
		process,
		url: `http://localhost:${port}`,
		stop: async () => {
			console.log('🛑 Stopping test server...')
			await process.kill('SIGTERM')
			await process.status
			console.log('✅ Server stopped cleanly')
		}
	}
}

async function consumeStream(stream: ReadableStream<Uint8Array> | null) {
	if (stream) {
		const reader = stream.getReader()
		;(async () => {
			while (true) {
				const { done } = await reader.read()
				if (done) break
			}
		})()
	}
}

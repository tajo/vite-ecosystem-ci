import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	const { dir: pluginPath } = await runInRepo({
		...options,
		repo: 'sveltejs/vite-plugin-svelte',
		branch: 'vite-3',
		build: 'build:ci',
		test: 'test'
	})

	await runInRepo({
		...options,
		repo: 'sveltejs/kit',
		branch: 'vite-3',
		overrides: {
			'@sveltejs/vite-plugin-svelte': `${pluginPath}/packages/vite-plugin-svelte`
		},
		build: 'build',
		test: 'test'
	})
}

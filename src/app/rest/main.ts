import $AppRest from '@/ext/sloth/apps/rest/mod.ts'

const { app } = await $AppRest(import.meta.url)

export default app;
import $AppRest from '../mod.ts'

const { app } = await $AppRest(import.meta.url)

export default app;
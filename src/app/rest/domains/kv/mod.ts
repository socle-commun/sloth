import { Domain } from '@/ext/sloth/apps/rest/domain-factory.ts'

export default () => {
    const domain = new Domain('📦 KV Store', import.meta.url)
    return domain
}

import { ZodObject, ZodRawShape, z } from 'npm:zod'
import { kv } from '@/ext/deno/kv/instance.ts'

export class KvSlot<T> {
    constructor(
        private _name: string,
        private _schema: ZodObject<ZodRawShape>
    ) {}

    async get(key: string[]): Promise<T | null> {
        const res = await kv.get<T>([this._name, ...key])
        if (res.value === null) return null

        const parsed = this._schema.safeParse(res.value)
        if (!parsed.success) {
            console.warn(`❌ Validation failed for [${this._name}/${key.join('/')}]`, parsed.error)
            return res.value
        }

        return parsed.data as T
    }

    async set(key: string[], value: T): Promise<void> {
        const parsed = this._schema.safeParse(value)
        if (!parsed.success) {
            throw new Error(`❌ Cannot set value: validation failed → ${parsed.error}`)
        }

        await kv.set([this._name, ...key], value)
    }

    async delete(key: string[]): Promise<void> {
        await kv.delete([this._name, ...key])
    }

    async list(prefix: string[]): Promise<T[]> {
        const results: T[] = []
        for await (const entry of kv.list<T>({ prefix: [this._name, ...prefix] })) {
            const parsed = this._schema.safeParse(entry.value)
            if (parsed.success) results.push(parsed.data as T)
        }
        return results
    }

    async clear(prefix: string[] = []): Promise<void> {
        for await (const entry of kv.list({ prefix: [this._name, ...prefix] })) {
            await kv.delete(entry.key)
        }
    }
    
    async setWithTTL(key: string[], value: T, ttlMillis: number): Promise<void> {
        const parsed = this._schema.safeParse(value)
        if (!parsed.success) {
            throw new Error(`❌ Cannot set value: validation failed → ${parsed.error}`)
        }
    
        await kv.set([this._name, ...key], value, { expireIn: ttlMillis })
    }
}
import { ZodObject, ZodRawShape, z } from 'npm:zod'
import { kv } from './instance.ts'

/**
 * KvSlotValidationError
 * 
 * 📦 Custom error class for validation failures inside KvSlot.
 * 
 * This class extends Error and encapsulates:
 * - The name of the affected slot.
 * - The specific key that failed.
 * - The Zod error object returned during parsing.
 * 
 * It provides a clear, structured error message for better traceability and 
 * facilitates centralized handling of validation errors above KV operations.
 * 
 * Typical usage:
 * throw new KvSlotValidationError(slotName, key, parsed.error)
 * 
 * 🔔 Note: This error is used in KvSlot methods that require strict validation 
 * (such as set and setWithTTL).
 * 
 */
export class KvSlotValidationError extends Error {
    constructor(message: string, public details?: unknown) {
        super(message)
        this.name = 'KvSlotValidationError'
    }
}

function encodeKey(parts: string[]): string[] {
    return parts.map(p => encodeURIComponent(p))
}

/**
 * KvSlot<T>
 * 
 * 📦 Generic class to manage a named slot in the Deno KV store, with validation using Zod.
 * 
 * Main features:
 * - Encapsulation of KV operations under a specific prefix (_name).
 * - Strict input/output validation using a Zod schema.
 * - Dedicated error class (KvSlotValidationError) for handling validation failures.
 * - TTL (time-to-live) support for temporary entries (expiration in milliseconds).
 * - Configurable logger to track validation warnings.
 * 
 * Typical usage:
 * const slot = new KvSlot<MyType>('users', myZodSchema)
 * await slot.set(['id123'], myData)
 * const user = await slot.get(['id123'])
 * 
 * 🔒 Note: KV keys are automatically encoded to avoid collisions or key errors.
 * 
 */
export class KvSlot<T> {
    constructor(
        private _name: string,
        private _schema: ZodObject<ZodRawShape>,
        private _logger: (msg: string, ...args: unknown[]) => void = console.log
    ) {}

    async get(key: string[]): Promise<T | null> {
        const fullKey = encodeKey([this._name, ...key])
        const res = await kv.get<T>(fullKey)
        if (res.value === null) return null

        const parsed = this._schema.safeParse(res.value)
        if (!parsed.success) {
            this._logger(`❌ Validation failed for [${this._name}/${key.join('/')}]:`, parsed.error)
            return res.value
        }

        return parsed.data as T
    }

    async set(key: string[], value: T): Promise<void> {
        const parsed = this._schema.safeParse(value)
        if (!parsed.success) {
            throw new KvSlotValidationError(`❌ Cannot set value: validation failed → ${parsed.error}`, parsed.error)
        }

        const fullKey = encodeKey([this._name, ...key])
        await kv.set(fullKey, value)
    }

    async delete(key: string[]): Promise<void> {
        const fullKey = encodeKey([this._name, ...key])
        await kv.delete(fullKey)
    }

    async list(prefix: string[]): Promise<T[]> {
        const results: T[] = []
        const fullPrefix = encodeKey([this._name, ...prefix])

        for await (const entry of kv.list<T>({ prefix: fullPrefix })) {
            const parsed = this._schema.safeParse(entry.value)
            if (parsed.success) results.push(parsed.data as T)
        }
        return results
    }

    async clear(prefix: string[] = []): Promise<void> {
        const fullPrefix = encodeKey([this._name, ...prefix])
        for await (const entry of kv.list({ prefix: fullPrefix })) {
            await kv.delete(entry.key)
        }
    }

    async setWithTTL(key: string[], value: T, ttlMillis: number): Promise<void> {
        if (ttlMillis <= 0) {
            throw new Error(`❌ Invalid TTL: must be > 0`)
        }

        const parsed = this._schema.safeParse(value)
        if (!parsed.success) {
            throw new KvSlotValidationError(`❌ Cannot set value: validation failed → ${parsed.error}`, parsed.error)
        }

        const fullKey = encodeKey([this._name, ...key])
        await kv.set(fullKey, value, { expireIn: ttlMillis })
    }
}

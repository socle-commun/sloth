import { assertRejects } from "https://deno.land/std/testing/asserts.ts"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts"
import { KvSlot, KvSlotValidationError } from "./slot.class.ts"
import { z } from "zod"

interface KvMock {
    store: Map<string, unknown>
    get: (key: string[]) => Promise<{ value: unknown | null }>
    set: (key: string[], value: unknown) => Promise<void>
    delete: (key: string[]) => Promise<void>
    list: (args: { prefix: string[] }) => AsyncGenerator<{ key: string[]; value: unknown }>
}


type TestData = { name: string; age: number }
const TestSchema = z.object({
    name: z.string(),
    age: z.number(),
})

// ✅ Tests

Deno.test("KvSlot - set and get valid data", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    const data: TestData = { name: "Alice", age: 30 }
    await slot.set(["user1"], data)

    const result = await slot.get(["user1"])
    assertEquals(result, data)
})

Deno.test("KvSlot - get non-existing key", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    const result = await slot.get(["unknown"])
    assertEquals(result, null)
})

Deno.test("KvSlot - set invalid data should throw KvSlotValidationError", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    const invalidData = { name: "Bob" } // manque 'age'

    await assertRejects(
        async () => {
            await slot.set(["user2"], invalidData as unknown as TestData)
        },
        KvSlotValidationError
    )
})

Deno.test("KvSlot - delete should remove data", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    const data: TestData = { name: "Charlie", age: 25 }
    await slot.set(["user3"], data)

    await slot.delete(["user3"])
    const result = await slot.get(["user3"])

    assertEquals(result, null)
})

Deno.test("KvSlot - list should return matching items", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    await slot.set(["group", "1"], { name: "Dan", age: 20 })
    await slot.set(["group", "2"], { name: "Eve", age: 22 })

    const list = await slot.list(["group"])
    assertEquals(list.length, 2)
})

Deno.test("KvSlot - clear should remove all items under prefix", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    await slot.set(["clear", "1"], { name: "Frank", age: 28 })
    await slot.set(["clear", "2"], { name: "Grace", age: 29 })

    await slot.clear(["clear"])

    const list = await slot.list(["clear"])
    assertEquals(list.length, 0)
})

Deno.test("KvSlot - setWithTTL should store data (mock without actual TTL)", async (): Promise<void> => {
    const slot = new KvSlot<TestData>("testSlot", TestSchema)

    const data: TestData = { name: "Hank", age: 40 }
    await slot.setWithTTL(["user4"], data, 1000)

    const result = await slot.get(["user4"])
    assertEquals(result, data)
})

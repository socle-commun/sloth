import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";
import { deepMerge } from "./deep-merge.ts";

Deno.test("deepMerge - merge simple objects", () => {
    const a = { foo: 1, bar: 2 };
    const b = { bar: 3, baz: 4 };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { foo: 1, bar: 3, baz: 4 });
});

Deno.test("deepMerge - merge nested objects", () => {
    const a = { user: { name: "Alice", age: 30 } };
    const b = { user: { age: 35, active: true } };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { user: { name: "Alice", age: 35, active: true } });
});

Deno.test("deepMerge - merge arrays by concatenation", () => {
    const a = { tags: [1, 2] };
    const b = { tags: [3, 4] };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { tags: [1, 2, 3, 4] });
});

Deno.test("deepMerge - handle primitives overwrite", () => {
    const a = { count: 10 };
    const b = { count: 42 };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { count: 42 });
});

Deno.test("deepMerge - handle null and undefined", () => {
    const a = { val: 123, keep: "yes" };
    const b = { val: null, keep: undefined };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { val: null, keep: undefined });
});

Deno.test("deepMerge - handle dates", () => {
    const dateA = new Date("2023-01-01");
    const dateB = new Date("2024-01-01");
    const a = { date: dateA };
    const b = { date: dateB };
    const result = deepMerge(a, b);
    assertEquals(result.date instanceof Date, true);
    assertEquals(result.date.getTime(), dateB.getTime());
    assertEquals(result.date === dateB, false); // Should be a new Date instance
});

Deno.test("deepMerge - merge with non-overlapping keys", () => {
    const a = { a: 1 };
    const b = { b: 2 };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { a: 1, b: 2 });
});
Deno.test("deepMerge - merge with empty objects", () => {
    const a = {};
    const b = { b: 2 };
    const result = deepMerge(a, b);
    assertEquals(result, { b: 2 });
});
Deno.test("deepMerge - merge with empty arrays", () => {
    const a = { arr: [] };
    const b = { arr: [1, 2] };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { arr: [1, 2] });
});
Deno.test("deepMerge - merge with empty arrays and objects", () => {
    const a = { arr: [], obj: {} };
    const b = { arr: [1, 2], obj: { key: "value" } };
    const result = deepMerge<any>(a, b);
    assertEquals(result, { arr: [1, 2], obj: { key: "value" } });
});
Deno.test("deepMerge - merge with nested arrays and objects", () => {
    const a = { arr: [{ id: 1 }], obj: { key: "value" } };
    const b = { arr: [{ id: 2 }], obj: { key2: "value2" } };
    const result = deepMerge<any>(a, b);
    assertEquals(result, {
        arr: [{ id: 1 }, { id: 2 }],
        obj: { key: "value", key2: "value2" },
    });
});
Deno.test("deepMerge - merge with non-object values", () => {
    const a = { num: 42, str: "hello" };
    const b = { num: 100, str: "world" };
    const result = deepMerge(a, b);
    assertEquals(result, { num: 100, str: "world" });
});
Deno.test("deepMerge - merge with non-object values and arrays", () => {
    const a = { num: 42, str: "hello", arr: [1, 2] };
    const b = { num: 100, str: "world", arr: [3, 4] };
    const result = deepMerge(a, b);
    assertEquals(result, { num: 100, str: "world", arr: [1, 2, 3, 4] });
});
Deno.test("deepMerge - merge with non-object values and nested objects", () => {
    const a: any = { num: 42, str: "hello", obj: { key: "value" } };
    const b: any = { num: 100, str: "world", obj: { key2: "value2" } };
    const result = deepMerge(a, b);
    assertEquals(result, {
        num: 100,
        str: "world",
        obj: { key: "value", key2: "value2" },
    });
});
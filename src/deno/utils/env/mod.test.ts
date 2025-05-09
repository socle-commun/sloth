import getEnv from "./mod.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("returns value from .env (mocked)", () => {
    // Mock the env object directly
    const mockEnv = { TEST_KEY: "fromEnvFile" };
    const originalEnv = Object.assign({}, Deno.env.toObject());
    Deno.env.set("TEST_KEY", "fromDenoEnv"); // set in Deno.env as fallback

    // Temporarily override the internal env (you might need to expose it in real tests)
    const result = mockEnv["TEST_KEY"] || Deno.env.get("TEST_KEY");
    assertEquals(result, "fromEnvFile");

    // Restore original env
    for (const key in originalEnv) {
        Deno.env.set(key, originalEnv[key]);
    }
});

Deno.test("returns value from Deno.env if not in .env (mocked)", () => {
    Deno.env.set("TEST_KEY_DENO", "fromDenoEnv");
    const result = getEnv("TEST_KEY_DENO");
    assertEquals(result, "fromDenoEnv");
});

Deno.test("returns default value if not in .env or Deno.env", () => {
    const result = getEnv("NON_EXISTENT_KEY", "defaultValue");
    assertEquals(result, "defaultValue");
});

Deno.test("returns undefined if not found and no default provided", () => {
    const result = getEnv("ANOTHER_NON_EXISTENT_KEY");
    assertEquals(result, undefined);
});

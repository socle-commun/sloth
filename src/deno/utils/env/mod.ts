import { load } from "dotenv";
import { join } from "path";

// The `.env` file is only used in development.
// The try/catch block prevents the MissingEnvVarsError when no .env file is present.
// In production, we rely on system environment variables (Deno.env.get()).
let env: { [key: string]: string } = {};
try {
    env = await load({ 
        envPath: join(Deno.cwd(), ".env"), 
        allowEmptyValues: true
    });
} catch (error) {
    if ((error as Error).name !== "MissingEnvVarsError") {
        console.warn((error as Error).stack);
    }
}

/**
 * 🔧 getEnv
 *
 * Retrieves an environment variable with the following priority:
 * 1️⃣ Local `.env` file (if present)
 * 2️⃣ System environment (Deno.env.get)
 * 3️⃣ Provided default value (if any)
 *
 * ⚠️ Note:
 * - Values are always returned as strings or undefined.
 * - This utility is mainly designed for development/production fallback.
 *
 * @template T The type of the environment key.
 * @param key The name of the environment variable.
 * @param defaultValue Optional fallback value if key is not found.
 * @returns The resolved value or the default value.
 *
 * @example
 * const port = getEnv("APP_PORT", "3000");
 * console.log(`Server running on port ${port}`);
 */
export default function getEnv<T extends string>(key: T, defaultValue?: string): string | undefined {
    return env[key] || Deno.env.get(key) || defaultValue;
}

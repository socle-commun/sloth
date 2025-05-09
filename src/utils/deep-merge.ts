/**
 * 🔧 deepMerge
 *
 * Recursively merges two objects by combining:
 * - Simple objects: deep merge key by key.
 * - Arrays: concatenation ([...target, ...source]).
 * - Date instances: copied by value (new Date instance).
 * - Primitives: the source value overwrites the target value.
 *
 * ⚠️ Note:
 * - Map, Set, RegExp, etc., are not specially handled.
 * - `null` and `undefined` values are copied as-is.
 *
 * @template T The type of the target object.
 * @param target The destination object (base of the result).
 * @param source The source object to merge into target.
 * @returns The merged object (new object, not mutated).
 *
 * @example
 * const a = { name: 'Alice', tags: [1, 2], meta: { age: 30 } };
 * const b = { name: 'Bob', tags: [3], meta: { active: true } };
 * const result = deepMerge(a, b);
 * // Result: { name: 'Bob', tags: [1, 2, 3], meta: { age: 30, active: true } }
 */
export function deepMerge<T extends Record<string, unknown>>(
    target: T,
    source: Partial<T>
): T {
    const output: Record<string, unknown> = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = output[key];

        if (sourceValue === null || sourceValue === undefined) {
            output[key] = sourceValue;
        } else if (Array.isArray(sourceValue)) {
            if (Array.isArray(targetValue)) {
                output[key] = [...targetValue, ...sourceValue];
            } else {
                output[key] = [...sourceValue];
            }
        } else if (sourceValue instanceof Date) {
            output[key] = new Date(sourceValue.getTime());
        } else if (
            typeof sourceValue === 'object' &&
            typeof targetValue === 'object' &&
            !Array.isArray(targetValue)
        ) {
            output[key] = deepMerge(
                targetValue as Record<string, unknown>,
                sourceValue as Record<string, unknown>
            );
        } else {
            output[key] = sourceValue;
        }
    }

    return output as T;
}

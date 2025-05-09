
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
    const output: { [key: string]: unknown} = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            output[key] = deepMerge(output[key] || {}, source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output as T;
}
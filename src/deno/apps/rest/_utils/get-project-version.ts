import { parse } from "https://deno.land/std@0.224.0/jsonc/mod.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function getProjectVersion(path: string = Deno.cwd()): Promise<string> {
  const filePath = join(path, 'deno.jsonc')
  const fileContent = await Deno.readTextFile(filePath)
  const jsoncData = parse(fileContent) as { version: string }

  if (jsoncData && typeof jsoncData.version === 'string') {
    return jsoncData.version
  } else {
    console.warn('⚠️ No "version" field found in deno.jsonc')
    return 'unknown'
  }
}
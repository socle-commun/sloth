# 🦥 **Sloth**

[![Deno module](https://shield.deno.dev/x/sloth.svg)](https://deno.land/x/sloth)
[![License](https://img.shields.io/github/license/socle-commun/sloth)](LICENSE)
[![CI](https://github.com/socle-commun/sloth/actions/workflows/ci.yml/badge.svg)](https://github.com/socle-commun/sloth/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://socle-commun.github.io/sloth)
[![Coverage](https://img.shields.io/codecov/c/github/socle-commun/sloth)](https://codecov.io/gh/socle-commun/sloth)

**Sloth** is a **modular library for Deno**, built to be lightweight, flexible, and adaptable for **any environment**:
🌐 REST APIs, 🛠️ low-level utilities, ⚙️ KV management, 🔒 middlewares, and much more.

---

### 🚀 **Why Sloth?**

✅ **Modular imports** → grab only what you need, no bulky entrypoints.
✅ **Environment- and feature-focused** → organized by platform (`deno`, `node`, etc.) and functional domains (`kv`, `utils`, `rest`, …).
✅ **Strict TypeScript** → full typings for safety, IDE autocompletion, and fewer runtime surprises.
✅ **Minimal by design** → no unnecessary bloat, no forced dependencies.

---

## 📦 **Installation**

```bash
deno add https://deno.land/x/sloth@<version>/mod.ts
```

Or **import specific modules** directly:

```ts
import { KvSlot } from 'https://deno.land/x/sloth@<version>/src/deno/kv/slot.class.ts'
import { deepMerge } from 'https://deno.land/x/sloth@<version>/src/utils/deep-merge.ts'
```

---

## 🏗️ **Project Structure**

| Folder      | Purpose                                                       |
| ----------- | ------------------------------------------------------------- |
| `src/deno`  | Deno-specific modules (e.g., KV, environment, system helpers) |
| `src/utils` | Generic utilities, usable across any environment              |
| `src/apps`  | Reusable app layers (e.g., REST APIs, WebSocket handlers)     |
| `tests/`    | Full suite of E2E and unit tests                              |
| `docs/`     | Detailed per-module documentation                             |

---

## 🔧 **Code Examples**

### ✅ Using a typed Deno KV slot

```ts
import { KvSlot } from 'https://deno.land/x/sloth@<version>/src/deno/kv/slot.class.ts'
import { z } from 'https://deno.land/x/zod/mod.ts'

const userSlot = new KvSlot('users', z.object({
  id: z.string(),
  name: z.string()
}))

await userSlot.set(['123'], { id: '123', name: 'Alice' })
const user = await userSlot.get(['123'])
console.log(user)
```

### ✅ Deep merging objects

```ts
import { deepMerge } from 'https://deno.land/x/sloth@<version>/src/utils/deep-merge.ts'

const base = { a: 1, b: { c: 2 } }
const extra = { b: { d: 3 } }

const result = deepMerge(base, extra)
console.log(result) // { a: 1, b: { c: 2, d: 3 } }
```

---

## 🧩 **Available Modules**

| Module                       | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| `src/deno/env`               | Environment management, `.env` file reading    |
| `src/deno/kv`                | Typed abstraction over Deno KV                 |
| `src/utils/deep-merge.ts`    | Deep object merge utility                      |
| `src/apps/rest` *(optional)* | Modular REST stack with domain-driven routing  |
| *(more coming soon)*         | Additional micro-modules in active development |

---

## 📚 **Per-Module Documentation**

Each module comes with:

* ✅ Clear public API
* ✅ Practical examples
* ✅ Real-world use cases

Check the `docs/` directory for detailed write-ups.

---

## 🚀 **Contributing**

We **welcome contributions**!
Please follow these simple rules:

* Use **strict TypeScript typing**.
* Keep modules **self-contained** — one module = one file or one folder.
* Use **emoji-annotated commits** (we follow the “emoji-commit” convention 📝).
* Provide examples and unit tests for every new module or feature.

Feel free to submit pull requests, bug reports, or feature suggestions!

---

## 🗺️ **Roadmap**

✅ Initial release
🔜 Publish on Deno Land with semantic versioning
🔜 Expand micro-modules and add more real-world integrations
🔜 Improve test coverage and CI pipelines

---

## 📜 **License**

MIT

---

<div align="center">
🦥 *Slow and steady, we build reliable tools.*
</div>

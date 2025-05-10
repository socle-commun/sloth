# 🦥 **Sloth**

[![Deno module](https://shield.deno.dev/x/sloth.svg)](https://deno.land/x/sloth)
[![License](https://img.shields.io/github/license/socle-commun/sloth)](LICENSE)
[![CI](https://github.com/socle-commun/sloth/actions/workflows/ci.yml/badge.svg)](https://github.com/socle-commun/sloth/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://socle-commun.github.io/sloth)
[![Coverage](https://img.shields.io/codecov/c/github/socle-commun/sloth)](https://codecov.io/gh/socle-commun/sloth)

**Sloth** is a **modular Deno library** designed to be lightweight, flexible, and adaptable for **any environment**:
🌐 REST APIs, 🛠️ low-level utilities, ⚙️ KV management, 🔒 middlewares, and much more.

---

### 🚀 **Why Sloth?**

✅ **Pick only what you need** → no bulky global `mod.ts` entry.
✅ **Environment- and feature-organized** → clean separation by platform (`deno`, `node`) and domain (`kv`, `utils`, `rest`, …).
✅ **Strict TypeScript** → full typings, safe autocompletion, fewer runtime surprises.
✅ **Minimal by design** → no unnecessary bloat, no hidden dependencies.

---

## 📦 **Installation**

Sloth does **not** expose a global `mod.ts`.
Instead, **import only the modules you want**:

```ts
import { KvSlot } from 'https://deno.land/x/sloth/kv-slot'
import { deepMerge } from 'https://deno.land/x/sloth/deep-merge'
```

Use `import_map.json` if you prefer cleaner aliases (example provided in the docs).

---

## 🏗️ **Project Structure**

| Folder          | Purpose                                                  |
| --------------- | -------------------------------------------------------- |
| `src/deno`      | Deno-specific modules (KV, `.env` helpers, system tools) |
| `src/utils`     | Pure utilities (merge, clone, type helpers)              |
| `src/apps`      | Reusable app stacks (REST, WebSocket, CLI scaffolds)     |
| `tests/`        | Full test suite, unit + integration                      |
| *(no `mod.ts`)* | Modules are standalone, import them individually         |

---

## 🔧 **Code Examples**

### ✅ Typed Deno KV slot

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

| Module                       | Description                            |
| ---------------------------- | -------------------------------------- |
| `src/deno/env`               | `.env` file reading, environment tools |
| `src/deno/kv`                | Typed abstraction over Deno KV         |
| `src/utils/deep-merge.ts`    | Deep object merge utility              |
| `src/apps/rest` *(optional)* | Modular REST stack, domain-driven      |
| *(more coming soon)*         | Active micro-module development        |

---

## 📚 **Documentation**

Full per-module documentation is hosted externally:

📖 [Read the docs](https://socle-commun.github.io/sloth)

Each module includes:
✅ Public API
✅ Practical examples
✅ Real-world use cases

---

## 🚀 **Contributing**

We **welcome contributions**!
Please follow these simple rules:

✅ Use **strict TypeScript typing**.
✅ Keep modules **self-contained** (one module = one file or folder).
✅ Follow **emoji-annotated commits** (we use the 📝 emoji-commit convention).
✅ Provide **examples + tests** for every new feature.

Submit PRs, bug reports, or feature requests anytime!

---

## 🗺️ **Roadmap**

✅ Initial release
🔜 Publish on Deno Land with semantic versioning
🔜 Expand micro-module library
🔜 Strengthen test coverage + CI pipelines

---

## 📜 **License**

MIT

---

<div align="center">
🦥 *Slow and steady, we build reliable tools.*
</div>

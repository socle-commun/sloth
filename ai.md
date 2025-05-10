# 🧠 AI Project Instruction: Sloth 🦥

This document is intended for **AI agents** assisting in the development, maintenance, or analysis of the **Sloth** project.

---

## 📌 Project Overview

**Sloth** is a **modular Deno library** providing **lightweight**, **highly typed**, and **independent** building blocks for:

* 🌐 REST APIs
* 🛠️ Low-level utilities
* ⚙️ Typed Deno KV management
* 🔒 Middleware layers
* *(and more evolving micro-modules)*

Each module is **standalone** — no global `mod.ts` entry — and designed with **strict TypeScript**.

---

## 🗂️ Key Project Structure

| Folder / Area   | Purpose                                          |
| --------------- | ------------------------------------------------ |
| `src/deno`      | Deno-specific modules (KV, `.env`, system tools) |
| `src/utils`     | General-purpose utilities, cross-environment     |
| `src/apps`      | Ready-to-use app layers (REST, WebSocket, CLI)   |
| `tests/`        | Unit and integration tests per module            |
| *(no `mod.ts`)* | All modules imported individually                |

---

## 🛡️ Core Principles

* ✅ **Strict typing**: Always TypeScript strict mode.
* ✅ **Composable design**: Modules work alone or in composition.
* ✅ **Minimal coupling**: No hidden or implicit dependencies.
* ✅ **Explicitness**: Clear exports, clear signatures, documented APIs.
* ✅ **Performance-conscious**: Minimal footprint, Deno-first optimizations.

---

## 🤖 AI Role and Expectations

When assisting this project, AI should:
✅ Respect modular boundaries — **no assumptions of global imports**.
✅ Provide context-aware suggestions (Deno vs Node vs universal).
✅ Follow the **emoji-commit** convention for commit proposals.
✅ Suggest improvements that **enhance strict typing and test coverage**.
✅ Identify and flag areas needing **examples or clearer documentation**.

---

## 🗺️ Roadmap Hints

AI should prioritize:

* Preparing stable, minimal modules for Deno Land publication.
* Ensuring clear, durable public APIs.
* Identifying opportunities for reusable micro-modules.
* Supporting multi-environment potential (Deno, Node, WASM).

---

## 🛠️ Conventions and Utilities

* Use `KvSlot` for strongly typed Deno KV.
* Use `deepMerge` for safe object merging.
* REST layers should use **domain + route abstractions**, avoiding hardcoded endpoints.
* All modules must include:

  * Strong type annotations
  * Minimal working examples
  * Associated unit tests in `tests/`

---

## 📜 Commit Convention (emoji-commit)

| Emoji | Meaning                    |
| ----- | -------------------------- |
| ✨     | New feature                |
| 🐛    | Bug fix                    |
| ♻️    | Refactor                   |
| 📚    | Documentation              |
| ✅     | Add or improve tests       |
| ⚡     | Performance improvement    |
| 🚀    | Deployment or release prep |
| 🔧    | Config or tooling changes  |

AI **must** include these emojis when suggesting commits.

---

## 📣 Final Reminder

The **philosophy** of Sloth:

* Simple.
* Robust.
* Clean.
* Minimal.

AI suggestions must align with these values, aiming for **quality over quantity**.

---

<div align="center">
🦥 *Slow and steady, we build reliable tools.*
</div>

# 🧠 AI Project Instruction: Sloth 🦥

This document is intended for **AI agents** assisting in the development, maintenance, or analysis of the **Sloth** project.

---

## 📌 Project Overview

Sloth is a **modular library** for the Deno ecosystem.  
It aims to provide **lightweight**, **flexible**, and **highly typed** building blocks for:
- 🌐 REST APIs
- 🛠️ Utilities (low-level functions)
- ⚙️ Typed KV management
- 🔒 Middlewares
- And more…

Modules are designed to work **independently** and follow a **strict TypeScript** codebase.

---

## 🗂️ Key Project Structure

| Folder / Area           | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `src/deno`             | Deno-specific modules (KV, environment, system)    |
| `src/utils`           | Generic utilities reusable across environments      |
| `src/apps`            | Ready-to-use application layers (REST, WebSocket)   |
| `tests/`              | End-to-end and unit tests for each module           |
| `docs/`               | Detailed documentation, examples, usage guides      |

---

## 🛡️ Core Principles

- **Strict typing:** Always use TypeScript’s strict mode.
- **Composable design:** Modules should work standalone or be composed.
- **Minimal coupling:** Avoid unnecessary interdependencies between modules.
- **Explicitness:** Prefer explicit exports, clear function signatures, and documented interfaces.
- **Performance-conscious:** Optimize for lightweight use cases and Deno runtime.

---

## 🤖 AI Role and Expectations

When interacting with this project, the AI should:
✅ Respect the modular boundaries (don’t assume global imports).  
✅ Provide code suggestions that **fit the module context** (Deno vs Node vs agnostic).  
✅ Follow the emoji-commit convention for commit messages.  
✅ Suggest improvements that preserve or enhance **strict typing** and **test coverage**.  
✅ Identify opportunities to add **examples** or **documentation** for under-documented modules.

---

## 🗺️ Roadmap Hints

AI should prioritize:
- Preparing modules for Deno Land publication.
- Ensuring clear API boundaries and stable public interfaces.
- Spotting areas where micro-modules can be extracted or generalized.
- Supporting multi-environment compatibility (Deno, Node, possibly WASM).

---

## 🛠️ Conventions and Utilities

- Use `KvSlot` for typed Deno KV management.
- Use `deepMerge` for deep object merges.
- REST apps should be built using `Domain` and `Route` classes, not hardcoded paths.
- All modules should include:
    - Type annotations
    - Minimal working examples
    - Associated tests in the `tests/` folder

---

## 📜 Commit Convention (emoji-commit)

| Emoji  | Meaning                           |
| ------ | --------------------------------- |
| ✨     | New feature                       |
| 🐛     | Bug fix                           |
| ♻️     | Refactor                          |
| 📚     | Documentation                     |
| ✅     | Add or improve tests              |
| ⚡     | Performance improvement           |
| 🚀     | Deployment / release changes      |
| 🔧     | Configuration / tooling changes   |

AI should use these emojis when preparing or suggesting commits.

---

## 📣 Final Reminder

The tone and philosophy of Sloth are:
- **Simple, robust, and clean.**
- No unnecessary complexity.
- Serve as a reliable, lightweight toolbelt.

AI suggestions should align with these values and aim for **quality over quantity**.

---

🦥 *“Slow and steady, we build reliable tools.”*

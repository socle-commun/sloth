# 🦥 Sloth

**Sloth** est une **librairie modulaire** pour Deno, pensée pour être légère, flexible et adaptée à **tout type d’environnement** :  
🌐 REST API, 🛠️ utilitaires bas-niveau, ⚙️ gestion KV, 🔒 middlewares, et plus encore.

---

## ✨ Principes clés

✅ **Import modulaire** : chaque composant peut être importé séparément, sans point d’entrée global obligatoire.  
✅ **Orienté environnement et features** : organisation par environnement (`deno`, `node`, etc.) et par domaine fonctionnel (`kv`, `utils`, `rest`, …).  
✅ **Typage strict** : tout est écrit en TypeScript strict pour maximiser la sécurité et l’autocomplétion.  
✅ **Pas d’obligation** : utilisez uniquement les modules dont vous avez besoin, sans surcharge.

---

## 📦 Installation

```bash
deno add https://deno.land/x/sloth@<version>/mod.ts
````

**Mais :**
*→ vous pouvez importer directement n’importe quel module spécifique, par exemple :*

```ts
import { KvSlot } from 'https://deno.land/x/sloth@<version>/src/deno/kv/slot.class.ts'
import { deepMerge } from 'https://deno.land/x/sloth@<version>/src/utils/deep-merge.ts'
```

---

## 🏗️ Organisation

| Dossier     | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| `src/deno`  | Modules spécifiques à l’environnement Deno (ex : KV, env, system) |
| `src/utils` | Utilitaires génériques réutilisables dans tous contextes          |
| `src/apps`  | Apps réutilisables comme des briques (par ex. REST, WebSocket)    |
| `tests/`    | Suite de tests E2E et unitaires pour chaque module                |
| `docs/`     | Documentation détaillée module par module                         |

---

## 🔧 Exemples

### Utilisation d’un slot KV typé

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

### Deep merge d’objets

```ts
import { deepMerge } from 'https://deno.land/x/sloth@<version>/src/utils/deep-merge.ts'

const base = { a: 1, b: { c: 2 } }
const extra = { b: { d: 3 } }

const result = deepMerge(base, extra)
console.log(result) // { a: 1, b: { c: 2, d: 3 } }
```

---

## 🧩 Modules disponibles

| Module                        | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `src/deno/env`                | Gestion d’environnement, lecture `.env`         |
| `src/deno/kv`                 | Abstraction typée sur Deno KV                   |
| `src/utils/deep-merge.ts`     | Fusion profonde d’objets                        |
| `src/apps/rest` *(optionnel)* | Stack REST modulaire avec Domain Driven Routing |
| …                             | D’autres modules à venir, orientés micro-cas    |

---

## 📚 Documentation par module

Chaque module est documenté séparément sous `docs/`, avec :
✅ API publique
✅ Exemples
✅ Cas d’usage

---

## 🚀 Contribution

🛠️ Contributions bienvenues !
Merci de suivre les règles suivantes :

* Respect du typage strict TypeScript
* Un module = un fichier ou dossier indépendant
* Commits annotés avec un **emoji** clair (convention “emoji-commit”)
* Ajout d’exemples et de tests pour tout nouveau module

---

## 🗺️ Roadmap

* [ ] Déplacer les modules REST dans un sous-domaine spécifique
* [ ] Ajouter des modules orientés Node.js et Web
* [ ] Générer automatiquement la doc par module à partir des types
* [ ] Publier sur Deno Land avec versioning rigoureux

---

## 📜 Licence

MIT

---

🦥 *Slow and steady, we build reliable tools.*

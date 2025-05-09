# 🌐 example-deno-server

Un **template Deno REST API minimaliste** conçu pour démarrer rapidement un projet moderne, typé, sécurisé et extensible.

---

## 🚀 Pourquoi utiliser ce projet ?

✅ Serveur REST Deno prêt à l’emploi
✅ Architecture modulaire, simple à étendre
✅ Sécurité intégrée (auth, rate limit, headers)
✅ Documentation OpenAPI/Swagger intégrée
✅ Code propre et typé TypeScript
✅ Déploiement automatique via Deno Deploy (GitHub Actions)
✅ Gestion simple des environnements `.env`
✅ **Domain Driven Routing** pour organiser les routes métier

---

## 🏗️ Structure du projet

```
.
├── .github/workflows/         # Workflows CI/CD
├── deno.jsonc                 # Config Deno (tasks, lint, etc.)
├── import-map.json            # Mapping des imports
├── tsconfig.json              # Config TypeScript
├── readme.md                  # Documentation principale
├── .env.example               # Exemple d’environnement local
├── src/
│   ├── app/
│   │   └── rest/
│   │       ├── main.ts        # Entrée principale REST API
│   │       ├── domains/       # Domaines métiers (routes organisées par logique)
│   │       └── middlewares/   # Middlewares : auth, sécurité, rate limit
│   └── ext/
│       └── deno/              # Utilitaires KV, outils internes
└── tests/
    └── e2e/                   # Tests end-to-end
```

---

## ⚙️ Prérequis

* **Deno ≥ 2.2.8** → [Installer Deno](https://deno.land/manual/getting_started/installation)
* Git (pour cloner et versionner)
* **VS Code** recommandé avec l’extension officielle Deno

---

## 🔨 Mise en route

1️⃣ **Cloner le projet**

```bash
git clone git@github.com:socle-commun/example-deno-server.git
cd example-deno-server
```

2️⃣ **Configurer l’environnement local**

```bash
cp .env.example .env
```

3️⃣ **Lancer le serveur en local**

```bash
deno task dev
```

Accès local → [http://localhost:8000](http://localhost:8000)
Swagger UI → [http://localhost:8000/ui](http://localhost:8000/ui)
OpenAPI JSON → [http://localhost:8000/doc](http://localhost:8000/doc)

---

## 🛠️ Commandes disponibles

| Commande                      | Description                              |
| ----------------------------- | ---------------------------------------- |
| `deno task dev`               | Lancer l’API REST en local               |
| `deno task serve`             | Démarrage rapide via `deno serve`        |
| `deno task test:dev`          | Lancer les tests en mode watch           |
| `deno task test:dev:coverage` | Générer un rapport de couverture         |
| `deno task test:ci`           | Exécuter les tests CI avec rapport JUnit |
| `deno fmt`                    | Formatter le code                        |
| `deno lint`                   | Vérifier les problèmes de lint           |
| `deno check`                  | Vérifier les types TypeScript            |

---

## 🌱 Gestion de l’environnement

Les variables sont chargées avec la priorité suivante :
`.env` local → `Deno.env` système → valeur par défaut dans le code

| Variable      | Description                       |
| ------------- | --------------------------------- |
| APP\_NAME     | Nom de l’application              |
| APP\_ENV      | `development` ou `production`     |
| APP\_PORT     | Port d’écoute                     |
| APP\_URL      | URL complète pour les CORS        |
| DOC\_PATH     | Chemin de la doc OpenAPI (`/doc`) |
| UI\_PATH      | Chemin Swagger UI (`/ui`)         |
| BEARER\_TOKEN | Token d’authentification global   |

➡ Voir `.env.example` pour un modèle prêt à l’emploi.

---

## 🔒 Sécurité intégrée

✅ Authentification **Bearer**
✅ Headers de sécurité (XSS, nosniff, HSTS, etc.)
✅ Rate limiter via **Deno KV**
✅ CORS configuré dynamiquement

> 📂 Tous les middlewares sont documentés séparément sous `docs/features/` :
>
> * `bearer-auth.md`
> * `security-headers.md`
> * `kv-rate-limiter.md`
> * `cors.md`

---

## 🏷️ Domain Driven Routing

Le projet adopte une architecture **Domain Driven Routing** :
✅ Chaque domaine métier est isolé dans son propre dossier sous `src/app/rest/domains`.
✅ Les routes, schémas et handlers sont encapsulés dans une instance `Domain`.
✅ Le framework central (`$AppRest`) détecte et branche dynamiquement tous les domaines.
✅ Les métadonnées OpenAPI sont automatiquement extraites des définitions de domaine.

➡ **Documentation détaillée :** [docs/features/domain-driven-routing.md](docs/features/domain-driven-routing.md)

---

## 📚 Documentation et Swagger UI

La documentation OpenAPI est générée automatiquement grâce à **@hono/zod-openapi**.

* JSON brut → `/doc`
* Interface interactive (Swagger UI) → `/ui`

---

## 🚀 Déploiement (Deno Deploy)

Un workflow GitHub Actions (`.github/workflows/deploy.yml`) assure :
✅ Déploiement automatique lors de la publication d’une **release GitHub**
✅ Mise à jour instantanée sur **Deno Deploy**

➡ Assurez-vous de configurer les secrets et le nom du projet dans votre espace Deno Deploy.

---

## 🧪 Tests

Les tests E2E (`tests/e2e/`) vérifient :
✅ Les codes de réponse des routes principales
✅ L’état correct du serveur (start/stop) en local

Exécution des tests :

```bash
deno task test:dev
```

---

## 🌟 Contributions

✅ Forkez le projet
✅ Créez une branche pour vos modifications
✅ Ouvrez une **pull request** détaillée

---

## 🏷️ Licence

MIT © Socle-Commun

---

📂 **Note :** Toute nouvelle feature doit être documentée sous `docs/features/`.

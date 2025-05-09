# Documentation

Cette page décrit le **système de documentation** de l’API REST.

Elle explique :
✅ Comment le schéma OpenAPI est généré automatiquement  
✅ Où trouver et consulter la documentation (`/doc` et `/ui`)  
✅ Comment personnaliser Swagger UI et enrichir la documentation générale

C’est ici que vous apprendrez à exposer vos routes et à documenter vos endpoints proprement.

### OpenAPI

La librairie [`@hono/zod-openapi`](https://github.com/honojs/zod-openapi) permet :

- De générer automatiquement un schéma OpenAPI à partir des routes
- D’exposer ce schéma sur l’endpoint `/doc`

### Swagger UI

La librairie [`@hono/swagger-ui`](https://github.com/honojs/swagger-ui) affiche une interface interactive :

- Disponible sur `/ui`
- Thème sombre personnalisé avec `swagger-themes`

### VitePress

Pour la documentation générale (comme celle que vous lisez), on utilise [VitePress](https://vitepress.dev/).

> **Astuce** : Les pages de cette section sont placées sous `docs/features/`.

---

## ☄️ TODOS

- [ ] Ajouter une section détaillant la **personnalisation de l’interface Swagger UI** :
  - Où modifier les options (`src/app/rest/main.ts`)
  - Comment changer le thème ou les paramètres visuels
  - Astuces pour enrichir l’expérience développeur sur `/ui`
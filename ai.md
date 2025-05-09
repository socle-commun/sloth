Voici le fichier **ai.md** mis à jour, incluant la mention claire de la feature **Domain Driven Routing** :

---

# 🧠 ai.md — Contexte IA

Ce projet est un **template Deno REST API** conçu pour être :
✅ lisible, analysable et modifiable par une intelligence artificielle
✅ organisé avec des conventions claires et typées
✅ accompagné d’une documentation cohérente et d’une architecture modulaire

---

## 📌 Résumé du projet

* **Nom :** example-deno-server
* **Type :** REST API avec Deno + Hono
* **Langage :** TypeScript (strict)
* **Modules clés :**

  * `@hono/zod-openapi` → génération doc OpenAPI
  * `Deno KV` → rate limiter, stockage léger
  * **Domain Driven Routing** → architecture modulaire par domaine métier
  * Middlewares maison → auth, sécurité, gestion d’environnement

---

## 📂 Structure principale

| Dossier                | Contenu                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| `src/app/rest`         | Entrée API, gestion routes, middlewares, discovery automatique des domaines    |
| `src/app/rest/domains` | Domaines métiers organisés selon la logique **Domain Driven Routing**          |
| `src/ext/deno`         | Outils internes Deno (KV, utilitaires)                                         |
| `tests/e2e`            | Tests end-to-end                                                               |
| `.github/workflows`    | Workflows CI/CD GitHub                                                         |
| `doc/features`         | Documentation détaillée par feature, dont `domain-driven-routing.md` (présent) |

---

## 🔒 Sécurité

* Authentification : **Bearer token** (`BEARER_TOKEN`)
* Headers : protection XSS, nosniff, frame, HSTS
* Limitation : **kvRateLimiter** → 100 req/min par IP
* CORS : restreint selon environnement

---

## 🔗 Points importants IA

✅ Le projet expose les métadonnées dans `deno.jsonc` (`version`, etc.)
✅ La configuration dynamique est centralisée dans `env.ts`
✅ Les middlewares sont typés et organisés proprement
✅ Les routes sont injectées dynamiquement par découverte des **Domaines** (Domain Driven Routing)
✅ Chaque domaine retourne un descripteur unifié (`Domain`), garantissant l’extensibilité et la modularité

---

## 🛠️ Conventions et pratiques

* Tous les nouveaux modules doivent être typés (TypeScript strict)
* Toute feature nouvelle doit être documentée séparément sous `doc/features/`
* Les commits suivent une logique simple et claire, sans surcharge
* Les tests E2E sont prioritaires pour garantir la stabilité
* Les routes doivent être ajoutées via le système **Domain Driven Routing** pour rester alignées avec l’architecture

---

## 🎯 Objectif IA

> **Ta mission :**
> Analyser, documenter, améliorer, ou étendre ce projet sans casser ses garanties de sécurité, ses conventions typées, et son architecture modulaire.
> Tu dois également veiller à maintenir l’intégrité du modèle **Domain Driven Routing** et à respecter les conventions documentées.

---

💬 Si tu veux, je peux aussi générer un fichier complémentaire `ai.md` spécifique pour guider l’IA dans l’ajout de nouveaux domaines métiers ou l’extension des schémas actuels. Dis-moi ! 🚀

### 📄 **docs/features/system.md**

````markdown
# 🛠️ Domaine `system`

Le domaine `system` regroupe les routes **basiques** exposées par l’API pour fournir des informations techniques et de diagnostic sur le serveur.

---

## 📚 Description générale

| Élément            | Détail                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| Nom du domaine     | 🛠️ System                                                             |
| Point d’entrée     | `/`                                                                   |
| But principal      | Offrir des routes de diagnostic pour vérifier le bon fonctionnement   |
| Type               | Domaine technique (non métier)                                        |
| Authentification   | Requise (Bearer token)                                                |

---

## 🌐 Routes disponibles

| Méthode | Chemin        | Description                                                              |
| ------- | ------------- | ------------------------------------------------------------------------ |
| GET     | `/`           | Vérifie que l’API est en ligne et répond avec un message basique         |
| GET     | `/version`    | Retourne la version de l’application (extrait de `deno.jsonc`) et le SHA |
| GET     | `/status`     | Donne l’uptime, l’usage mémoire et un timestamp                          |
| GET     | `/health`     | Indique l’état général (`ok` ou `degraded`) avec uptime et timestamp     |

---

## 🛡️ Sécurité

Toutes les routes sont protégées :
- Authentification : **Bearer token**
- Headers de sécurité : `nosniff`, `DENY`, `1; mode=block`, `Strict-Transport-Security`, etc.
- Limitation : **100 requêtes / minute / IP**

---

## 🔧 Exemple de réponse

### ✅ `/health`

```json
{
  "status": "ok",
  "uptime": 3600,
  "timestamp": "2025-05-08T12:34:56Z"
}
````

---

## 📌 Notes

* Ce domaine est automatiquement documenté dans l’OpenAPI (`/doc`) et visible dans Swagger UI (`/ui`).
* Les routes sont dynamiquement chargées depuis `src/app/rest/domains/system/` grâce au Domain Driven Routing.

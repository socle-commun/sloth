## 📦 KV Store Domain

Ce domaine expose des routes REST pour interagir avec le **Deno KV store**.
Toutes les opérations sont basées sur le chemin `/kv/{keypath}` où `keypath` est une clé hiérarchique, séparée par des points (`.`).

---

### 🔑 Concepts clés

* **Keypath**
  Exemple : `users.john.settings` → devient `['users', 'john', 'settings']` côté Deno.

* **Value**
  Tout objet JSON-serialisable.

* **TTL (Time To Live)**
  Temps optionnel (en millisecondes) après lequel la clé expirera automatiquement.
  Ex. : `60000` pour 1 minute.

---

### 🚀 Endpoints

---

### `GET /kv/{keypath}`

Récupère la valeur stockée à une clé.

✅ Paramètres :

* `keypath` (path param) — chemin complet (ex. `users.john.settings`)

✅ Query :

* `list` (optional, boolean) — si `true`, liste toutes les clés sous le préfixe.

✅ Réponses :

* `200 OK` — retourne la valeur ou la liste.
* `404 Not Found` — si la clé n’existe pas.
* erreurs standard : `401`, `403`, `429`, `500`, `503`.

---

### `PUT /kv/{keypath}`

Stocke ou met à jour une valeur.

✅ Paramètres :

* `keypath` (path param) — chemin complet.

✅ Body :

```json
{
  "value": { /* any JSON value */ },
  "ttl": 60000 // optional, in milliseconds
}
```

✅ Réponses :

* `200 OK` — clé stockée.
* `400 Bad Request` — mauvaise requête (ex. valeur invalide).
* erreurs standard.

ℹ️ **Note TTL** :
Si `ttl` est fourni, la clé expirera automatiquement après ce délai.
Le temps est en **millisecondes** — attention à bien multiplier par 1000 si vous partez de secondes.

---

### `DELETE /kv/{keypath}`

Supprime une clé spécifique.

✅ Paramètres :

* `keypath` (path param)

✅ Réponses :

* `200 OK` — clé supprimée (ou marquée supprimée).
* erreurs standard.

---

### ⚠️ Codes d’erreur standard

Toutes les routes exposent également :

* `401 Unauthorized`
* `403 Forbidden`
* `429 Too Many Requests`
* `500 Internal Server Error`
* `503 Service Unavailable`

---

### 🏗️ Bonnes pratiques Deno KV

Voici les pratiques recommandées pour tirer le meilleur parti de **Deno.openKv()** :

✅ **Toujours utiliser un seul instance** de `Deno.openKv()` dans le cycle de vie d’une requête.
→ Ouvre-le au début de la route (pas globalement) et referme-le si nécessaire (dans certains cas, il se ferme automatiquement à la fin).

✅ **Clé structurée** : utilisez `keypath.split('.')` pour transformer `users.john.settings` en tableau `[ 'users', 'john', 'settings' ]`.

✅ **TTL géré côté serveur** : appliquez bien `ttl` en millisecondes et vérifiez qu’il correspond au besoin métier (évitez les durées trop longues ou infinies pour des caches temporaires).

✅ **Vérification des résultats** : testez `res.ok` ou `res.value` après chaque opération (`get`, `set`, `delete`) pour éviter de supposer que tout a réussi sans contrôle.

✅ **Opérations atomiques** :
Pour des updates complexes (ex. compare-and-swap), privilégiez `atomic()` plutôt que des `get` + `set` séparés.

✅ **Performance** : évitez de faire trop d’ouvertures KV simultanées, surtout sous forte charge. Réutilisez les connexions et testez les performances.

✅ **Serialisation** : stockez toujours des valeurs simples et bien typées (évitez les objets complexes non sérialisables).

---

### 📘 Exemple complet (avec TTL)

```bash
# Enregistrement avec TTL de 1 heure
curl -X PUT http://localhost:8000/kv/users.john.session \
    -H "Content-Type: application/json" \
    -d '{"value": {"token": "abc123"}, "ttl": 3600000}'
```

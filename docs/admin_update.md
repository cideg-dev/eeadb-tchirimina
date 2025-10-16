# Endpoint d’administration — Mise à jour des données du site

Ce service serverless reçoit des mises à jour de contenu (JSON) depuis la page `site/admin.html` et les **committe** sur le dépôt via l’API GitHub Contents.

## Fichiers concernés

Les formulaires orientent les mises à jour vers:
- `site/data/presentation.json`
- `site/data/activites.json`
- `site/data/gallery.json`
- `site/data/ressources.json`
- `site/data/events.json`
- `site/data/versets.json`

Vous pouvez étendre la liste en ajoutant de nouvelles sections côté frontend.

## Déploiement

Le code est dans `serverless/admin_update.js` (Express). Déployez-le sur la plateforme de votre choix (Render, Vercel, Fly.io, etc.).

### Variables d’environnement

- `GITHUB_OWNER`: propriétaire du dépôt (ex: `Beraca`)
- `GITHUB_REPO`: nom du dépôt (ex: `eeadb-tchirimina`)
- `GITHUB_BRANCH`: branche cible (par défaut `main`)
- `GITHUB_PAT`: Token GitHub avec scope `repo` (obligatoire)
- `API_KEY`: clé d’API pour sécuriser l’endpoint (facultatif mais recommandé)

### Sécurité

- L’endpoint exige l’en-tête `X-API-KEY` si `API_KEY` est défini.
- Le frontend admin mémorise la clé seulement en session (sessionStorage).
- Ne divulguez jamais la clé; régénérez-la régulièrement.

## Spécification de l’API

URL: `POST /admin/update`

Body JSON:
```
{
  "updates": [
    {
      "path": "site/data/presentation.json",
      "content": "{ ... }",
      "message": "admin: update presentation"
    }
  ]
}
```

Réponse:
```
{
  "ok": true,
  "results": [ { "path": "...", "ok": true, "commit": "<sha>" } ]
}
```

Endpoint santé (optionnel): `GET /health`

## Flux recommandé d’utilisation

1. Les administrateurs ouvrent `site/prive.html`, renseignent l’URL de l’endpoint et la clé.
2. Ils accèdent à `site/admin.html` et remplissent les formulaires par page.
3. Chaque section envoie uniquement les champs renseignés; si vide, on conserve les données existantes.
4. Les commits sont signés par le PAT et visibles dans l’historique.

## Journalisation / Audit (suggestion)

- Utiliser des messages de commit explicites (inclus par le frontend) avec l’initiateur.
- Option: écrire un fichier `docs/admin_logs.md` avec date/heure et résumé (via un deuxième update).

## Mode PR (optionnel)

Pour plus de contrôle, remplacez le commit direct par un **pull request**:

1. Le service crée une branche `admin/update-<horodatage>`.
2. Écrit les fichiers.
3. Ouvre une PR vers `main`.

Cela permet la relecture avant fusion. Ce mode nécessite des API GitHub supplémentaires (branches & PRs).
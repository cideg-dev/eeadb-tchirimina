# Déclencher le workflow depuis un endpoint serverless

Ce document explique comment déployer une petite fonction serverless qui reçoit les données du formulaire de contact et déclenche le workflow GitHub `send_email.yml`.

## Pré-requis

- Créer un Personal Access Token (PAT) GitHub avec le scope `repo` (ou `workflows` selon les besoins).
- Stocker le PAT en tant que variable d'environnement `GH_PAT` dans la plateforme serverless.
- Définir `GH_OWNER` et `GH_REPO` (nom de l'organisation/utilisateur et du dépôt).

## Exemple de déploiement

1. Node.js + Express (ex : sur Heroku, Render, Railway, Azure Functions ou Vercel Serverless)
2. Installer dépendances : `express` et `node-fetch` (ou `axios`).
3. Déployer `serverless/trigger_workflow.js` et définir les variables d'environnement : `GH_PAT`, `GH_OWNER`, `GH_REPO`.

## Endpoint

- POST `/trigger-email`
- Payload JSON attendu : { "name":"...", "email":"...", "message":"...", "type":"general|priere" }
- Sécurisation (optionnelle mais recommandée) : envoyer l'en-tête `X-API-KEY: <votre_clef>` si `API_KEY` est défini côté serveur.

## Sécurité

- Valider et nettoyer les entrées côté serveur.
- Protéger l'endpoint : ajouter un token d'API (ex : `X-API-KEY`) ou autre mécanisme d'authentification pour éviter les abus. Le code d'exemple supporte `API_KEY`.
- Mettre en place un rate-limit (ex : 10 requêtes/minute par IP) et un captcha côté frontend si nécessaire.

## Notes

- Le service backend doit uniquement disposer du PAT et ne jamais l'exposer au frontend.
- Tester d'abord avec un dépôt de test et vérifier les logs GitHub Actions.

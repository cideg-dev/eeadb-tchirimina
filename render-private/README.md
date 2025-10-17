# Espace privé EEADB - Render

Ce dossier contient le serveur Node.js/Express pour la zone privée du site EEADB-Tchirimina.

## Fonctionnalités
- Authentification via GitHub (OAuth)
- Accès réservé aux membres authentifiés
- Exemple de route protégée : `/fichier-confidentiel`

## Déploiement sur Render
1. Créez une nouvelle Web Service sur https://dashboard.render.com/
2. Importez ce dossier (`render-private/`) ou connectez le dépôt GitHub
3. Configurez les variables d’environnement :
   - `GITHUB_CLIENT_ID` : ID de l’application OAuth GitHub
   - `GITHUB_CLIENT_SECRET` : secret de l’application OAuth GitHub
   - `GITHUB_CALLBACK_URL` : URL de callback (ex : `https://eeadb-prive.onrender.com/auth/github/callback`)
   - `SESSION_SECRET` : secret de session (générer une valeur forte)

## Restreindre l'accès par utilisateur GitHub

Vous pouvez limiter l'accès à une liste d'utilisateurs GitHub en définissant la variable d'environnement `ALLOWED_USERS` (séparateur `,`).
Exemple :

```
ALLOWED_USERS=ekue,alice,bob
```

Les utilisateurs non listés seront refusés lors de l'authentification.

## Autoriser les origines (CORS)

Si votre site public (GitHub Pages) doit appeler l'API privée, définissez la variable `ALLOWED_ORIGINS` avec la liste des origines autorisées (séparées par des virgules). Exemple :

```env
ALLOWED_ORIGINS=https://cideg-dev.github.io
```

Si `ALLOWED_ORIGINS` est vide, le serveur acceptera toutes les origines (`*`).

## Fichiers privés

Placez les fichiers privés dans le dossier `render-private/private/`. Ils seront accessibles seulement après authentification via l'URL :

```
https://<votre-service>.onrender.com/private/<nom-de-fichier.pdf>
```

## Création de l’application OAuth GitHub
- Allez sur https://github.com/settings/developers > New OAuth App
- Homepage URL : `https://eeadb-prive.onrender.com/`
- Authorization callback URL : `https://eeadb-prive.onrender.com/auth/github/callback`
- Récupérez le Client ID et le Client Secret

## Lien depuis le site public
Ajoutez un lien "Zone privée" dans le menu du site public qui pointe vers l’URL Render (ex : `https://eeadb-prive.onrender.com/`).

## Personnalisation
- Ajoutez vos routes/fichiers confidentiels dans le serveur Express
- Pour restreindre l’accès à certains utilisateurs, filtrez dans la fonction du GitHubStrategy

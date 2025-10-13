# Zone privée et gestion des accès

## Sous-zones

- Espace des responsables
- Ministères (jeunesse, femmes, chorale…)
- Technique (gestion du site, workflows GitHub)
- Prière confidentielle

## Options d'accès restreint

1. Liens protégés temporaires
   - Générer un token signé côté serveur ou via GitHub Actions qui expire (ex : URL avec paramètre et signature HMAC)
   - Idéal si on ne veut pas gérer des comptes utilisateurs

2. Authentification via un fournisseur (recommandé pour sécurité)
   - Netlify Identity, Auth0 ou Firebase Auth (si hébergement le permet)
   - Permet gestion des rôles (responsable, webmaster, admin)

3. Accès via GitHub (workflows / dispatch)
   - Restreindre certaines pages en n'affichant que des contenus stockés dans des branches privées ou via artefacts
   - Utiliser GitHub Actions pour publier des versions privées ou pour générer des liens temporaires

## Bonnes pratiques

- Ne pas stocker de mots de passe en clair dans le dépôt
- Utiliser HTTPS et CSP
- Journaliser les accès aux pages sensibles
- Prévoir une procédure de révocation des accès

## Exemple simple — lien protégé via HMAC

- Stocker un secret dans GitHub Secrets (HMAC_KEY)
- Générer une URL signée via une Action qui inclut `expires=TIMESTAMP` et `sig=HMAC(secret, path|expires)`
- La page vérifie la signature et la validité temporelle côté serveur ou via un petit script client validant la signature avant affichage

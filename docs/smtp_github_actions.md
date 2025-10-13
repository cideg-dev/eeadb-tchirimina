# Envoi d'emails via GitHub Actions (formulaire de contact)

## Principe

- Le frontend envoie les données du formulaire à une API (possiblement une GitHub Action déclenchée via `workflow_dispatch` ou via un endpoint serveur minimal).
- L'action récupère les secrets SMTP depuis les GitHub Secrets et envoie l'email depuis l'environnement serveur.

## Exemple recommandé

- Utiliser l'action `dawidd6/action-send-mail` (exemple inclus dans `.github/workflows/send_email.yml`)
- Secrets requis : `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_DESTINATION`

## Sécurité

- Ne jamais exposer `SMTP_PASS` ou autres secrets dans le frontend.
- Limiter les permissions de l'action si possible.
- Valider et nettoyer les entrées du formulaire pour éviter l'envoi d'injection de contenu.

## Déclenchement côté frontend

- Option A (simple) : le frontend crée une issue ou envoie un `workflow_dispatch` via l'API GitHub (nécessite un token PAT stocké côté serveur/Action)
- Option B (recommandé) : créer un petit endpoint serverless (par ex. GitHub Pages ne le permet pas, mais un petit Azure Function / Netlify Function / GitHub Actions via repository_dispatch depuis un backend minimal) qui déclenche l'envoi.

## Exemple de payload attendu pour `workflow_dispatch`

- inputs:
  - name: name
  - email: email
  - message: message

## Remarques

- Tester d'abord avec une sandbox (Mailtrap) avant d'utiliser la boîte de production.
- Mettre en place des limites de taux pour éviter l'abus du formulaire.

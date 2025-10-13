# Projet EEADB-Tchirimina - Site vitrine

Ce dépôt contient les éléments pour construire le site vitrine de l'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (EEADB-Tchirimina).

## Contenu important

- `cahier_charge.md` : cahier des charges principal
- `data/verset_du_jour.json` : exemple de verset du jour
- `.github/workflows/send_email.yml` : workflow d'exemple pour envoyer les messages du formulaire via SMTP
- `data/events.json` : événements initiaux pour le calendrier
- `docs/` : documentation sur galerie, calendrier, zone privée et SMTP

## Prochaines étapes recommandées

- Choisir un framework frontend (ex : Next.js, Astro) et un framework CSS (Tailwind ou Bootstrap)
- Mettre en place l'hébergement (GitHub Pages, Netlify, Vercel ou un hébergeur avec fonctions serverless si besoin d'API)
- Ajouter les secrets SMTP dans les GitHub Secrets
- Préparer les contenus fournis par Ekué (textes, images, ressources)

## Notes

Le projet vise un site statique amélioré (SSG) avec des actions GitHub pour certaines tâches (envoi d'emails, mise à jour du calendrier) afin d'éviter d'exposer des secrets côté client.

# Prototype site statique

Ce dossier contient un prototype statique minimal pour le site EEADB-Tchirimina.

- `index.html` : page principale du prototype
- `assets/main.css` : styles simples
- `assets/main.js` : logique front-end : charge `../data/verset_du_jour.json` et `../data/events.json` et initialise FullCalendar
- Notes :

- Pour tester localement, servir le dossier racine (`e:/BERACA`) via un serveur (ex : `python -m http.server` ou équivalent) car les navigateurs bloquent `fetch` sur fichiers locaux.
- Le formulaire de contact est un template : voir `docs/smtp_github_actions.md` pour lier un backend ou un workflow GitHub sécurisé.
 - Placez le fichier du logo dans `site/assets/logo-ad.png` (format PNG/SVG recommandé) ; l’en-tête l’affiche automatiquement.

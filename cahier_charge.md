# Cahier des charges – Site vitrine EEADB-Tchirimina

## 1. Identité du site
- **Nom complet** : Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina
- **Nom abrégé** : EEADB-Tchirimina
- **Temple** : BERACA
- **Devise** : « Avec Dieu nous ferons des exploits »
- **Verset clé** : Malachie 3:10
- **Logo** : Oui, logo officiel des AD (à intégrer dans l’en-tête du site)
 - **Couleur principale** : Bleu foncé (#1e3a8a)

## 2. Objectifs du site
- Présenter l’église et ses valeurs
- Informer les fidèles sur les activités et horaires
- Attirer de nouveaux visiteurs
- Partager des ressources (PDF, audio, vidéos)
- Recevoir des messages ou des demandes de prière
- Créer une zone privée pour les responsables

## 3. Pages principales
- Accueil
- Présentation de l’église
- Activités et horaires
- Galerie photo
- Contact
- Ressources (PDF, audio, sermons)
- Zone privée (accès restreint)

### 🔐 Sous-zones privées
- Espace des responsables
- Ministères (jeunesse, femmes, chorale…)
- Technique (gestion du site, workflows GitHub)
- Prière confidentielle

## 4. Fonctionnalités spécifiques
- Formulaire de contact
  - Champs : nom, email, message
  - Envoi via GitHub Actions avec secrets SMTP
  - Aucun mot de passe exposé dans le frontend
- Verset du jour
  - Chargé automatiquement via API ou fichier JSON local
  - Affiché en page d’accueil
- Téléchargement de ressources
  - PDF, audio, sermons
  - Organisation par thème ou date
- Zone privée avec sous-sections
  - Accès restreint via liens protégés ou déclenchement GitHub
- Galerie photo dynamique
  - Organisation par événement ou année
  - Affichage responsive
- Calendrier des événements interactif
  - Vue mensuelle ou hebdomadaire
  - Clic sur une date pour voir les détails
  - Ajout/modification via fichier JSON ou GitHub Actions
  - Intégration recommandée : FullCalendar.js
- Responsive design
  - Adapté aux téléphones et tablettes
- Framework CSS
  - Tailwind ou Bootstrap (à décider)

## 5. Design et style
- Style général : Moderne et dynamique
- Typographie : Sans-serif, lisible et contemporaine
- Icônes religieuses : Oui (croix, bible, colombe…) via FontAwesome
- Structure : Navigation par pages séparées avec menu clair
- Responsive : Oui, design mobile-first

## 6. Contenu initial (à fournir plus tard)
> 🔔 Rappel : Les contenus suivants seront fournis ultérieurement par Ekué :
- Textes de présentation
- Images (logo, photos du temple, événements)
- Ressources (PDF, audio, sermons)
- Liste des responsables ou ministères à afficher

## 7. Maintenance et mise à jour
- Responsables : Plusieurs membres de l’église
- Méthode : Via GitHub (interface ou dépôt)
- Support prévu :
  - Documentation visuelle étape par étape
  - Guide pour modifier les contenus
  - Procédure pour déclencher les workflows GitHub
  - Conseils pour éviter les erreurs (ex : sécurité des mots de passe)

---

## Tâches (checklist)
- [x] Créer fichier `cahier_charge.md` et y copier le cahier des charges
- [x] Rédiger le contenu technique pour l'envoi d'emails via GitHub Actions (SMTP, secrets)
- [x] Ajouter recommandations pour la galerie photo (structure de dossiers, métadonnées)
- [x] Documenter l'intégration FullCalendar.js pour le calendrier
- [x] Décrire les options d'authentification/accès pour la zone privée
- [x] Proposer un choix entre Tailwind et Bootstrap avec justification
- [x] Rédiger la procédure de maintenance et déclenchement des workflows
- [x] Lister le contenu à récupérer d'Ekué (textes, images, ressources)

## Sections techniques ajoutées

### Envoi d'emails (SMTP + GitHub Actions)
- Voir le workflow d'exemple : `.github/workflows/send_email.yml`
- Utiliser les GitHub Secrets : `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_DESTINATION`
- Ne jamais mettre de secret dans le frontend ; utiliser une Action ou un endpoint serverless.

### Galerie photo
- Structure recommandée : `assets/gallery/<année>/<événement>/` avec miniatures pré-générées `thumb_...` et un fichier `metadata.json` pour chaque événement.
- Formats : JPG/PNG/WebP. Préférer WebP pour performance si possible.

### Calendrier d'événements
- Fichier de stockage : `data/events.json` (ex : items avec id,title,start,end,description,location,category).
- Intégration recommandée : FullCalendar.js pour vues mensuelle/hebdomadaire et interaction (modal détails).

### Zone privée et accès
- Options : liens protégés temporaires (URL signée HMAC), fournisseur d'authentification (Netlify Identity, Auth0), ou workflows GitHub pour contenus privés.
- Voir `docs/zone_privee.md` pour plus de détails et exemples.

### Responsive & choix CSS
- Recommandation : Tailwind CSS pour personnalisation; Bootstrap si besoin de composants prêts à l'emploi.
- Voir `docs/responsive_css_choice.md` pour comparaison et tests recommandés.

### Maintenance & workflows
- Procédures de mise à jour et déclenchement manuels des workflows présentés dans `docs/maintenance_workflows.md`.

### Contenu initial requis
- Liste des contenus attendus fournie dans `docs/preparer_contenu_initial.md`.

## Notes complémentaires
- Ne jamais exposer de mots de passe ou de secrets dans le frontend. Utiliser GitHub Secrets et GitHub Actions pour tout envoi serveur (SMTP) ou automatisation.
- Pour le "Verset du jour", on peut utiliser une API publique (ex : Bible API) ou un fichier JSON local mis à jour via GitHub Actions.
- Pour la galerie, prévoir des miniatures (thumbnails) et une version optimisée pour le web des images originales.
- Pour la zone privée, envisager l'utilisation d'un CMS léger (Netlify Identity, Auth0, ou un système statique avec liens temporaires/protegés) selon le niveau de sécurité souhaité.

---

_Fichier généré automatiquement le 13 octobre 2025 par l'outil d'assistance._

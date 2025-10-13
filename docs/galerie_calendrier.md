# Galerie photo et Calendrier d'événements

## Galerie photo

- Organisation recommandée :
  - Dossier par année puis par événement : `assets/gallery/2025/concert-de-noel/`
  - Pour chaque image : garder le nom format `YYYYMMDD_event_title_01.jpg`
  - Fournir une miniature `thumb_` (ex : `thumb_20251224_concert-01.jpg`) pour accélérer l'affichage
  - Stocker métadonnées dans un fichier `metadata.json` à côté des images : titre, date, description, tags, auteur

- Formats supportés : JPG/PNG/WebP (préférer WebP pour le web quand possible)
- Optimisation : générer 2 tailles (thumb, full) et compresser sans perte visible
- Accessibilité : ajouter attributs alt text et descriptions

## Calendrier d'événements

- Recommandation d'intégration : FullCalendar.js
- Stockage des événements : `data/events.json` contenant des objets avec `id,title,start,end,description,location,category`
- Exemple d'événement :
  {
    "id": "e-2025-12-24-1",
    "title": "Culte de Noël",
    "start": "2025-12-24T18:00:00",
    "end": "2025-12-24T20:00:00",
    "description": "Culte de célébration de Noël au temple BERACA",
    "location": "Temple BERACA",
    "category": "Culte"
  }

- Edition : mise à jour via commit sur `data/events.json` ou via GitHub Actions avec un formulaire d'édition protégé
- Vue : mensuelle par défaut, possibilité de basculer en hebdomadaire
- Détails : clic sur une date/événement ouvre un modal avec la description et les liens vers la galerie correspondante

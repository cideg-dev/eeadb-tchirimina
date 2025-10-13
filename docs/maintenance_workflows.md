# Maintenance et workflows GitHub

## Procédure de mise à jour

1. Clonez le dépôt et créez une branche feature/XXX
2. Modifiez `data/events.json`, `assets/gallery/...` ou les pages
3. Ouvrez une Pull Request et demandez relecture par un responsable
4. Merge vers `main` et laissez les Actions se déployer

## Déclencher un workflow manuellement

- Aller dans l'onglet Actions sur GitHub, sélectionner le workflow et cliquer sur "Run workflow" ou déclencher via `workflow_dispatch` programmatique.

## Guide visuel pour responsables

- Créer un petit PDF ou une courte vidéo montrant :
  - Comment modifier `data/events.json`
  - Comment ajouter des images dans `assets/gallery/`
  - Comment mettre à jour `cahier_charge.md` ou les pages

## Sécurité

- Garder un administrateur unique pour la gestion des GitHub Secrets
- Utiliser GitHub Teams pour gérer les accès

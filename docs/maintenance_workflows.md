# Maintenance et workflows GitHub

## Procédure de mise à jour

1. Clonez le dépôt et créez une branche feature/XXX
2. Modifiez `data/events.json`, `assets/gallery/...` ou les pages
3. Ouvrez une Pull Request et demandez relecture par un responsable
4. Merge vers `main` et laissez les Actions se déployer

## Déclencher un workflow manuellement

- Aller dans l'onglet Actions sur GitHub, sélectionner le workflow et cliquer sur "Run workflow" ou déclencher via `workflow_dispatch` programmatique.

### Verset du jour (automatisation)

- Un workflow planifié `.github/workflows/update_verse.yml` met à jour quotidiennement `site/data/verset_du_jour.json` à partir de la liste `site/data/versets.json`.
- Pour lancer manuellement: Actions > "Mise à jour du verset du jour" > Run workflow.
- Pour modifier la liste de versets: éditer `site/data/versets.json` (format: [{ text, reference }]).

## Guide visuel pour responsables

- Créer un petit PDF ou une courte vidéo montrant :
  - Comment modifier `data/events.json`
  - Comment ajouter des images dans `assets/gallery/`
  - Comment mettre à jour `cahier_charge.md` ou les pages

## Sécurité

- Garder un administrateur unique pour la gestion des GitHub Secrets
- Utiliser GitHub Teams pour gérer les accès
 - Pour le formulaire de contact, si vous utilisez l'endpoint serverless, définissez une clef `API_KEY` et exigez l'en-tête `X-API-KEY` pour éviter les abus.

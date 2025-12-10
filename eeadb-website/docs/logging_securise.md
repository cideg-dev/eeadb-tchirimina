# Documentation - Logging Sécurisé

## Introduction
Ce module fournit un système de logging sécurisé pour l'application, qui masque les informations sensibles et gère les logs selon le niveau d'environnement.

## Fonctionnalités
- **Masquage des données sensibles** : Toutes les données sensibles (mots de passe, tokens, emails, etc.) sont automatiquement masquées dans les logs
- **Niveaux de log configurables** : Les logs sont filtrés selon le niveau défini (error, warn, info, debug)
- **Logging sécurisé** : Aucune information sensible n'est exposée dans les logs
- **Préparation pour logging distant** : Système prêt à envoyer les logs critiques à un service externe

## Configuration
Le système de logging est configuré automatiquement selon l'environnement:
- **Développement** : Tous les niveaux de logs sont visibles dans la console
- **Production** : Seuls les avertissements et erreurs sont visibles, avec option pour logging distant

## Utilisation
```javascript
import secureLogger from '../lib/secureLogger';

// Logs d'erreur
secureLogger.error('Erreur de chargement des données', { userId: 123, error: 'Network error' });

// Logs d'avertissement
secureLogger.warn('Tentative d\'accès à une ressource sensible', { path: '/admin', userId: 'sensitive' });

// Logs d'information (désactivés en production)
secureLogger.info('Utilisateur connecté', { userId: 123, email: 'user@example.com' });
```

## Sécurité
Les données suivantes sont automatiquement censurées dans les logs:
- Mots de passe et tokens
- Clés API
- Informations d'identification
- Données personnelles (emails, numéros de téléphone)

## Intégration avec services externes
Pour activer le logging distant en production:
1. Configurer un service de logging (Sentry, LogRocket, etc.)
2. Ajouter les secrets d'API dans les variables d'environnement
3. Mettre à jour la fonction `sendLogToRemote` pour utiliser le service choisi

## Bonnes pratiques
- N'utilisez jamais `console.log` directement dans le code de production
- Toujours passer par le service `secureLogger`
- Ne loguez jamais d'informations sensibles ou personnelles
- Utilisez des niveaux de log appropriés pour chaque type d'information
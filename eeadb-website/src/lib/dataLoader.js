/**
 * Service de chargement direct des données depuis les fichiers JSON
 * Utilisé côté serveur pour éviter les boucles de dépendance
 * @module DataLoaderService
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { FALLBACK_DATA, LOGGING_CONFIG } from './config';

// Chemins vers les fichiers de données
const DATA_PATHS = {
  'verset_du_jour.json': join(process.cwd(), '..', 'data', 'verset_du_jour.json'),
  'events.json': join(process.cwd(), '..', 'data', 'events.json'),
  'photos.json': join(process.cwd(), '..', 'data', 'photos.json'),
  'resources.json': join(process.cwd(), '..', 'data', 'resources.json')
};

/**
 * Charge les données depuis un fichier JSON de manière sécurisée
 * @param {string} filename - Le nom du fichier à charger
 * @returns {Promise<any>} - Les données chargées ou les données fallback
 */
const loadJsonFile = async (filename) => {
  try {
    const filePath = DATA_PATHS[filename];
    
    if (!filePath) {
      throw new Error(`Fichier non supporté: ${filename}`);
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Validation basique
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new Error('Données vides ou invalides');
    }
    
    return data;
  } catch (error) {
    if (LOGGING_CONFIG.ENABLE_DETAILS) {
      console.warn(`[DataLoaderService] Erreur lors du chargement de ${filename}:`, error.message);
    }
    
    // Retourne les données fallback appropriées
    const dataType = filename.split('.')[0];
    return FALLBACK_DATA[dataType] || [];
  }
};

/**
 * Récupère le verset du jour depuis le fichier
 * @returns {Promise<{text: string, reference: string, source: string}>}
 */
export const getVersetDuJourFromFile = async () => {
  try {
    const data = await loadJsonFile('verset_du_jour.json');
    
    // Validation de la structure
    if (!data || (!data.verset && !data.text)) {
      throw new Error('Structure de verset invalide');
    }
    
    return {
      text: data.verset || data.text,
      reference: data.reference || 'Référence non disponible',
      source: data.source || 'Source inconnue'
    };
  } catch (error) {
    console.warn('[DataLoaderService] Erreur getVersetDuJourFromFile, utilisation fallback');
    return FALLBACK_DATA.verset;
  }
};

/**
 * Récupère les événements depuis le fichier
 * @returns {Promise<Array>}
 */
export const getEventsFromFile = async () => {
  try {
    const data = await loadJsonFile('events.json');
    return Array.isArray(data) ? data : FALLBACK_DATA.events;
  } catch (error) {
    console.warn('[DataLoaderService] Erreur getEventsFromFile, utilisation fallback');
    return FALLBACK_DATA.events;
  }
};

/**
 * Récupère les photos depuis le fichier
 * @returns {Promise<Array>}
 */
export const getPhotosFromFile = async () => {
  try {
    const data = await loadJsonFile('photos.json');
    return Array.isArray(data) ? data : FALLBACK_DATA.photos;
  } catch (error) {
    console.warn('[DataLoaderService] Erreur getPhotosFromFile, utilisation fallback');
    return FALLBACK_DATA.photos;
  }
};

/**
 * Récupère les ressources depuis le fichier
 * @returns {Promise<Array>}
 */
export const getResourcesFromFile = async () => {
  try {
    const data = await loadJsonFile('resources.json');
    return Array.isArray(data) ? data : FALLBACK_DATA.resources;
  } catch (error) {
    console.warn('[DataLoaderService] Erreur getResourcesFromFile, utilisation fallback');
    return FALLBACK_DATA.resources;
  }
};
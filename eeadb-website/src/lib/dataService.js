/**
 * Service de chargement des données pour l'application BERACA
 * Gère le chargement sécurisé des données depuis les fichiers locaux ou API
 * @module DataService
 */

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/eeadb-tchirimina' : '';

// Configuration des endpoints autorisés (whitelist)
const ALLOWED_ENDPOINTS = {
  'verset_du_jour.json': `${BASE_PATH}/api/verset_du_jour.json`,
  'events.json': `${BASE_PATH}/api/events.json`,
  'photos.json': `${BASE_PATH}/api/photos.json`,
  'resources.json': `${BASE_PATH}/api/resources.json`
};

// Données fallback centralisées
const FALLBACK_DATA = {
  verset: {
    date: new Date().toISOString().split('T')[0],
    text: "Apportez toutes les dîmes à la maison du trésor, afin qu'il y ait de la nourriture dans ma maison; mettez-moi ainsi à l'épreuve, dit l'Éternel des armées, et voyez si je ne vous ouvre pas les fenêtres des cieux, si je ne répands pas sur vous une bénédiction jusqu'à ce qu'il n'y ait plus de place.",
    reference: "Malachie 3:10",
    source: "Bible Segond 21"
  },
  events: [{
    id: "fallback-1",
    title: "Culte dominical",
    start: new Date().toISOString(),
    end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    description: "Culte hebdomadaire du dimanche matin",
    location: "Temple BERACA"
  }],
  photos: [
    {
      id: 1,
      src: "/images/placeholder-culte.svg",
      alt: "Culte dominical",
      title: "Culte du dimanche matin",
      description: "Notre culte hebdomadaire du dimanche"
    },
    {
      id: 2,
      src: "/images/placeholder-priere.svg",
      alt: "Groupe de prière",
      title: "Groupe de prière",
      description: "Groupe de prière intercession"
    },
    {
      id: 3,
      src: "/images/placeholder-ecole.svg",
      alt: "École dominicale",
      title: "École dominicale",
      description: "École biblique pour enfants"
    }
  ],
  resources: [
    {
      id: 1,
      title: "Guide de prière",
      description: "Guide complet sur la prière dans la vie chrétienne",
      type: "document",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      title: "Étude sur la sanctification",
      description: "Étude approfondie sur la sanctification progressive",
      type: "document",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      title: "Cantiques et louanges",
      description: "Collection de cantiques et chants d'adoration",
      type: "audio",
      date: new Date().toISOString().split('T')[0]
    }
  ]
};

/**
 * Valide si un endpoint est autorisé
 * @param {string} filename - Le nom du fichier/endpoint
 * @returns {boolean} - True si l'endpoint est autorisé
 */
export const isValidEndpoint = (filename) => {
  return Object.keys(ALLOWED_ENDPOINTS).includes(filename);
};

/**
 * Charge les données depuis l'API avec gestion d'erreur sécurisée
 * @param {string} endpoint - L'endpoint API à appeler
 * @returns {Promise<any>} - Les données chargées ou les données fallback
 */
const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Timeout de 5 secondes
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Validation basique des données
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new Error('Données vides reçues');
    }

    return data;
  } catch (error) {
    // Log sécurisé sans exposition d'informations sensibles
    console.warn(`[DataService] Erreur lors du chargement depuis ${endpoint}: ${error.message}`);
    return null;
  }
};

/**
 * Charge les données depuis le endpoint spécifié
 * @param {string} filename - Le nom du fichier/endpoint
 * @returns {Promise<any>} - Les données chargées
 */
const loadData = async (filename) => {
  // Validation de l'endpoint
  if (!isValidEndpoint(filename)) {
    console.warn(`[DataService] Endpoint non autorisé: ${filename}`);
    return FALLBACK_DATA[filename.split('.')[0]] || [];
  }

  const endpoint = ALLOWED_ENDPOINTS[filename];
  
  // Environnement client: appel API
  if (typeof window !== 'undefined') {
    const data = await fetchFromAPI(endpoint);
    return data || FALLBACK_DATA[filename.split('.')[0]] || [];
  }
  
  // Environnement serveur: données statiques
  // TODO: Implémenter le chargement depuis le système de fichiers
  return FALLBACK_DATA[filename.split('.')[0]] || [];
};

/**
 * Récupère le verset du jour
 * @returns {Promise<{text: string, reference: string, source: string}>}
 */
export const getVersetDuJour = async () => {
  try {
    const data = await loadData('verset_du_jour.json');
    
    // Validation et normalisation des données
    if (!data || (!data.verset && !data.text)) {
      throw new Error('Structure de données invalide');
    }

    return {
      text: data.verset || data.text,
      reference: data.reference || 'Référence non disponible',
      source: data.source || 'Source inconnue'
    };
  } catch (error) {
    console.warn('[DataService] Erreur getVersetDuJour, utilisation fallback');
    return FALLBACK_DATA.verset;
  }
};

/**
 * Récupère la liste des événements
 * @returns {Promise<Array>}
 */
export const getEvents = async () => {
  try {
    const data = await loadData('events.json');
    return Array.isArray(data) ? data : FALLBACK_DATA.events;
  } catch (error) {
    console.warn('[DataService] Erreur getEvents, utilisation fallback');
    return FALLBACK_DATA.events;
  }
};

/**
 * Récupère la liste des photos pour la galerie
 * @returns {Promise<Array>}
 */
export const getPhotos = async () => {
  try {
    const data = await loadData('photos.json');
    return Array.isArray(data) ? data : FALLBACK_DATA.photos;
  } catch (error) {
    console.warn('[DataService] Erreur getPhotos, utilisation fallback');
    return FALLBACK_DATA.photos;
  }
};

/**
 * Récupère la liste des ressources
 * @returns {Promise<Array>}
 */
export const getResources = async () => {
  try {
    const data = await loadData('resources.json');
    return Array.isArray(data) ? data : FALLBACK_DATA.resources;
  } catch (error) {
    console.warn('[DataService] Erreur getResources, utilisation fallback');
    return FALLBACK_DATA.resources;
  }
};
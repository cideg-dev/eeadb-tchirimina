/**
 * Configuration de sécurité et des environnements
 * Centralise toutes les variables de configuration
 * @module Config
 */

// Configuration de sécurité
export const SECURITY_CONFIG = {
  // Timeout pour les requêtes API (en ms)
  API_TIMEOUT: 5000,
  
  // Rate limiting (nombre de requêtes max par fenêtre)
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  },
  
  // Headers de sécurité
  SECURITY_HEADERS: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.googleapis.com https://translate.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://translate.googleapis.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN', // Changé de DENY à SAMEORIGIN pour permettre les iframes internes si nécessaire
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
};

// Configuration des endpoints autorisés
export const ALLOWED_ENDPOINTS = {
  'verset_du_jour.json': '/api/verset_du_jour.json',
  'events.json': '/api/events.json',
  'photos.json': '/api/photos.json',
  'resources.json': '/api/resources.json'
};

// Configuration des logs
export const LOGGING_CONFIG = {
  // Niveau de log: 'error', 'warn', 'info', 'debug'
  LEVEL: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  
  // Désactiver les logs détaillés en production
  ENABLE_DETAILS: process.env.NODE_ENV !== 'production'
};

// Configuration des données fallback
export const FALLBACK_DATA = {
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
      src: "/eeadb-tchirimina/images/placeholder-culte.svg",
      alt: "Culte dominical",
      title: "Culte du dimanche matin",
      description: "Notre culte hebdomadaire du dimanche"
    },
    {
      id: 2,
      src: "/eeadb-tchirimina/images/placeholder-priere.svg",
      alt: "Groupe de prière",
      title: "Groupe de prière",
      description: "Groupe de prière intercession"
    },
    {
      id: 3,
      src: "/eeadb-tchirimina/images/placeholder-ecole.svg",
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

// Validation d'environnement
export const validateEnvironment = () => {
  const requiredEnvVars = [];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.warn(`[Config] Variables d'environnement manquantes: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
};
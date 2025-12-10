/**
 * Middleware de sécurité pour les API routes
 * Implémente rate limiting, validation et headers de sécurité
 * @module SecurityMiddleware
 */

import { SECURITY_CONFIG, LOGGING_CONFIG } from '../lib/config';

// Stockage en mémoire pour le rate limiting (à remplacer par Redis en production)
const rateLimitStore = new Map();

/**
 * Nettoie les entrées expirées du rate limiting
 */
const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.resetTime > SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
};

/**
 * Génère une clé unique pour le rate limiting
 * @param {Request} request - La requête HTTP
 * @returns {string} - La clé de rate limiting
 */
const getRateLimitKey = (request) => {
  // Utilise l'IP du client et le path de l'API
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const pathname = new URL(request.url).pathname;
  return `${ip}:${pathname}`;
};

/**
 * Vérifie si la requête est soumise au rate limiting
 * @param {string} key - La clé de rate limiting
 * @returns {object} - Les informations de rate limiting
 */
const checkRateLimit = (key) => {
  const now = Date.now();
  const windowStart = now - SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, {
      count: 0,
      resetTime: now
    });
  }
  
  const data = rateLimitStore.get(key);
  
  // Réinitialise si la fenêtre est expirée
  if (now - data.resetTime > SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS) {
    data.count = 0;
    data.resetTime = now;
  }
  
  data.count++;
  
  return {
    allowed: data.count <= SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS,
    remaining: Math.max(0, SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS - data.count),
    resetTime: data.resetTime + SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS
  };
};

/**
 * Valide les paramètres de requête
 * @param {URLSearchParams} searchParams - Les paramètres de recherche
 * @param {Array<string>} allowedParams - Les paramètres autorisés
 * @returns {object} - Résultat de validation
 */
const validateQueryParams = (searchParams, allowedParams = []) => {
  const invalidParams = [];
  
  for (const param of searchParams.keys()) {
    if (!allowedParams.includes(param)) {
      invalidParams.push(param);
    }
  }
  
  return {
    valid: invalidParams.length === 0,
    invalidParams
  };
};

/**
 * Middleware de sécurité principal
 * @param {Request} request - La requête HTTP
 * @param {object} options - Les options de configuration
 * @returns {Response|null} - La réponse d'erreur ou null si tout est valide
 */
export const securityMiddleware = (request, options = {}) => {
  const {
    allowedMethods = ['GET'],
    allowedParams = [],
    requireAuth = false
  } = options;
  
  // Nettoyage périodique du store
  if (Math.random() < 0.01) { // 1% des requêtes
    cleanupRateLimitStore();
  }
  
  // Vérification de la méthode HTTP
  if (!allowedMethods.includes(request.method)) {
    return new Response(
      JSON.stringify({ 
        error: 'Méthode non autorisée',
        allowedMethods 
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...SECURITY_CONFIG.SECURITY_HEADERS
        }
      }
    );
  }
  
  // Rate limiting
  const rateLimitKey = getRateLimitKey(request);
  const rateLimitInfo = checkRateLimit(rateLimitKey);
  
  if (!rateLimitInfo.allowed) {
    return new Response(
      JSON.stringify({ 
        error: 'Trop de requêtes',
        message: 'Veuillez réessayer plus tard',
        retryAfter: Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimitInfo.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitInfo.resetTime).toISOString(),
          'Retry-After': Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000).toString(),
          ...SECURITY_CONFIG.SECURITY_HEADERS
        }
      }
    );
  }
  
  // Validation des paramètres de requête
  const url = new URL(request.url);
  const validation = validateQueryParams(url.searchParams, allowedParams);
  
  if (!validation.valid) {
    return new Response(
      JSON.stringify({ 
        error: 'Paramètres de requête invalides',
        invalidParams: validation.invalidParams,
        allowedParams
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...SECURITY_CONFIG.SECURITY_HEADERS
        }
      }
    );
  }
  
  // Vérification d'authentification (si requise)
  if (requireAuth) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ 
          error: 'Authentification requise',
          message: 'Token Bearer manquant ou invalide'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'WWW-Authenticate': 'Bearer',
            ...SECURITY_CONFIG.SECURITY_HEADERS
          }
        }
      );
    }
  }
  
  // Tout est valide, retourner null
  return null;
};

/**
 * Wrapper pour les handlers d'API avec sécurité intégrée
 * @param {Function} handler - Le handler d'API
 * @param {object} options - Les options de sécurité
 * @returns {Function} - Le handler wrapper
 */
export const withSecurity = (handler, options = {}) => {
  return async (request, context) => {
    // Application du middleware de sécurité
    const securityResponse = securityMiddleware(request, options);
    
    if (securityResponse) {
      return securityResponse;
    }
    
    // Si tout est valide, exécuter le handler principal
    try {
      const response = await handler(request, context);
      
      // Ajouter les headers de sécurité à la réponse
      if (response && response.headers) {
        Object.entries(SECURITY_CONFIG.SECURITY_HEADERS).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      }
      
      return response;
    } catch (error) {
      // Gestion centralisée des erreurs
      if (LOGGING_CONFIG.ENABLE_DETAILS) {
        console.error(`[SecurityMiddleware] Erreur dans le handler:`, error);
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Erreur interne du serveur',
          message: LOGGING_CONFIG.ENABLE_DETAILS ? error.message : 'Une erreur est survenue'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...SECURITY_CONFIG.SECURITY_HEADERS
          }
        }
      );
    }
  };
};
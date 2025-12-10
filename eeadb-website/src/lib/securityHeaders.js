/**
 * Configuration des headers de sécurité pour le déploiement
 * Ce fichier contient les bonnes pratiques pour les headers de sécurité
 * à configurer sur le serveur web d'hébergement (GitHub Pages, Netlify, etc.)
 */

// Pour GitHub Pages, vous pouvez utiliser un service comme Cloudflare pour ajouter les headers
// Pour Netlify, utilisez un fichier _headers dans le répertoire public

const securityHeaders = {
  // Content Security Policy (CSP)
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.googleapis.com https://translate.google.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://* https://*; connect-src 'self' https://translate.googleapis.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  
  // Prévenir les attaques de type MIME
  'X-Content-Type-Options': 'nosniff',
  
  // Empêcher le rendu dans une frame (clickjacking)
  'X-Frame-Options': 'DENY',
  
  // Protection contre les attaques XSS
  'X-XSS-Protection': '1; mode=block',
  
  // Politique de référence
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  
  // Strict Transport Security
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
};

// Fichier _headers pour Netlify
const netlifyHeaders = `
/* 
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.googleapis.com https://translate.google.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://* https://*; connect-src 'self' https://translate.googleapis.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
`;

module.exports = {
  securityHeaders,
  netlifyHeaders
};
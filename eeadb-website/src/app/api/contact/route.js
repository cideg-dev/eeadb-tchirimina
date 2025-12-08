import { NextResponse } from 'next/server';
import { withSecurity } from '../../middleware/security';

// Configuration de validation
const VALIDATION_CONFIG = {
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MAX_SUBJECT_LENGTH: 200,
  MAX_MESSAGE_LENGTH: 5000,
  MIN_MESSAGE_LENGTH: 10,
  HONEYPOT_FIELD: 'website' // Champ honeypot pour détecter les spams
};

// Fonction de validation des données de contact
const validateContactData = (data) => {
  const errors = [];
  const sanitized = {};

  // Validation du nom
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Le nom est requis');
  } else if (data.name.length > VALIDATION_CONFIG.MAX_NAME_LENGTH) {
    errors.push(`Le nom ne doit pas dépasser ${VALIDATION_CONFIG.MAX_NAME_LENGTH} caractères`);
  } else {
    sanitized.name = data.name.trim();
  }

  // Validation de l'email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('L\'email est requis');
  } else if (data.email.length > VALIDATION_CONFIG.MAX_EMAIL_LENGTH) {
    errors.push(`L'email ne doit pas dépasser ${VALIDATION_CONFIG.MAX_EMAIL_LENGTH} caractères`);
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Adresse e-mail invalide');
    } else {
      sanitized.email = data.email.toLowerCase().trim();
    }
  }

  // Validation du sujet
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push('Le sujet est requis');
  } else if (data.subject.length > VALIDATION_CONFIG.MAX_SUBJECT_LENGTH) {
    errors.push(`Le sujet ne doit pas dépasser ${VALIDATION_CONFIG.MAX_SUBJECT_LENGTH} caractères`);
  } else {
    sanitized.subject = data.subject.trim();
  }

  // Validation du message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Le message est requis');
  } else if (data.message.length < VALIDATION_CONFIG.MIN_MESSAGE_LENGTH) {
    errors.push(`Le message doit contenir au moins ${VALIDATION_CONFIG.MIN_MESSAGE_LENGTH} caractères`);
  } else if (data.message.length > VALIDATION_CONFIG.MAX_MESSAGE_LENGTH) {
    errors.push(`Le message ne doit pas dépasser ${VALIDATION_CONFIG.MAX_MESSAGE_LENGTH} caractères`);
  } else {
    sanitized.message = data.message.trim();
  }

  // Vérification honeypot (protection contre les spams)
  if (data[VALIDATION_CONFIG.HONEYPOT_FIELD]) {
    errors.push('Validation échouée'); // Message générique pour ne pas révéler le honeypot
  }

  return { valid: errors.length === 0, errors, sanitized };
};

// Handler principal pour POST /api/contact
const handler = async (request) => {
  try {
    // Parser le JSON avec gestion d'erreur
    let data;
    try {
      data = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        { error: 'Données JSON invalides' },
        { status: 400 }
      );
    }

    // Validation stricte des données
    const validation = validateContactData(data);
    
    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: 'Validation échouée',
          details: validation.errors,
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // Log sécurisé (sans exposer les données sensibles)
    console.log(`[Contact] Nouveau message de ${validation.sanitized.email} - Sujet: ${validation.sanitized.subject}`);

    // TODO: Implémenter l'envoi via GitHub Actions ou service d'email
    // Pour l'instant, simuler un envoi réussi
    // Exemple d'implémentation future:
    // await triggerGitHubWorkflow(validation.sanitized);

    return NextResponse.json({
      message: 'Message envoyé avec succès',
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Log d'erreur sécurisé
    console.error(`[Contact] Erreur lors du traitement: ${error.message}`);
    
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de l\'envoi du message',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
};

// Exporter le handler avec sécurité intégrée
export const POST = withSecurity(handler, {
  allowedMethods: ['POST'],
  allowedParams: [], // Aucun paramètre GET autorisé
  requireAuth: false
});
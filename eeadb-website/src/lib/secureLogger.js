/**
 * Service de logging sécurisé
 * Gère les logs applicatifs de manière sécurisée
 * sans exposer d'informations sensibles
 */

// Niveau de log
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Configuration du logging
const LOG_CONFIG = {
  level: process.env.NODE_ENV === 'production' ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG,
  enableConsole: process.env.NODE_ENV !== 'production',
  enableRemoteLogging: process.env.NODE_ENV === 'production' // à activer avec un service externe
};

// Fonction pour masquer les données sensibles dans les logs
const sanitizeLogData = (data) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };
  
  // Mots-clés à censurer dans les logs
  const sensitiveKeys = [
    'password', 'token', 'secret', 'key', 'api_key', 'email', 'phone',
    'authorization', 'cookie', 'auth', 'credentials', 'session'
  ];

  for (const [key, value] of Object.entries(sanitized)) {
    if (sensitiveKeys.some(sensitive => 
      sensitive.toLowerCase().includes(key.toLowerCase()) || 
      key.toLowerCase().includes(sensitive.toLowerCase())
    )) {
      sanitized[key] = '[CENSURÉ]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeLogData(value);
    }
  }

  return sanitized;
};

// Service de logging
const secureLogger = {
  log: (level, message, data = null) => {
    // Vérifier si le niveau de log est autorisé
    const allowedLevels = Object.keys(LOG_LEVELS)
      .slice(Object.keys(LOG_LEVELS).indexOf(LOG_CONFIG.level));
    
    if (!allowedLevels.includes(level)) {
      return;
    }

    // Formatage du log
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data: data ? sanitizeLogData(data) : null,
      // Ajouter des informations non sensibles
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server'
    };

    // Log dans la console en développement
    if (LOG_CONFIG.enableConsole) {
      const logFn = level === LOG_LEVELS.ERROR ? console.error : 
                   level === LOG_LEVELS.WARN ? console.warn : console.log;
      
      logFn(`[${level.toUpperCase()}] ${message}`, logEntry.data || '');
    }

    // En production, envoyer les logs critiques à un service externe
    if (LOG_CONFIG.enableRemoteLogging && level === LOG_LEVELS.ERROR) {
      // Cette fonctionnalité peut être implémentée avec un service de logging externe
      // comme Sentry, LogRocket, ou un endpoint personnalisé
      sendLogToRemote(logEntry);
    }
  },

  error: (message, data = null) => secureLogger.log(LOG_LEVELS.ERROR, message, data),
  warn: (message, data = null) => secureLogger.log(LOG_LEVELS.WARN, message, data),
  info: (message, data = null) => secureLogger.log(LOG_LEVELS.INFO, message, data),
  debug: (message, data = null) => secureLogger.log(LOG_LEVELS.DEBUG, message, data)
};

// Fonction pour envoyer les logs à un service distant (placeholder)
const sendLogToRemote = (logEntry) => {
  // Dans une implémentation réelle, on enverrait les logs à un service comme:
  // - Sentry
  // - LogRocket
  // - Un endpoint personnalisé avec un token d'authentification
  console.log('Log distant:', logEntry);
  
  // Exemple d'envoi sécurisé (désactivé par défaut):
  /*
  fetch('/api/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LOGGING_API_KEY}` // à ne pas stocker en clair dans le client
    },
    body: JSON.stringify(logEntry)
  }).catch(error => {
    // Ne pas logguer l'erreur ici pour éviter une boucle infinie
    console.warn('Erreur lors de l\'envoi du log distant:', error.message);
  });
  */
};

export default secureLogger;
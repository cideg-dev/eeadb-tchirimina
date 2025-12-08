/**
 * API Route: Événements
 * Fournit la liste des événements à venir
 * @route GET /api/events.json
 */

import { getEventsFromFile } from '../../../lib/dataLoader';
import { withSecurity } from '../../middleware/security';

// Handler principal pour GET /api/events.json
const handler = async (request) => {
  try {
    const events = await getEventsFromFile();
    
    // Ajouter des headers de cache pour améliorer les performances
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400', // Cache 30 minutes
      },
    });
  } catch (error) {
    console.error('[API] Erreur lors du chargement des événements:', error.message);
    
    return new Response(
      JSON.stringify({ 
        error: 'Impossible de charger les événements',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

// Exporter le handler avec sécurité intégrée
export const GET = withSecurity(handler, {
  allowedMethods: ['GET'],
  allowedParams: [], // Aucun paramètre GET autorisé
  requireAuth: false
});
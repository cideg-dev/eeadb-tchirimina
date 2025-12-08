import { getVersetDuJourFromFile } from '../../../lib/dataLoader';
import { withSecurity } from '../../middleware/security';

// Handler principal pour GET /api/verset_du_jour.json
const handler = async (request) => {
  try {
    const verset = await getVersetDuJourFromFile();
    
    // Ajouter des headers de cache pour améliorer les performances
    return new Response(JSON.stringify(verset), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache 1 heure
      },
    });
  } catch (error) {
    console.error('[API] Erreur lors du chargement du verset du jour:', error.message);
    
    return new Response(
      JSON.stringify({ 
        error: 'Impossible de charger le verset du jour',
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
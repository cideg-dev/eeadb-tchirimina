import { getResources } from '@/lib/dataService';

export async function GET() {
  try {
    const resources = await getResources();
    return new Response(JSON.stringify(resources), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Impossible de charger les ressources' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
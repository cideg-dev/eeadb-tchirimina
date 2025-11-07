import { getPhotos } from '../../../lib/dataService';

export async function GET() {
  try {
    const photos = await getPhotos();
    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Impossible de charger les photos' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
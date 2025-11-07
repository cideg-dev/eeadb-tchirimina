import { getVersetDuJour } from '@/lib/dataService';

export async function GET() {
  try {
    const verset = await getVersetDuJour();
    return new Response(JSON.stringify(verset), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Impossible de charger le verset du jour' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
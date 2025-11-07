import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Valider l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide' },
        { status: 400 }
      );
    }

    // Ici, nous pourrions envoyer une requête à GitHub pour déclencher le workflow
    // Pour l'instant, nous simulons le comportement pour éviter les erreurs
    console.log('Données du formulaire reçues:', { name, email, subject, message });

    // Dans une implémentation réelle, vous voudriez probablement:
    // 1. Valider les données
    // 2. Envoyer une requête à l'API GitHub pour déclencher le workflow send_email.yml
    // 3. Gérer la réponse
    
    // Pour l'instant, simulons un envoi réussi
    return NextResponse.json({
      message: 'Message envoyé avec succès',
      success: true
    });
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire de contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
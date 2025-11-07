// pages/api/subscribe.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { email } = req.body;

  // Validation de base de l'email
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Adresse e-mail invalide' 
    });
  }

  try {
    // Dans une application réelle, vous intégreriez avec un service comme Mailchimp, Sendinblue, etc.
    // Pour cette démonstration, nous simulons l'abonnement
    console.log(`Nouvel abonné: ${email}`);
    
    // Simuler un appel API à un service de newsletter
    // await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
    //   email_address: email,
    //   status: 'subscribed'
    // });

    res.status(200).json({ 
      success: true, 
      message: 'Merci pour votre abonnement à notre newsletter!' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'abonnement:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.' 
    });
  }
}
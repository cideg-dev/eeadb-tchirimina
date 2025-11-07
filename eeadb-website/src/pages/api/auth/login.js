// pages/api/auth/login.js
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { email, password } = req.body;

  // Dans une application réelle, vous vérifieriez les identifiants dans une base de données
  // Pour cette démonstration, nous utilisons des identifiants de test
  const validCredentials = process.env.NODE_ENV === 'production' 
    ? email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
    : email === 'admin@eeadb-tchirimina.org' && password === 'admin123';

  if (validCredentials) {
    // Créer un token de session simple (dans une application réelle, utilisez JWT ou une session sécurisée)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    // Définir le cookie de session
    res.setHeader('Set-Cookie', serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 heures
      sameSite: true,
      path: '/'
    }));

    return res.status(200).json({ 
      success: true, 
      message: 'Connexion réussie',
      user: { email, name: 'Administrateur' }
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Identifiants incorrects' 
    });
  }
}
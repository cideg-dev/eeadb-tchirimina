// pages/api/auth/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  // Supprimer le cookie d'authentification
  res.setHeader('Set-Cookie', serialize('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expiration immédiate
    sameSite: true,
    path: '/'
  }));

  res.status(200).json({ success: true, message: 'Déconnexion réussie' });
}
// pages/api/auth/me.js
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  // Vérifier la présence du cookie d'authentification
  const token = req.cookies['auth-token'];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Non authentifié' 
    });
  }

  // Dans une application réelle, vous décoderez et vérifierez le token
  // Pour cette démonstration, nous considérons que le token valide est suffisant
  try {
    // Décoder le token pour extraire les informations
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    const [email] = decoded.split(':');
    
    res.status(200).json({ 
      success: true, 
      user: { 
        email,
        name: 'Administrateur',
        role: 'admin'
      } 
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token invalide' 
    });
  }
}
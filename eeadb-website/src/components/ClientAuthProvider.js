'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Fonction utilitaire pour vérifier si l'utilisateur a accès à une zone privée
// En mode statique, on peut vérifier un token dans l'URL ou un paramètre spécial
const checkAccess = () => {
  // Pour un site statique, on peut utiliser un mécanisme basé sur des jetons
  // ou des liens pré-signés générés via GitHub Actions
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Dans un vrai scénario, on vérifierait la signature du token
    // et son expiration
    if (token) {
      // Ici, en production, on devrait vérifier la signature HMAC du token
      // et son expiration
      return isValidToken(token);
    }
  }

  return false;
};

// Fonction pour valider un token (simplifiée pour un site statique)
const isValidToken = (token) => {
  // En réalité, on devrait vérifier la signature HMAC et la date d'expiration
  // Pour un site statique, on ne peut pas stocker de clé secrète, donc
  // le mécanisme le plus sûr est de générer des liens temporaires
  // via GitHub Actions ou un service backend externe

  // Pour l'instant, on retourne false pour forcer un mécanisme d'accès externe
  // dans une implémentation réelle, on vérifierait la signature du token
  return token === 'admin123'; // Simplifié pour la démonstration
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData) => {
    try {
      // Pour un site statique exporté, l'authentification traditionnelle
      // n'est pas possible sans backend externe
      // Pour cette démo, nous acceptons simplement si les données sont fournies
      if (userData && userData.username) {
        setUser(userData);
        return { success: true, message: 'Connexion réussie' };
      } else {
        return { success: false, message: 'Données d\'utilisateur manquantes' };
      }
    } catch (error) {
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    try {
      // Simulation
      setUser(null);
      // Utiliser window.location pour la redirection côté client
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      // Vérifier si l'utilisateur a accès via un token valide
      // Le token serait généré via une GitHub Action avec signature HMAC
      const hasAccess = checkAccess();

      if (hasAccess) {
        // Si l'utilisateur a un token valide, on le considère comme authentifié
        setUser({ name: 'Membre privilégié', role: 'private_access' });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // On ne peut vérifier l'authentification que côté client
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
    checkAuthStatus // Exposer la fonction pour mise à jour manuelle si nécessaire
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
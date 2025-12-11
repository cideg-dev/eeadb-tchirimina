'use client';

// components/PrivateRoute.js
import { useAuth } from './ClientAuthProvider';
import { useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Utiliser window.location pour la redirection côté client
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eeadb-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // La redirection dans useEffect s'occupera de la redirection
  }

  return children;
}
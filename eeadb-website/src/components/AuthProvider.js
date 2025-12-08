// components/AuthProvider.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      // Simulation pour site statique
      // const res = await fetch('/api/auth/login', { ... });
      
      // Simulation basique
      if (email === 'admin@eeadb-tchirimina.org' && password === 'admin') {
         const fakeUser = { name: 'Admin', email };
         setUser(fakeUser);
         router.push('/dashboard');
         return { success: true };
      }

      return { success: false, message: 'Identifiants invalides (Simulation)' };
    } catch (error) {
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    try {
      // Simulation
      // await fetch('/api/auth/logout', { ... });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      // Simulation: pas d'auth persistante sur site statique sans backend externe
      // const res = await fetch('/api/auth/me');
      setUser(null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
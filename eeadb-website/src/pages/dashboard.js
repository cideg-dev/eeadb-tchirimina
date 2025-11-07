// pages/dashboard.js
import { useAuth } from '../components/AuthProvider';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const [events, setEvents] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Dans une application réelle, ces données seraient récupérées via des API sécurisées
    // Simulons la récupération des données
    if (!loading && !user) {
      // Rediriger si non authentifié
      window.location.href = '/login';
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
    return null; // Le composant de redirection dans useEffect s'occupera de la redirection
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard - EEADB-Tchirimina</title>
      </Head>

      {/* Header */}
      <header className="bg-eeadb-blue text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Espace Administrateur</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Bonjour, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-eeadb-blue-dark hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bonjour, {user.name}!</h2>
          <p className="text-gray-600">Bienvenue dans votre espace administrateur</p>
        </div>

        {/* Cartes de raccourcis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/events" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <div className="flex items-center">
              <div className="bg-eeadb-blue text-white p-3 rounded-lg mr-4">
                <i className="fas fa-calendar-plus text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Événements</h3>
                <p className="text-gray-600">Gérer les événements</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/gallery" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <div className="flex items-center">
              <div className="bg-eeadb-blue text-white p-3 rounded-lg mr-4">
                <i className="fas fa-images text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Galerie</h3>
                <p className="text-gray-600">Gérer les photos</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/messages" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <div className="flex items-center">
              <div className="bg-eeadb-blue text-white p-3 rounded-lg mr-4">
                <i className="fas fa-envelope text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                <p className="text-gray-600">Voir les messages</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Dernières activités */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Dernières activités</h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-eeadb-blue pl-4 py-2">
              <h4 className="font-medium text-gray-900">Nouvel événement ajouté</h4>
              <p className="text-gray-600 text-sm">Culte de Noël le 24 décembre</p>
              <p className="text-gray-500 text-xs">Il y a 2 heures</p>
            </div>
            
            <div className="border-l-4 border-eeadb-blue pl-4 py-2">
              <h4 className="font-medium text-gray-900">Nouvelles photos ajoutées</h4>
              <p className="text-gray-600 text-sm">Photos du culte du dimanche</p>
              <p className="text-gray-500 text-xs">Hier</p>
            </div>
            
            <div className="border-l-4 border-eeadb-blue pl-4 py-2">
              <h4 className="font-medium text-gray-900">Nouveau message reçu</h4>
              <p className="text-gray-600 text-sm">Demande de prière de Marie L.</p>
              <p className="text-gray-500 text-xs">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
// pages/admin/messages.js
import { useAuth } from '../../components/AuthProvider';
import PrivateRoute from '../../components/PrivateRoute';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function MessagesManagement() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  // Simuler la récupération des messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Dans une application réelle, vous récupéreriez les messages depuis une API
        const mockMessages = [
          {
            id: 1,
            name: 'Marie Dupont',
            email: 'marie@example.com',
            subject: 'Demande de renseignements',
            message: 'Bonjour, je souhaiterais obtenir plus d\'informations sur vos activités pour les jeunes.',
            date: '2025-10-15T14:30:00',
            status: 'unread',
            category: 'renseignements'
          },
          {
            id: 2,
            name: 'Jean Kouassi',
            email: 'jean@example.com',
            subject: 'Demande de prière',
            message: 'Je vous prie de bien vouloir prier pour mon fils qui est malade.',
            date: '2025-10-14T09:15:00',
            status: 'read',
            category: 'prière'
          },
          {
            id: 3,
            name: 'Sophie Adjovi',
            email: 'sophie@example.com',
            subject: 'Visite au temple',
            message: 'Je souhaite visiter votre temple ce dimanche pour un culte. Merci de me confirmer les horaires.',
            date: '2025-10-13T16:45:00',
            status: 'read',
            category: 'visite'
          }
        ];
        
        setMessages(mockMessages);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(messages.filter(message => message.id !== id));
    }
  };

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status: 'read' } : message
    ));
  };

  const handleMarkAsUnread = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, status: 'unread' } : message
    ));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    if (filter === 'read') return message.status === 'read';
    if (filter === 'unread') return message.status === 'unread';
    return message.category === filter;
  });

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Gestion des messages - EEADB-Tchirimina</title>
        </Head>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des messages</h1>
            <p className="text-gray-600">Voir et gérer les messages reçus via le formulaire de contact</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'all' 
                    ? 'bg-eeadb-blue text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tous ({messages.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'unread' 
                    ? 'bg-eeadb-blue text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Non lus ({messages.filter(m => m.status === 'unread').length})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'read' 
                    ? 'bg-eeadb-blue text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Lus ({messages.filter(m => m.status === 'read').length})
              </button>
              <button
                onClick={() => setFilter('prière')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'prière' 
                    ? 'bg-eeadb-blue text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Prière ({messages.filter(m => m.category === 'prière').length})
              </button>
              <button
                onClick={() => setFilter('renseignements')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'renseignements' 
                    ? 'bg-eeadb-blue text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Renseignements ({messages.filter(m => m.category === 'renseignements').length})
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eeadb-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Liste des messages */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <ul className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                      <li className="p-6 text-center text-gray-500">
                        Aucun message trouvé
                      </li>
                    ) : (
                      filteredMessages.map((message) => (
                        <li 
                          key={message.id} 
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                          } ${message.status === 'unread' ? 'bg-blue-25' : ''}`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              {message.status === 'unread' && (
                                <span className="w-2 h-2 bg-eeadb-blue rounded-full mr-2"></span>
                              )}
                              <h3 className="font-medium text-gray-900 truncate">{message.name}</h3>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(message.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate mt-1">{message.subject}</p>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{message.message}</p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              {/* Détail du message */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <div className="bg-white rounded-lg shadow-md p-6 h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
                        <div className="flex items-center mt-1">
                          <span className="text-gray-700 font-medium">{selectedMessage.name}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-600">{selectedMessage.email}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {selectedMessage.status === 'unread' ? (
                          <button
                            onClick={() => handleMarkAsRead(selectedMessage.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Marquer comme lu"
                          >
                            <i className="fas fa-envelope-open"></i>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMarkAsUnread(selectedMessage.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Marquer comme non lu"
                          >
                            <i className="fas fa-envelope"></i>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(selectedMessage.id)}
                          className="text-red-600 hover:text-red-900 ml-2"
                          title="Supprimer"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>Reçu le {formatDate(selectedMessage.date)}</span>
                      <span className="mx-2">•</span>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-eeadb-blue rounded-full">
                        {selectedMessage.category === 'prière' ? 'Demande de prière' : 
                         selectedMessage.category === 'renseignements' ? 'Renseignements' :
                         selectedMessage.category === 'visite' ? 'Visite' : 'Autre'}
                      </span>
                    </div>
                    
                    <div className="prose max-w-none">
                      <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Répondre au message</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="reply-message" className="block text-sm font-medium text-gray-700 mb-1">
                            Votre réponse
                          </label>
                          <textarea
                            id="reply-message"
                            name="reply-message"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                            placeholder="Tapez votre réponse ici..."
                          ></textarea>
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="bg-eeadb-blue text-white px-4 py-2 rounded-md hover:bg-eeadb-blue-dark transition-colors"
                          >
                            Répondre
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-12 h-full flex flex-col items-center justify-center text-center">
                    <i className="fas fa-envelope text-5xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Sélectionnez un message</h3>
                    <p className="text-gray-500">Cliquez sur un message dans la liste pour l'afficher ici</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </PrivateRoute>
  );
}
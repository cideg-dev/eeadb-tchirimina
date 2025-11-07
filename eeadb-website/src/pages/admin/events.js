// pages/admin/events.js
import { useAuth } from '../../components/AuthProvider';
import PrivateRoute from '../../components/PrivateRoute';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function EventsManagement() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Simuler la récupération des événements
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Dans une application réelle, vous récupéreriez les événements depuis une API
        const mockEvents = [
          {
            id: 1,
            title: 'Culte de Noël',
            start: '2025-12-24T18:00:00',
            end: '2025-12-24T20:00:00',
            description: 'Culte de célébration de Noël au temple BERACA',
            location: 'Temple BERACA',
            category: 'Culte'
          },
          {
            id: 2,
            title: 'Réunion de prière jeunesse',
            start: '2025-12-25T19:00:00',
            end: '2025-12-25T21:00:00',
            description: 'Réunion spéciale pour la jeunesse',
            location: 'Temple BERACA',
            category: 'Jeunesse'
          }
        ];
        
        setEvents(mockEvents);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    location: '',
    category: 'Culte'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentEvent) {
      // Mise à jour d'un événement existant
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id ? { ...newEvent, id: currentEvent.id } : event
      );
      setEvents(updatedEvents);
    } else {
      // Ajout d'un nouvel événement
      const eventToAdd = {
        ...newEvent,
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
      };
      setEvents([...events, eventToAdd]);
    }
    
    // Réinitialiser le formulaire
    setNewEvent({
      title: '',
      start: '',
      end: '',
      description: '',
      location: '',
      category: 'Culte'
    });
    setShowForm(false);
    setCurrentEvent(null);
  };

  const handleEdit = (event) => {
    setNewEvent({
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      location: event.location,
      category: event.category
    });
    setCurrentEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Gestion des événements - EEADB-Tchirimina</title>
        </Head>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des événements</h1>
            <p className="text-gray-600">Ajouter, modifier ou supprimer les événements du calendrier</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                setCurrentEvent(null);
                setNewEvent({
                  title: '',
                  start: '',
                  end: '',
                  description: '',
                  location: '',
                  category: 'Culte'
                });
                setShowForm(true);
              }}
              className="bg-eeadb-blue text-white px-4 py-2 rounded-md hover:bg-eeadb-blue-dark transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Ajouter un événement
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentEvent ? 'Modifier l\'événement' : 'Ajouter un nouvel événement'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Titre *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newEvent.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    >
                      <option value="Culte">Culte</option>
                      <option value="Jeunesse">Jeunesse</option>
                      <option value="École">École du dimanche</option>
                      <option value="Prière">Prière</option>
                      <option value="Louange">Louange</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="start" className="block text-sm font-medium text-gray-700 mb-1">
                      Date et heure de début *
                    </label>
                    <input
                      type="datetime-local"
                      id="start"
                      name="start"
                      value={newEvent.start ? newEvent.start.replace('T', 'T').substring(0, 16) : ''}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="end" className="block text-sm font-medium text-gray-700 mb-1">
                      Date et heure de fin *
                    </label>
                    <input
                      type="datetime-local"
                      id="end"
                      name="end"
                      value={newEvent.end ? newEvent.end.replace('T', 'T').substring(0, 16) : ''}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Lieu
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    type="submit"
                    className="bg-eeadb-blue text-white px-4 py-2 rounded-md hover:bg-eeadb-blue-dark transition-colors"
                  >
                    {currentEvent ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setCurrentEvent(null);
                      setNewEvent({
                        title: '',
                        start: '',
                        end: '',
                        description: '',
                        location: '',
                        category: 'Culte'
                      });
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eeadb-blue"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {events.length === 0 ? (
                  <li className="p-6 text-center text-gray-500">
                    Aucun événement trouvé
                  </li>
                ) : (
                  events.map((event) => (
                    <li key={event.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900 truncate">{event.title}</h3>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-eeadb-blue">
                              {event.category}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {formatDate(event.start)} - {formatDate(event.end)}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">{event.location}</p>
                          <p className="mt-2 text-sm text-gray-700">{event.description}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex space-x-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 hover:text-red-900 ml-2"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </main>
      </div>
    </PrivateRoute>
  );
}
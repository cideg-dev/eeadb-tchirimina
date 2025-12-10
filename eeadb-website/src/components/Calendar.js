'use client';

import { useState, useEffect, useRef } from 'react';
import { getEvents } from '../lib/dataService';

// Hook personnalisé pour détecter la taille de l'écran
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Vérifier que window est disponible
    if (typeof window !== 'undefined') {
      handleResize(); // Obtenir la taille initiale
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return screenSize;
};

const Calendar = ({ events: externalEvents = [] }) => {
  const [view, setView] = useState('dayGridMonth');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef(null);
  const [activeButton, setActiveButton] = useState(view);
  const { width } = useScreenSize();

  // Charger les événements depuis le service de données
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (externalEvents && externalEvents.length > 0) {
          // Si les événements sont passés en props, les utiliser directement
          setCalendarEvents(externalEvents);
        } else {
          // Sinon, charger les données depuis le service
          const data = await getEvents();
          setCalendarEvents(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        setCalendarEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [externalEvents]);

  // Initialiser le calendrier FullCalendar après le rendu du composant
  useEffect(() => {
    if (typeof window !== 'undefined' && calendarRef.current) {
      let calendarInstance = null;

      // Import dynamique de FullCalendar pour éviter les erreurs de serveur
      const initializeCalendar = async () => {
        try {
          const { Calendar } = await import('@fullcalendar/core');
          const { default: dayGridPlugin } = await import('@fullcalendar/daygrid');
          const { default: timeGridPlugin } = await import('@fullcalendar/timegrid');
          const { default: interactionPlugin } = await import('@fullcalendar/interaction');

          // Nettoyer l'instance précédente avant de créer une nouvelle
          if (calendarInstance) {
            calendarInstance.destroy();
          }

          calendarInstance = new Calendar(calendarRef.current, {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: view,
            events: calendarEvents.map(event => ({
              id: event.id,
              title: event.title,
              start: event.start ? new Date(event.start).toISOString() : null,
              end: event.end ? new Date(event.end).toISOString() : null,
              description: event.description || event.extendedProps?.description,
              location: event.location || event.extendedProps?.location,
              className: event.className || 'default-event-class',
            })), // Formater correctement les dates pour FullCalendar
            locale: 'fr',
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }, // Réactiver la toolbar pour une navigation standard
            eventClick: function(info) {
              setSelectedEvent({
                title: info.event.title,
                start: info.event.start,
                end: info.event.end,
                description: info.event.extendedProps?.description || info.event.description,
                location: info.event.extendedProps?.location || info.event.location
              });
            },
            // Configuration pour la performance et la stabilité mobile
            dayMaxEvents: true, // Autoriser le "more" pour éviter le chevauchement
            eventDisplay: 'block', // Utiliser 'block' pour une meilleure lisibilité
            height: 'auto', // Utiliser la hauteur automatique
            contentHeight: width < 768 ? 500 : 600, // Hauteur réduite sur mobile
            aspectRatio: width < 768 ? 1.2 : 1.8, // Ratio plus petit sur mobile pour meilleure lisibilité
            fixedWeekCount: false, // Permettre à la vue mois de s'adapter
            weekends: true, // Afficher les week-ends
            navLinks: true, // Permettre la navigation par clic sur les dates
            nowIndicator: true, // Indiquer la date actuelle
            editable: false, // Désactiver l'édition
            selectable: false, // Désactiver la sélection
            selectMirror: true,
            dayMaxEventRows: width < 768 ? 2 : 4, // Moins d'événements par jour sur mobile pour plus de lisibilité
            // Configuration spécifique pour mobile
            views: {
              dayGridMonth: {
                dayMaxEventRows: width < 768 ? 2 : 3, // Moins d'événements par jour en vue mensuelle sur mobile
              },
              timeGridWeek: {
                slotDuration: '00:30:00', // Intervalle de 30 minutes
                slotEventOverlap: false, // Désactiver le chevauchement des événements
              },
              timeGridDay: {
                slotDuration: '00:30:00',
                slotEventOverlap: false,
              }
            },
            // Responsive breakpoints
            initialDate: new Date(), // Définir la date initiale à aujourd'hui
            // Désactiver les animations pour améliorer la performance mobile
            showNonCurrentDates: false, // Cacher les dates du mois précédent/suivant pour moins de clutter
            progressiveEventRendering: true, // Activer le rendu progressif pour les performances
          });

          calendarInstance.render();
        } catch (error) {
          console.error('Erreur lors de l\'initialisation de FullCalendar:', error);
        }
      };

      // Vérifier si les événements sont chargés avant d'initialiser le calendrier
      if (calendarEvents.length > 0) {
        initializeCalendar();
      }

      // Nettoyer l'instance du calendrier lors du démontage
      return () => {
        if (calendarInstance) {
          calendarInstance.destroy();
        }
      };
    }
  }, [calendarEvents, view, width]); // Ajouter width aux dépendances pour la mise à jour responsive

  const handleViewChange = (newView) => {
    setView(newView);
    setActiveButton(newView);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-eeadb-blue mb-4 md:mb-0">Calendrier des événements</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                activeButton === 'dayGridMonth'
                  ? 'bg-gradient-to-r from-eeadb-blue-600 to-eeadb-blue-700 text-white shadow-lg'
                  : 'bg-white text-eeadb-blue-700 border border-eeadb-blue-200 hover:bg-eeadb-blue-50'
              }`}
              onClick={() => handleViewChange('dayGridMonth')}
            >
              <i className="fas fa-calendar-days mr-2"></i>Mois
            </button>
            <button
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                activeButton === 'timeGridWeek'
                  ? 'bg-gradient-to-r from-eeadb-blue-600 to-eeadb-blue-700 text-white shadow-lg'
                  : 'bg-white text-eeadb-blue-700 border border-eeadb-blue-200 hover:bg-eeadb-blue-50'
              }`}
              onClick={() => handleViewChange('timeGridWeek')}
            >
              <i className="fas fa-calendar-week mr-2"></i>Semaine
            </button>
            <button
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                activeButton === 'timeGridDay'
                  ? 'bg-gradient-to-r from-eeadb-blue-600 to-eeadb-blue-700 text-white shadow-lg'
                  : 'bg-white text-eeadb-blue-700 border border-eeadb-blue-200 hover:bg-eeadb-blue-50'
              }`}
              onClick={() => handleViewChange('timeGridDay')}
            >
              <i className="fas fa-calendar-day mr-2"></i>Jour
            </button>
          </div>
        </div>

        {/* Conteneur pour le calendrier FullCalendar */}
        <div ref={calendarRef} className="min-h-[600px] bg-white p-4 rounded-xl border border-gray-200 shadow-inner" />
        
        {/* Affichage des événements dans une liste comme solution de repli */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-eeadb-blue mb-4 flex items-center">
            <i className="fas fa-list mr-2"></i>Événements à venir
          </h3>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-eeadb-blue"></div>
            </div>
          ) : calendarEvents.length > 0 ? (
            <div className="space-y-4">
              {calendarEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl border border-gray-200 flex items-start hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="bg-gradient-to-b from-eeadb-blue-600 to-eeadb-blue-800 text-white p-4 rounded-lg text-center mr-5 min-w-[75px] shadow-md">
                    <div className="text-lg font-bold">{new Date(event.start).getDate()}</div>
                    <div className="text-xs uppercase tracking-wider">{new Date(event.start).toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-eeadb-blue mb-1">{event.title}</h4>
                    <div className="flex items-center text-gray-600 mb-1">
                      <i className="fas fa-clock mr-2 text-eeadb-blue-500"></i>
                      <span>
                        {new Date(event.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(event.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-location-dot mr-2 text-eeadb-blue-500"></i>
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex items-center">
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="inline-block p-4 bg-eeadb-blue-100 rounded-full mb-4">
                <i className="fas fa-calendar-check text-eeadb-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun événement prévu</h3>
              <p className="text-gray-600">Revenez bientôt pour découvrir nos prochains événements</p>
            </div>
          )}
        </div>

        {/* Modal pour afficher les détails de l'événement */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative transform transition-all duration-300 scale-100">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                onClick={() => setSelectedEvent(null)}
                aria-label="Fermer la fenêtre de détails"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="mb-4">
                <div className="inline-block bg-eeadb-blue-100 text-eeadb-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Événement
                </div>
                <h3 className="text-2xl font-bold text-eeadb-blue mb-3">{selectedEvent.title}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start text-gray-700 p-3 bg-gray-50 rounded-lg">
                  <i className="fas fa-calendar-day mr-3 mt-1 text-eeadb-blue-500"></i>
                  <span>{new Date(selectedEvent.start).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div className="flex items-start text-gray-700 p-3 bg-gray-50 rounded-lg">
                  <i className="fas fa-clock mr-3 mt-1 text-eeadb-blue-500"></i>
                  <span>
                    {new Date(selectedEvent.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} -
                    {new Date(selectedEvent.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start text-gray-700 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-location-dot mr-3 mt-1 text-eeadb-blue-500"></i>
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-eeadb-blue mb-2 flex items-center">
                      <i className="fas fa-info-circle mr-2"></i>Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;
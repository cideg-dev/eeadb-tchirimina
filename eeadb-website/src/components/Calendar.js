'use client';

import { useState, useEffect, useRef } from 'react';
import { getEvents } from '../lib/dataService';

const Calendar = ({ events: externalEvents = [] }) => {
  const [view, setView] = useState('dayGridMonth');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef(null);

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
    if (typeof window !== 'undefined' && window.FullCalendar && calendarRef.current) {
      // Import dynamique de FullCalendar pour éviter les erreurs de serveur
      const initializeCalendar = async () => {
        const { Calendar } = await import('@fullcalendar/core');
        const dayGridPlugin = await import('@fullcalendar/daygrid');
        const timeGridPlugin = await import('@fullcalendar/timegrid');
        const interactionPlugin = await import('@fullcalendar/interaction');
        
        const calendarInstance = new Calendar(calendarRef.current, {
          plugins: [dayGridPlugin.default, timeGridPlugin.default, interactionPlugin.default],
          initialView: view,
          events: calendarEvents.map(event => ({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description,
            location: event.location
          })),
          locale: 'fr',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          eventClick: function(info) {
            setSelectedEvent({
              title: info.event.title,
              start: info.event.start,
              end: info.event.end,
              description: info.event.extendedProps.description,
              location: info.event.extendedProps.location
            });
          },
          // Utiliser les icônes FontAwesome pour les boutons
          buttonIcons: {
            prev: 'fa-solid fa-chevron-left',
            next: 'fa-solid fa-chevron-right',
            prevYear: 'fa-solid fa-angles-left',
            nextYear: 'fa-solid fa-angles-right'
          },
          buttonText: {
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour'
          }
        });

        calendarInstance.render();

        // Nettoyer l'instance du calendrier lors du démontage
        return () => {
          calendarInstance.destroy();
        };
      };

      initializeCalendar();
    }
  }, [calendarEvents, view]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-eeadb-blue mb-4 md:mb-0">Calendrier des événements</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'dayGridMonth'
                ? 'bg-eeadb-blue text-white'
                : 'bg-white text-eeadb-blue border border-eeadb-blue hover:bg-eeadb-blue hover:text-white'
            }`}
            onClick={() => handleViewChange('dayGridMonth')}
          >
            <i className="fas fa-calendar-days mr-2"></i>Mois
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'timeGridWeek'
                ? 'bg-eeadb-blue text-white'
                : 'bg-white text-eeadb-blue border border-eeadb-blue hover:bg-eeadb-blue hover:text-white'
            }`}
            onClick={() => handleViewChange('timeGridWeek')}
          >
            <i className="fas fa-calendar-week mr-2"></i>Semaine
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'timeGridDay'
                ? 'bg-eeadb-blue text-white'
                : 'bg-white text-eeadb-blue border border-eeadb-blue hover:bg-eeadb-blue hover:text-white'
            }`}
            onClick={() => handleViewChange('timeGridDay')}
          >
            <i className="fas fa-calendar-day mr-2"></i>Jour
          </button>
        </div>
      </div>

      {/* Conteneur pour le calendrier FullCalendar */}
      <div ref={calendarRef} className="min-h-[500px] bg-white p-4 rounded-lg border border-gray-200" />
      
      {/* Affichage des événements dans une liste comme solution de repli */}
      {(!calendarRef.current || loading) && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-eeadb-blue mb-3">Événements à venir</h3>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-eeadb-blue"></div>
            </div>
          ) : calendarEvents.length > 0 ? (
            <div className="space-y-3">
              {calendarEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="bg-white p-4 rounded-lg border border-gray-200 flex items-start hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="bg-eeadb-blue text-white p-3 rounded-lg text-center mr-4 min-w-[70px]">
                    <div className="text-lg font-bold">{new Date(event.start).getDate()}</div>
                    <div className="text-xs uppercase">{new Date(event.start).toLocaleDateString('fr-FR', { month: 'short' })}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-eeadb-blue">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <i className="fas fa-clock mr-2"></i>
                      {new Date(event.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} -
                      {new Date(event.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <i className="fas fa-location-dot mr-2"></i>
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-calendar-plus text-3xl mb-3"></i>
              <p>Aucun événement prévu pour le moment</p>
            </div>
          )}
        </div>
      )}

      {/* Modal pour afficher les détails de l'événement */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedEvent(null)}
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            <h3 className="text-xl font-bold text-eeadb-blue mb-3">{selectedEvent.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <i className="fas fa-calendar-day mr-3 text-eeadb-blue"></i>
                <span>{new Date(selectedEvent.start).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-clock mr-3 text-eeadb-blue"></i>
                <span>
                  {new Date(selectedEvent.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} -
                  {new Date(selectedEvent.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-location-dot mr-3 text-eeadb-blue"></i>
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
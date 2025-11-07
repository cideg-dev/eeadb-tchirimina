// lib/i18n.js
// Configuration de base pour l'internationalisation

export const locales = ['fr', 'en']; // Ajoutez d'autres langues si nécessaire
export const defaultLocale = 'fr';

export const translations = {
  fr: {
    // Accueil
    'home.title': 'EEADB-Tchirimina - Accueil',
    'home.welcome': 'Bienvenue à l\'EEADB-Tchirimina',
    'home.description': 'Nous sommes heureux de vous accueillir dans notre communauté chrétienne.',
    'home.services.title': 'Horaires des Cultes',
    'home.services.sunday': 'Culte du Dimanche',
    'home.services.sunday.time': '09h00 - 12h00',
    'home.services.wednesday': 'Réunion de Prière',
    'home.services.wednesday.time': 'Mercredi 18h30 - 20h00',
    'home.services.sunday.school': 'École du Dimanche',
    'home.services.sunday.school.time': 'Dimanche 08h30 - 09h30',
    'home.services.house.groups': 'Groupes de Maison',
    'home.services.house.groups.time': 'Vendredi 19h00',
    'home.upcoming.events': 'Prochains Événements',
    'home.gallery': 'Galerie Photo',
    'home.testimonials': 'Témoignages',
    'home.values': 'Nos valeurs',
    'home.verse': 'Verset du jour',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.presentation': 'Présentation',
    'nav.activities': 'Activités',
    'nav.gallery': 'Galerie',
    'nav.resources': 'Ressources',
    'nav.contact': 'Contact',
    'nav.private': 'Zone privée',
    
    // Autres
    'see.more': 'Voir tout',
    'loading': 'Chargement...',
    'no.events': 'Aucun événement prévu',
    'faith': 'Foi',
    'love': 'Amour',
    'hope': 'Espérance',
    'fellowship': 'Communion',
  },
  en: {
    // Accueil
    'home.title': 'EEADB-Tchirimina - Home',
    'home.welcome': 'Welcome to EEADB-Tchirimina',
    'home.description': 'We are happy to welcome you to our Christian community.',
    'home.services.title': 'Service Times',
    'home.services.sunday': 'Sunday Service',
    'home.services.sunday.time': '9:00 AM - 12:00 PM',
    'home.services.wednesday': 'Prayer Meeting',
    'home.services.wednesday.time': 'Wednesday 6:30 PM - 8:00 PM',
    'home.services.sunday.school': 'Sunday School',
    'home.services.sunday.school.time': 'Sunday 8:30 AM - 9:30 AM',
    'home.services.house.groups': 'House Groups',
    'home.services.house.groups.time': 'Friday 7:00 PM',
    'home.upcoming.events': 'Upcoming Events',
    'home.gallery': 'Photo Gallery',
    'home.testimonials': 'Testimonials',
    'home.values': 'Our Values',
    'home.verse': 'Verse of the Day',
    
    // Navigation
    'nav.home': 'Home',
    'nav.presentation': 'About',
    'nav.activities': 'Activities',
    'nav.gallery': 'Gallery',
    'nav.resources': 'Resources',
    'nav.contact': 'Contact',
    'nav.private': 'Private Area',
    
    // Autres
    'see.more': 'See All',
    'loading': 'Loading...',
    'no.events': 'No events scheduled',
    'faith': 'Faith',
    'love': 'Love',
    'hope': 'Hope',
    'fellowship': 'Fellowship',
  }
};

// Fonction pour récupérer une traduction
export const t = (key, locale = defaultLocale) => {
  const translation = translations[locale]?.[key] || translations[defaultLocale][key] || key;
  return translation;
};

// Hook pour utiliser les traductions
export const useTranslation = (locale = defaultLocale) => {
  return {
    t: (key) => t(key, locale),
    locale,
    locales,
    defaultLocale
  };
};
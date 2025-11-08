// Service pour charger les données depuis le répertoire data/
// En production, ces données pourraient provenir d'une API

// Charger les données des fichiers JSON
const loadData = async (filename) => {
  if (typeof window !== 'undefined') {
    // Environnement client - charger depuis une API simulée
    // Pour une implémentation réelle, remplacer par un appel API
    try {
      const response = await fetch(`/api/${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors du chargement de ${filename}:`, error);
      
      // Données fallback pour la démonstration
      if (filename === 'verset_du_jour.json') {
        return {
          date: new Date().toISOString().split('T')[0],
          verset: "Apportez toutes les dîmes à la maison du trésor...",
          reference: "Malachie 3:10",
          source: "Bible Segond 21"
        };
      } else if (filename === 'events.json') {
        return [
          {
            id: "fallback-1",
            title: "Événement de démonstration",
            start: new Date().toISOString(),
            end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            description: "Ceci est un événement de démonstration",
            location: "Temple BERACA"
          }
        ];
      }
      return [];
    }
  } else {
    // Environnement serveur - charger les données statiques
    // Pour l'instant, on retourne des données de démonstration
    // En production, on chargerait les fichiers réels
    if (filename === 'verset_du_jour.json') {
      return {
        date: new Date().toISOString().split('T')[0],
        verset: "Apportez toutes les dîmes à la maison du trésor...",
        reference: "Malachie 3:10",
        source: "Bible Segond 21"
      };
    } else if (filename === 'events.json') {
      return [
        {
          id: "fallback-1",
          title: "Événement de démonstration",
          start: new Date().toISOString(),
          end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          description: "Ceci est un événement de démonstration",
          location: "Temple BERACA"
        }
      ];
    }
    return [];
  }
};

export const getVersetDuJour = async () => {
  try {
    const data = await loadData('verset_du_jour.json');
    return {
      text: data.verset || data.text,
      reference: data.reference,
      source: data.source
    };
  } catch (error) {
    console.error('Erreur lors du chargement du verset du jour:', error);
    return {
      text: "Apportez toutes les dîmes à la maison du trésor...",
      reference: "Malachie 3:10",
      source: "Bible Segond 21"
    };
  }
};

export const getEvents = async () => {
  try {
    const data = await loadData('events.json');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erreur lors du chargement des événements:', error);
    return [];
  }
};

// Fonction pour charger les images de la galerie
export const getPhotos = async () => {
  // Utilisation d'images SVG locales au lieu de placehold.co
  return [
    {
      id: 1,
      src: "/images/placeholder-culte.svg",
      alt: "Culte dominical",
      title: "Culte du dimanche matin",
      description: "Notre culte hebdomadaire du dimanche"
    },
    {
      id: 2,
      src: "/images/placeholder-priere.svg",
      alt: "Groupe de prière",
      title: "Groupe de prière",
      description: "Groupe de prière intercession"
    },
    {
      id: 3,
      src: "/images/placeholder-ecole.svg",
      alt: "École dominicale",
      title: "École dominicale",
      description: "École biblique pour enfants"
    }
  ];
};

export const getResources = async () => {
  // Pour l'instant, des ressources de démonstration
  return [
    {
      id: 1,
      title: "Guide de prière",
      description: "Guide complet sur la prière dans la vie chrétienne",
      type: "document",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      title: "Étude sur la sanctification",
      description: "Étude approfondie sur la sanctification progressive",
      type: "document",
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      title: "Cantiques et louanges",
      description: "Collection de cantiques et chants d'adoration",
      type: "audio",
      date: new Date().toISOString().split('T')[0]
    }
  ];
};
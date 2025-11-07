// API pour récupérer les événements
export const getEvents = async () => {
  try {
    // Dans une implémentation réelle, on récupérerait les données depuis une API ou un service
    // Pour cette démonstration, nous simulons les données
    const response = await fetch('/data/events.json');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    // Retourne des données simulées en cas d'erreur
    return [
      {
        id: 'e-2025-12-24-1',
        title: 'Culte de Noël',
        start: '2025-12-24T18:00:00',
        end: '2025-12-24T20:00:00',
        description: 'Culte de célébration de Noël au temple BERACA',
        location: 'Temple BERACA',
        category: 'Culte'
      }
    ];
  }
};

// API pour récupérer les photos de la galerie
export const getGalleryPhotos = async () => {
  try {
    // Dans une implémentation réelle, on récupérerait les données depuis une API ou un service
    // Pour cette démonstration, nous simulons les données
    const response = await fetch('/data/gallery.json');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error);
    // Retourne des données simulées en cas d'erreur
    return [
      { id: 1, src: '/assets/gallery/2025/concert-de-noel/image1.jpg', title: 'Culte de Noël', date: '24 déc. 2025', location: 'Temple BERACA', category: 'Culte' },
      { id: 2, src: '/assets/gallery/2025/concert-de-noel/image2.jpg', title: 'Chœur de Noël', date: '24 déc. 2025', location: 'Temple BERACA', category: 'Culte' },
      { id: 3, src: '/assets/gallery/2025/concert-de-noel/image3.jpg', title: 'École du Dimanche', date: '24 déc. 2025', location: 'Temple BERACA', category: 'École' },
      { id: 4, src: '/assets/gallery/2025/concert-de-noel/image4.jpg', title: 'Groupe de prière', date: '24 déc. 2025', location: 'Temple BERACA', category: 'Prière' },
      { id: 5, src: '/assets/gallery/2025/concert-de-noel/image5.jpg', title: 'Jeunesse en action', date: '24 déc. 2025', location: 'Temple BERACA', category: 'Jeunesse' },
    ];
  }
};

// API pour récupérer le verset du jour
export const getVersetDuJour = async () => {
  try {
    const response = await fetch('/data/verset_du_jour.json');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération du verset du jour:', error);
    // Retourne des données simulées en cas d'erreur
    return {
      verset: "Apportez toutes les dîmes à la maison du trésor...",
      reference: "Malachie 3:10",
      source: "Bible Segond 21"
    };
  }
};

// API pour récupérer les ressources
export const getResources = async () => {
  try {
    const response = await fetch('/data/ressources.json');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources:', error);
    // Retourne des données simulées en cas d'erreur
    return [
      { id: 1, title: 'Message du dimanche', type: 'audio', category: 'sermon', date: '2025-10-13', url: '#' },
      { id: 2, title: 'Étude sur la foi', type: 'pdf', category: 'étude biblique', date: '2025-10-10', url: '#' },
    ];
  }
};
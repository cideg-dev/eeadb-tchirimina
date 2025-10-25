document.addEventListener('DOMContentLoaded', async function() {
  const root = document.getElementById('activites-root');
  if (!root) return;

  // Fonction pour récupérer les données avec timeout
  async function fetchJSON(paths) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    for (const p of paths) {
      try {
        const response = await fetch(p, { 
          cache: 'no-cache',
          signal: controller.signal 
        });
        if (response.ok) {
          clearTimeout(timeoutId);
          return await response.json();
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn('Timeout lors du chargement des données');
          break;
        }
      }
    }
    clearTimeout(timeoutId);
    return null;
  }

  // Afficher l'indicateur de chargement
  root.innerHTML = `
    <div class="loading-indicator">
      <div class="loading-spinner"></div>
      <p>Chargement des activités...</p>
    </div>
  `;

  try {
    const activites = await fetchJSON(['data/activites.json', '../data/activites.json']);
    
    if (!Array.isArray(activites) || activites.length === 0) {
      root.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-plus"></i>
          <h3>Aucune activité programmée</h3>
          <p>Revenez plus tard pour découvrir nos prochaines activités.</p>
          <a href="admin.html" class="admin-link">Gérer les activités</a>
        </div>
      `;
      return;
    }

    // Grouper les activités par jour
    const activitesParJour = {};
    const ordreJours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    
    activites.forEach(activite => {
      if (!activitesParJour[activite.jour]) {
        activitesParJour[activite.jour] = [];
      }
      activitesParJour[activite.jour].push(activite);
    });

    // Générer le contenu
    let html = `
      <div class="activites-container">
        <div class="activites-header">
          <h1><i class="fas fa-calendar-alt"></i> Activités & Horaires</h1>
          <p class="subtitle">Découvrez notre programme hebdomadaire</p>
        </div>
        <div class="jours-container">
    `;

    // Afficher les jours dans l'ordre
    ordreJours.forEach(jour => {
      if (activitesParJour[jour]) {
        html += `
          <div class="jour-section">
            <h2 class="jour-titre">
              <i class="fas fa-${getJourIcone(jour)}"></i>
              ${jour}
            </h2>
            <div class="activites-grid">
        `;

        activitesParJour[jour].forEach(activite => {
          html += `
            <div class="activite-card">
              <div class="activite-icon">
                <i class="fas fa-${getActiviteIcone(activite.titre)}"></i>
              </div>
              <div class="activite-content">
                <h3 class="activite-titre">${activite.titre}</h3>
                <div class="activite-horaire">
                  <i class="fas fa-clock"></i>
                  <span>${activite.heure}</span>
                </div>
                ${activite.lieu ? `
                <div class="activite-lieu">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${activite.lieu}</span>
                </div>` : ''}
              </div>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      }
    });

    html += `
        </div>
      </div>
    `;

    root.innerHTML = html;

  } catch (error) {
    console.error('Erreur lors du chargement des activités:', error);
    root.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Erreur de chargement</h3>
        <p>Impossible de charger les activités. Veuillez réessayer.</p>
      </div>
    `;
  }
});

// Fonctions utilitaires pour les icônes
function getJourIcone(jour) {
  const icones = {
    'Lundi': 'moon',
    'Mardi': 'star',
    'Mercredi': 'sun',
    'Jeudi': 'cloud',
    'Vendredi': 'heart',
    'Samedi': 'tree',
    'Dimanche': 'church'
  };
  return icones[jour] || 'calendar-day';
}

function getActiviteIcone(titre) {
  const titreLower = titre.toLowerCase();
  if (titreLower.includes('culte')) return 'church';
  if (titreLower.includes('étude') || titreLower.includes('biblique')) return 'book-bible';
  if (titreLower.includes('prière')) return 'hands-praying';
  if (titreLower.includes('chorale') || titreLower.includes('chant')) return 'music';
  if (titreLower.includes('jeunesse')) return 'users';
  if (titreLower.includes('femmes')) return 'person-dress';
  if (titreLower.includes('hommes')) return 'person';
  if (titreLower.includes('école')) return 'graduation-cap';
  return 'calendar-day';
}

// Précharger Font Awesome pour de meilleures performances
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
  link.as = 'style';
  link.onload = () => link.rel = 'stylesheet';
  document.head.appendChild(link);
}
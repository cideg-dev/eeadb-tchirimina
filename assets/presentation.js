// Optimisation: Préchargement des polaces et icônes
if ('fonts' in document) {
  document.fonts.load('1rem "Font Awesome 6 Free"');
}

// Gestion optimisée du chargement
document.addEventListener('DOMContentLoaded', async function(){
  const root = document.getElementById('presentation-root');
  if(!root) return;

  // Afficher un indicateur de chargement
  root.innerHTML = `
    <div class="container">
      <div class="loading-state" style="text-align: center; padding: 3rem;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: #3b82f6;"></i>
        <p style="margin-top: 1rem; color: #6b7280;">Chargement de la présentation...</p>
      </div>
    </div>
  `;

  async function fetchJSON(paths){
    for(const p of paths){
      try{ 
        const r = await fetch(p,{cache:'no-cache'}); 
        if(r.ok) return await r.json(); 
      }catch(_){}
    }
    return null;
  }

  // Chargement avec timeout pour éviter les blocages
  const loadData = async () => {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    );
    
    try {
      return await Promise.race([
        fetchJSON(['data/presentation.json','../data/presentation.json']),
        timeoutPromise
      ]);
    } catch (error) {
      console.warn('Chargement des données échoué:', error);
      return null;
    }
  };

  const data = await loadData();
  if(!data){
    root.innerHTML = `
      <div class="container">
        <div class="empty-state">
          <i class="fa-solid fa-file-lines" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
          <h2>Contenu non disponible</h2>
          <p>Utilisez la page Admin pour renseigner les informations de présentation</p>
          <a href="admin.html" class="btn btn-primary">
            <i class="fa-solid fa-gear"></i>
            Accéder à l'admin
          </a>
        </div>
      </div>
    `;
    return;
  }

  // Création de la structure principale
  const container = document.createElement('div');
  container.className = 'container';

  // Header avec titre principal
  const headerSection = document.createElement('section');
  headerSection.className = 'presentation-header';
  headerSection.innerHTML = `
    <div class="header-content">
      <h1 class="main-title">Présentation de l'Église</h1>
      <p class="main-subtitle">Découvrez notre mission, nos valeurs et notre histoire</p>
    </div>
  `;
  container.appendChild(headerSection);

  // Section Mission
  if(data.mission){
    const missionSection = document.createElement('section');
    missionSection.className = 'presentation-card mission-card';
    missionSection.innerHTML = `
      <div class="card-icon">
        <i class="fa-solid fa-bullseye"></i>
      </div>
      <div class="card-content">
        <h2>Notre Mission</h2>
        <p>${data.mission}</p>
        <div class="mission-image">
          <img src="assets/eglise-community.jpg" alt="Communauté de l'église" loading="lazy" 
               width="400" height="300" decoding="async"
               onerror="this.style.display='none'"
               onload="this.style.opacity='1'">
        </div>
      </div>
    `;
    container.appendChild(missionSection);
  }

  // Section Valeurs
  if(Array.isArray(data.valeurs) && data.valeurs.length){
    const valuesSection = document.createElement('section');
    valuesSection.className = 'presentation-card values-card';
    valuesSection.innerHTML = `
      <div class="card-icon">
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="card-content">
        <h2>Nos Valeurs</h2>
        <div class="values-grid">
          ${data.valeurs.map(value => `
            <div class="value-item">
              <i class="fa-solid fa-check"></i>
              <span>${value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(valuesSection);
  }

  // Section Histoire
  if(Array.isArray(data.histoire) && data.histoire.length){
    const historySection = document.createElement('section');
    historySection.className = 'presentation-card history-card';
    historySection.innerHTML = `
      <div class="card-icon">
        <i class="fa-solid fa-landmark"></i>
      </div>
      <div class="card-content">
        <h2>Notre Histoire</h2>
        ${data.histoire.map(paragraph => `<p>${paragraph}</p>`).join('')}
      </div>
    `;
    container.appendChild(historySection);
  }

  // Section Ministères
  if(Array.isArray(data.ministeres) && data.ministeres.length){
    const ministriesSection = document.createElement('section');
    ministriesSection.className = 'presentation-card ministries-card';
    ministriesSection.innerHTML = `
      <div class="card-icon">
        <i class="fa-solid fa-people-group"></i>
      </div>
      <div class="card-content">
        <h2>Nos Ministères</h2>
        <div class="ministries-grid">
          ${data.ministeres.map(ministry => `
            <div class="ministry-item">
              <div class="ministry-header">
                <h3>${ministry.nom}</h3>
                ${ministry.responsable && ministry.responsable !== 'À préciser' ? 
                  `<span class="ministry-responsable">Responsable: ${ministry.responsable}</span>` : ''}
              </div>
              <p class="ministry-description">${ministry.description || ''}</p>
              <div class="ministry-image">
                <img src="assets/ministère-${ministry.nom.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg" 
                     alt="Ministère ${ministry.nom}" loading="lazy" 
                     width="300" height="200" decoding="async"
                     onerror="this.style.display='none'"
                     onload="this.style.opacity='1'">
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(ministriesSection);
  }

  root.appendChild(container);
});
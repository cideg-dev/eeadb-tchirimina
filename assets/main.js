// Fonction pour charger les composants HTML réutilisables
async function loadComponent(url, elementId) {
  const target = document.getElementById(elementId);
  if (!target) return;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    target.innerHTML = await response.text();
  } catch (error) {
    target.innerHTML = '<p>Error loading component.</p>';
    console.error('Failed to load component:', error);
  }
}

// Met en évidence le lien de navigation actif
function highlightActiveNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  // ou 'index.html' si la racine est servie
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = nav.getElementsByTagName('a');
  for (let link of links) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', async function(){
  // Charger les composants partagés
  await Promise.all([
    loadComponent('_header.html', 'main-header'),
    loadComponent('_nav.html', 'main-nav')
  ]);
  
  // Mettre en évidence le lien actif
  highlightActiveNav();

  // Helper: fetch JSON avec fallback de chemins (GitHub Pages vs local)
  async function fetchJSONWithFallback(paths, options={}){
    for(const p of paths){
      try{
        const resp = await fetch(p, options);
        if(resp.ok){
          return await resp.json();
        }
      }catch(_){ /* essayer le chemin suivant */ }

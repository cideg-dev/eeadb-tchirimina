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
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = nav.getElementsByTagName('a');
  for (let link of links) {
    const linkPage = link.getAttribute('href')?.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', async function(){
  // Charger les composants partagés (si présents)
  await Promise.allSettled([
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
    }
    throw new Error('All fetch attempts failed');
  }

  // Charger verset du jour (essayer chemins pour Pages et local)
  try{
    const vdata = await fetchJSONWithFallback(['data/verset_du_jour.json','/site/data/verset_du_jour.json']);
    document.getElementById('verset-text').textContent = vdata.verset || '—';
    document.getElementById('verset-ref').textContent = vdata.reference || '';
  }catch(e){
    document.getElementById('verset-text').textContent = 'Impossible de charger le verset.';
  }

  // Init FullCalendar
  try{
    const events = await fetchJSONWithFallback(['data/events.json','/site/data/events.json']);
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl,{
      initialView: 'dayGridMonth',
      height: 'auto',
      events: events,
      eventClick: function(info){
        alert(info.event.title + '\n' + (info.event.extendedProps.description || ''));
      }
    });
    calendar.render();
  }catch(e){
    document.getElementById('calendar').textContent = 'Impossible de charger le calendrier.';
  }

  // Contact form (front-end simulation)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const status = document.getElementById('contact-result');
      // Vérifier si une URL d'endpoint est renseignée
      const endpoint = document.getElementById('endpoint-url')?.value?.trim();
      if(endpoint){
        status.textContent = 'Envoi en cours...';
        try{
          const resp = await fetch(endpoint,{
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(data)
          });
          const json = await resp.json().catch(()=>null);
          if(resp.ok){
            status.textContent = 'Message envoyé (dispatch ok).';
          }else{
            status.textContent = 'Erreur lors de l\'envoi : ' + (json?.error || resp.statusText || resp.status);
          }
        }catch(err){
          status.textContent = 'Erreur réseau : ' + err.message;
        }
        console.log('Contact form submit', data, '->', endpoint);
      }else{
        status.textContent = 'Envoi simulé — voir docs pour connecter au workflow.';
        console.log('Contact form submit (simulé)', data);
      }
    });
  }
});

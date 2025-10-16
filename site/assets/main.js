document.addEventListener('DOMContentLoaded', async function(){
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
    throw new Error('Échec de chargement: ' + paths.join(', '));
  }

  // Charger verset du jour
  try{
    const vdata = await fetchJSONWithFallback([
      'data/verset_du_jour.json',       // si déployé dans /site/data/
      '../data/verset_du_jour.json'     // si servi depuis racine en local
    ], { cache: 'no-cache' });
    document.getElementById('verset-text').textContent = vdata.verset || vdata.text || '—';
    document.getElementById('verset-ref').textContent = vdata.reference || '';
  }catch(e){
    document.getElementById('verset-text').textContent = 'Impossible de charger le verset.';
    console.warn('Verset du jour non chargé:', e.message);
  }

  // Init FullCalendar
  try{
    const events = await fetchJSONWithFallback([
      'data/events.json',               // si déployé dans /site/data/
      '../data/events.json'             // si servi depuis racine en local
    ], { cache: 'no-cache' });
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl,{
      initialView: 'dayGridMonth',
      height: 'auto',
      events: events,
      eventClick: function(info){
        alert(info.event.title + '\n' + (info.event.extendedProps?.description || ''));
      }
    });
    calendar.render();
    // Commutateur de vue
    document.querySelectorAll('.view-switch button').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const v = btn.getAttribute('data-view');
        try{ calendar.changeView(v); }catch(_){ /* vue non supportée */ }
      });
    });
  }catch(e){
    document.getElementById('calendar').textContent = 'Impossible de charger le calendrier.';
    console.warn('Événements non chargés:', e.message);
  }

  // Contact form (front-end simulation)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', async (ev)=>{
      ev.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const status = document.getElementById('contact-result');
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
          status.textContent = resp.ok ? 'Message envoyé (dispatch ok).' : ('Erreur lors de l\'envoi : ' + (json?.error || resp.statusText || resp.status));
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

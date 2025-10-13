document.addEventListener('DOMContentLoaded', async function(){
  // Charger verset du jour
  try{
    const vresp = await fetch('../data/verset_du_jour.json');
    const vdata = await vresp.json();
    document.getElementById('verset-text').textContent = vdata.verset || '—';
    document.getElementById('verset-ref').textContent = vdata.reference || '';
  }catch(e){
    document.getElementById('verset-text').textContent = 'Impossible de charger le verset.';
  }

  // Init FullCalendar
  try{
    const eventsResp = await fetch('../data/events.json');
    const events = await eventsResp.json();
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
});

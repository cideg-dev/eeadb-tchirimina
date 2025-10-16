document.addEventListener('DOMContentLoaded', function(){
  const endpointInput = document.getElementById('admin-endpoint');
  const keyInput = document.getElementById('admin-key');
  const status = document.getElementById('admin-status');
  // Prefill from storage
  const savedEndpoint = sessionStorage.getItem('admin_endpoint') || localStorage.getItem('admin_endpoint');
  const savedKey = sessionStorage.getItem('admin_key') || localStorage.getItem('admin_key');
  if(savedEndpoint && endpointInput) endpointInput.value = savedEndpoint;
  if(savedKey && keyInput) keyInput.value = savedKey;
  // Persist on change (session)
  endpointInput?.addEventListener('input', ()=>{ sessionStorage.setItem('admin_endpoint', endpointInput.value.trim()); });
  keyInput?.addEventListener('input', ()=>{ sessionStorage.setItem('admin_key', keyInput.value.trim()); });

  async function sendUpdate(path, content, message){
    const endpoint = endpointInput?.value?.trim();
    const key = keyInput?.value?.trim();
    if(!endpoint){ status.textContent = 'Renseignez l’URL du endpoint admin.'; return; }
    status.textContent = 'Envoi en cours…';
    try{
      const resp = await fetch(endpoint,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(key ? { 'X-API-KEY': key } : {})
        },
        body: JSON.stringify({ updates: [{ path, content, message }] })
      });
      const json = await resp.json().catch(()=>null);
      status.textContent = resp.ok ? 'Mise à jour enregistrée.' : ('Erreur: ' + (json?.error || resp.statusText));
    }catch(e){ status.textContent = 'Erreur réseau: ' + e.message; }
  }

  document.querySelector('[data-action="update-presentation"]').addEventListener('click', async ()=>{
    const mission = document.getElementById('p-mission').value.trim();
    const valeursText = document.getElementById('p-valeurs').value.trim();
    const histoireText = document.getElementById('p-histoire').value.trim();
    const ministeresText = document.getElementById('p-ministeres').value.trim();
    // Merge avec existant
    let current = {};
    try{ current = await (await fetch('data/presentation.json')).json(); }catch(_){ current = {}; }
    const payload = { ...current };
    if(mission) payload.mission = mission;
    if(valeursText) payload.valeurs = valeursText.split('\n').filter(Boolean);
    if(histoireText) payload.histoire = histoireText.split('\n').filter(Boolean);
    if(ministeresText){ try{ payload.ministeres = JSON.parse(ministeresText); }catch(_){ /* ignore */ } }
    await sendUpdate('site/data/presentation.json', JSON.stringify(payload, null, 2), 'admin: update presentation');
  });

  document.querySelector('[data-action="update-activites"]').addEventListener('click', async ()=>{
    const txt = document.getElementById('a-json').value.trim();
    let arr = [];
    if(txt){ try{ arr = JSON.parse(txt); }catch(_){ status.textContent = 'JSON invalide (Activités).'; return; } }
    // Merge: si vide, garder existant
    let current = [];
    try{ current = await (await fetch('data/activites.json')).json(); }catch(_){ current = []; }
    const payload = arr.length ? arr : current;
    await sendUpdate('site/data/activites.json', JSON.stringify(payload, null, 2), 'admin: update activites');
  });

  document.querySelector('[data-action="update-galerie"]').addEventListener('click', async ()=>{
    const txt = document.getElementById('g-json').value.trim();
    let arr = [];
    if(txt){ try{ arr = JSON.parse(txt); }catch(_){ status.textContent = 'JSON invalide (Galerie).'; return; } }
    let current = [];
    try{ current = await (await fetch('data/gallery.json')).json(); }catch(_){ current = []; }
    const payload = arr.length ? arr : current;
    await sendUpdate('site/data/gallery.json', JSON.stringify(payload, null, 2), 'admin: update gallery');
  });

  document.querySelector('[data-action="update-ressources"]').addEventListener('click', async ()=>{
    const txt = document.getElementById('r-json').value.trim();
    let arr = [];
    if(txt){ try{ arr = JSON.parse(txt); }catch(_){ status.textContent = 'JSON invalide (Ressources).'; return; } }
    let current = [];
    try{ current = await (await fetch('data/ressources.json')).json(); }catch(_){ current = []; }
    const payload = arr.length ? arr : current;
    await sendUpdate('site/data/ressources.json', JSON.stringify(payload, null, 2), 'admin: update ressources');
  });

  document.querySelector('[data-action="update-events"]').addEventListener('click', async ()=>{
    const txt = document.getElementById('e-json').value.trim();
    let arr = [];
    if(txt){ try{ arr = JSON.parse(txt); }catch(_){ status.textContent = 'JSON invalide (Événements).'; return; } }
    let current = [];
    try{ current = await (await fetch('data/events.json')).json(); }catch(_){ current = []; }
    const payload = arr.length ? arr : current;
    await sendUpdate('site/data/events.json', JSON.stringify(payload, null, 2), 'admin: update events');
  });

  document.querySelector('[data-action="update-versets"]').addEventListener('click', async ()=>{
    const txt = document.getElementById('v-json').value.trim();
    let arr = [];
    if(txt){ try{ arr = JSON.parse(txt); }catch(_){ status.textContent = 'JSON invalide (Versets).'; return; } }
    let current = [];
    try{ current = await (await fetch('data/versets.json')).json(); }catch(_){ current = []; }
    const payload = arr.length ? arr : current;
    await sendUpdate('site/data/versets.json', JSON.stringify(payload, null, 2), 'admin: update versets');
  });
});
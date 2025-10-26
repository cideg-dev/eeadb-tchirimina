document.addEventListener('DOMContentLoaded', async function(){
  // Références DOM
  const list = document.getElementById('resources');
  const searchInput = document.getElementById('resource-search');
  const typeSelect = document.getElementById('resource-type');
  const yearSelect = document.getElementById('resource-year');
  if(!list) return;

  // Petite fonction utilitaire pour fetch avec repli
  async function fetchJSONWithFallback(paths){
    for(const p of paths){
      try{
        const res = await fetch(p, { cache: 'no-cache' });
        if(res.ok) return await res.json();
      }catch(_){ /* ignore */ }
    }
    throw new Error('Aucune source disponible: '+paths.join(', '));
  }

  let allItems = [];
  let filtered = [];

  // Rendu d'un élément
  function renderItem(r){
    const li = document.createElement('li');
    li.className = 'resource-item';

    const icon = document.createElement('i');
    icon.className = r.type === 'audio' ?
      'fa-solid fa-headphones' :
      (r.type === 'pdf' ? 'fa-solid fa-file-pdf' : 'fa-solid fa-file');

    const link = document.createElement('a');
    link.href = r.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'title';
    link.textContent = r.title;

    // Compteur de clics local (non persistant)
    link.addEventListener('click', ()=>{
      if(r.count === undefined) r.count = 0;
      r.count++;
      updateCounter();
    });

    const meta = document.createElement('span');
    meta.className = 'meta';
    const parts = [];
    if(r.date) parts.push(r.date);
    if(r.speaker) parts.push(r.speaker);
    meta.textContent = parts.join(' — ');

    li.appendChild(icon);
    li.appendChild(link);
    li.appendChild(meta);
    return li;
  }

  function updateCounter(){
    const counter = document.getElementById('resources-count');
    if(counter){
      const total = filtered.length;
      counter.textContent = `${total} ressource${total>1?'s':''}`;
    }
  }

  function applyFilters(){
    const q = (searchInput?.value || '').toLowerCase();
    const t = typeSelect?.value || '';
    const y = yearSelect?.value || '';

    filtered = allItems.filter(it=>{
      const matchQuery = !q || it.title.toLowerCase().includes(q) || (it.speaker||'').toLowerCase().includes(q);
      const matchType = !t || it.type===t;
      const matchYear = !y || (it.date && it.date.startsWith(y));
      return matchQuery && matchType && matchYear;
    });

    // vider et rerendre
    list.textContent = '';
    if(filtered.length===0){
      list.textContent = 'Aucune ressource ne correspond à la recherche.';
    }else{
      for(const item of filtered){
        list.appendChild(renderItem(item));
      }
    }
    updateCounter();
  }

  try{
    allItems = await fetchJSONWithFallback([
      'data/ressources.json',
      '../data/ressources.json'
    ]);
  }catch(e){
    list.textContent = 'Impossible de charger les ressources.';
    console.warn(e);
    return;
  }

  if(!Array.isArray(allItems) || allItems.length===0){
    list.textContent = 'Aucune ressource pour le moment.';
    return;
  }

  // Options année dynamiques
  if(yearSelect){
    const years = Array.from(new Set(allItems.map(i=> i.date ? i.date.substring(0,4): null).filter(Boolean))).sort((a,b)=> b-a);
    for(const y of years){
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    }
  }

  // Ajout d'un compteur
  const counterSpan = document.createElement('span');
  counterSpan.id = 'resources-count';
  counterSpan.className = 'resources-count';
  list.parentElement.insertBefore(counterSpan, list);

  // Écouteurs filtres
  searchInput?.addEventListener('input', applyFilters);
  typeSelect?.addEventListener('change', applyFilters);
  yearSelect?.addEventListener('change', applyFilters);

  applyFilters();
});
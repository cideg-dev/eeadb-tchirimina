document.addEventListener('DOMContentLoaded', async function(){
  const list = document.getElementById('resources');
  if(!list) return;

  async function fetchJSONWithFallback(paths){
    for(const p of paths){
      try{
        const r = await fetch(p, { cache: 'no-cache' });
        if(r.ok) return await r.json();
      }catch(_){}
    }
    throw new Error('Aucune source disponible: ' + paths.join(', '));
  }

  try{
    const items = await fetchJSONWithFallback([
      'data/ressources.json',
      '../data/ressources.json'
    ]);
    if(!Array.isArray(items) || items.length === 0){
      list.textContent = 'Aucune ressource pour le moment.';
      return;
    }
    list.textContent = '';
    for(const r of items){
      const li = document.createElement('li');
      li.className = 'resource-item';
      const icon = document.createElement('i');
      icon.className = r.type === 'audio' ? 'fa-solid fa-headphones' : (r.type === 'pdf' ? 'fa-solid fa-file-pdf' : 'fa-solid fa-file');
      const link = document.createElement('a');
      link.href = r.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'title';
      link.textContent = r.title;
      const meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = (r.date || '') + (r.speaker ? ' — ' + r.speaker : '');
      li.appendChild(icon);
      li.appendChild(link);
      li.appendChild(meta);
      list.appendChild(li);
    }
  }catch(e){
    list.textContent = 'Impossible de charger les ressources.';
    console.warn(e);
  }
});
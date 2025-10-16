document.addEventListener('DOMContentLoaded', async function(){
  const container = document.getElementById('gallery');
  if(!container) return;

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
    const data = await fetchJSONWithFallback([
      'data/gallery.json',
      '../data/gallery.json'
    ]);
    if(!Array.isArray(data) || data.length === 0){
      container.textContent = 'Aucune image pour le moment. Ajoutez vos événements dans data/gallery.json et vos images dans assets/gallery/...';
      return;
    }
    container.textContent = '';
    for(const item of data){
      const card = document.createElement('article');
      card.className = 'gallery-card';
      const img = document.createElement('img');
      img.src = item.thumb || item.src || '';
      img.alt = item.title || 'Image';
      const meta = document.createElement('div');
      meta.className = 'meta';
      const title = document.createElement('div');
      title.textContent = item.title || 'Sans titre';
      const desc = document.createElement('div');
      desc.textContent = item.description || '';
      meta.appendChild(title);
      meta.appendChild(desc);
      card.appendChild(img);
      card.appendChild(meta);
      container.appendChild(card);
    }
  }catch(e){
    container.textContent = 'Impossible de charger la galerie.';
    console.warn(e);
  }
});
document.addEventListener('DOMContentLoaded', async function(){
  const root = document.getElementById('activites-root');
  if(!root) return;

  async function fetchJSON(paths){
    for(const p of paths){
      try{ const r = await fetch(p,{cache:'no-cache'}); if(r.ok) return await r.json(); }catch(_){}
    }
    return null;
  }

  const items = await fetchJSON(['data/activites.json','../data/activites.json']);
  const section = document.createElement('section');
  const h2 = document.createElement('h2'); h2.textContent = 'Activités hebdomadaires'; section.appendChild(h2);
  const ul = document.createElement('ul'); ul.className = 'resource-list';
  if(Array.isArray(items) && items.length){
    for(const it of items){
      const li = document.createElement('li'); li.className = 'resource-item';
      const icon = document.createElement('i'); icon.className = 'fa-solid fa-calendar-day';
      const title = document.createElement('span'); title.className = 'title'; title.textContent = it.titre || 'Activité';
      const meta = document.createElement('span'); meta.className = 'meta'; meta.textContent = [it.jour, it.heure].filter(Boolean).join(' — ');
      li.appendChild(icon); li.appendChild(title); li.appendChild(meta); ul.appendChild(li);
    }
  }else{
    const p = document.createElement('p'); p.className = 'tag'; p.textContent = 'Aucune activité enregistrée.'; section.appendChild(p);
  }
  section.appendChild(ul);
  root.innerHTML = ''; root.appendChild(section);
});
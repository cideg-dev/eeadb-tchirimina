document.addEventListener('DOMContentLoaded', async function(){
  const root = document.getElementById('presentation-root');
  if(!root) return;

  async function fetchJSON(paths){
    for(const p of paths){
      try{ const r = await fetch(p,{cache:'no-cache'}); if(r.ok) return await r.json(); }catch(_){}
    }
    return null;
  }

  const data = await fetchJSON(['data/presentation.json','../data/presentation.json']);
  if(!data){
    root.innerHTML = '<p class="tag">Contenu non disponible. Utilisez la page Admin pour le renseigner.</p>';
    return;
  }

  const section = document.createElement('section');
  const h2 = document.createElement('h2'); h2.textContent = 'Présentation de l’église';
  section.appendChild(h2);

  if(data.mission){
    const h3 = document.createElement('h3'); h3.textContent = 'Mission';
    const p = document.createElement('p'); p.textContent = data.mission;
    section.appendChild(h3); section.appendChild(p);
  }

  if(Array.isArray(data.valeurs) && data.valeurs.length){
    const h3 = document.createElement('h3'); h3.textContent = 'Valeurs';
    const ul = document.createElement('ul');
    for(const v of data.valeurs){ const li = document.createElement('li'); li.textContent = v; ul.appendChild(li); }
    section.appendChild(h3); section.appendChild(ul);
  }

  if(Array.isArray(data.histoire) && data.histoire.length){
    const h3 = document.createElement('h3'); h3.textContent = 'Histoire';
    for(const par of data.histoire){ const p = document.createElement('p'); p.textContent = par; section.appendChild(p); }
  }

  if(Array.isArray(data.ministeres) && data.ministeres.length){
    const h3 = document.createElement('h3'); h3.textContent = 'Ministères';
    const ul = document.createElement('ul'); ul.className = 'resource-list';
    for(const m of data.ministeres){
      const li = document.createElement('li'); li.className = 'resource-item';
      const icon = document.createElement('i'); icon.className = 'fa-solid fa-people-group';
      const title = document.createElement('span'); title.className = 'title'; title.textContent = m.nom + (m.responsable ? ' — ' + m.responsable : '');
      const meta = document.createElement('span'); meta.className = 'meta'; meta.textContent = m.description || '';
      li.appendChild(icon); li.appendChild(title); li.appendChild(meta); ul.appendChild(li);
    }
    section.appendChild(h3); section.appendChild(ul);
  }

  root.appendChild(section);
});
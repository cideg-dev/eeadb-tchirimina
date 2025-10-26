// assets/gallery.js
// Gestion avancée de la galerie : filtres, lazy-loading et lightbox
// Auteur : EEADB-Tchirimina
// Toutes les chaînes visibles sont en français (voir instructions personnalisées)

/**
 * Structure attendue dans data/gallery.json :
 * [
 *   {
 *     "title": "Titre",
 *     "date": "2024-05-01",
 *     "category": "Culte",
 *     "description": "Texte optionnel",
 *     "thumb": "assets/gallery/2024/culte/thumb_img.jpg",
 *     "src": "assets/gallery/2024/culte/img.jpg"
 *   }
 * ]
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('gallery');
  if (!container) return;

  // Création de la barre de filtres
  const filterBar = document.createElement('div');
  filterBar.className = 'filter-bar';
  filterBar.innerHTML = `
    <label>Année
      <select id="filter-year">
        <option value="">Toutes</option>
      </select>
    </label>
    <label>Catégorie
      <select id="filter-cat">
        <option value="">Toutes</option>
      </select>
    </label>`;
  container.before(filterBar);

  const yearSelect = filterBar.querySelector('#filter-year');
  const catSelect = filterBar.querySelector('#filter-cat');

  // Chargement JSON (avec fallback)
  const fetchJSONWithFallback = async (paths) => {
    for (const p of paths) {
      try {
        const r = await fetch(p, { cache: 'no-cache' });
        if (r.ok) return await r.json();
      } catch (_) {
        /* ignore */
      }
    }
    throw new Error('Aucune source disponible');
  };

  let allItems = [];
  let filtered = [];
  let observer;

  const applyFilters = () => {
    const year = yearSelect.value;
    const cat = catSelect.value;
    filtered = allItems.filter(it => {
      const okYear = year ? (new Date(it.date).getFullYear().toString() === year) : true;
      const okCat = cat ? (it.category === cat) : true;
      return okYear && okCat;
    });
    renderGallery();
  };

  const renderGallery = () => {
    container.innerHTML = '';
    if (observer) observer.disconnect();

    if (filtered.length === 0) {
      container.textContent = 'Aucun résultat pour ce filtre.';
      return;
    }

    filtered.forEach((item, idx) => {
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.dataset.index = idx;

      const img = document.createElement('img');
      img.dataset.src = item.thumb || item.src;
      img.alt = item.title || 'Image';
      img.loading = 'lazy'; // HTML natif + IO pour l’effet

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `<div>${item.title || 'Sans titre'}</div><div>${item.description || ''}</div>`;

      card.appendChild(img);
      card.appendChild(meta);
      container.appendChild(card);

      card.addEventListener('click', () => openLightbox(idx));
    });

    initLazyLoading();
  };

  const initLazyLoading = () => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    container.querySelectorAll('img').forEach(img => observer.observe(img));
  };

  /* Lightbox */
  let lightboxEl;
  const buildLightbox = () => {
    lightboxEl = document.createElement('div');
    lightboxEl.id = 'lightbox';
    lightboxEl.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="close-btn" aria-label="Fermer">&times;</button>
        <img id="lightbox-img" src="" alt="image" />
        <div class="lightbox-caption"></div>
        <button class="nav prev" aria-label="Précédent"><i class="fa fa-chevron-left"></i></button>
        <button class="nav next" aria-label="Suivant"><i class="fa fa-chevron-right"></i></button>
      </div>`;
    document.body.appendChild(lightboxEl);

    lightboxEl.querySelector('.close-btn').onclick = closeLightbox;
    lightboxEl.querySelector('.lightbox-backdrop').onclick = closeLightbox;
    lightboxEl.querySelector('.prev').onclick = () => navigateLightbox(-1);
    lightboxEl.querySelector('.next').onclick = () => navigateLightbox(1);
    document.addEventListener('keydown', (e) => {
      if (lightboxEl.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
      }
    });
  };

  let currentIndex = 0;
  const openLightbox = (index) => {
    if (!lightboxEl) buildLightbox();
    currentIndex = index;
    const item = filtered[index];
    const img = lightboxEl.querySelector('#lightbox-img');
    img.src = item.src;
    img.alt = item.title || 'Image';
    lightboxEl.querySelector('.lightbox-caption').textContent = item.title || '';
    lightboxEl.classList.add('open');
  };

  const closeLightbox = () => {
    lightboxEl?.classList.remove('open');
  };

  const navigateLightbox = (dir) => {
    if (!filtered.length) return;
    currentIndex = (currentIndex + dir + filtered.length) % filtered.length;
    openLightbox(currentIndex);
  };

  /* Chargement des données et initialisation */
  (async () => {
    try {
      const data = await fetchJSONWithFallback([
        'data/gallery.json',
        '../data/gallery.json'
      ]);
      allItems = Array.isArray(data) ? data : [];

      // Extraction des années et catégories uniques
      const years = new Set();
      const cats = new Set();
      allItems.forEach(it => {
        if (it.date) years.add(new Date(it.date).getFullYear().toString());
        if (it.category) cats.add(it.category);
      });

      [...years].sort((a,b)=>b-a).forEach(y => {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y; yearSelect.appendChild(opt);
      });
      [...cats].sort().forEach(c => {
        const opt = document.createElement('option');
        opt.value = c; opt.textContent = c; catSelect.appendChild(opt);
      });

      yearSelect.onchange = catSelect.onchange = applyFilters;

      filtered = allItems; // initial
      renderGallery();
    } catch (e) {
      container.textContent = 'Impossible de charger la galerie.';
      console.error(e);
    }
  })();
});
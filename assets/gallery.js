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

  // Création de la barre de filtres avancés
  const filterBar = document.createElement('div');
  filterBar.className = 'filter-bar';
  filterBar.innerHTML = `
    <div class="search-container">
      <input type="search" id="search-input" placeholder="Rechercher par titre ou description..." />
      <button id="clear-search" class="clear-btn" title="Effacer la recherche">×</button>
    </div>
    <label>Tri
      <select id="sort-by">
        <option value="date-desc">Date (récent → ancien)</option>
        <option value="date-asc">Date (ancien → récent)</option>
        <option value="title-asc">Titre (A → Z)</option>
        <option value="title-desc">Titre (Z → A)</option>
      </select>
    </label>
    <label>Année
      <select id="filter-year">
        <option value="">Toutes</option>
      </select>
    </label>
    <label>Catégorie
      <select id="filter-cat">
        <option value="">Toutes</option>
      </select>
    </label>
    <div class="filter-actions">
      <button id="reset-filters" class="button secondary">Réinitialiser</button>
    </div>`;
  container.before(filterBar);

  const searchInput = filterBar.querySelector('#search-input');
  const clearSearch = filterBar.querySelector('#clear-search');
  const sortSelect = filterBar.querySelector('#sort-by');
  const yearSelect = filterBar.querySelector('#filter-year');
  const catSelect = filterBar.querySelector('#filter-cat');
  const resetButton = filterBar.querySelector('#reset-filters');

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
    const searchTerm = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;
    
    // Filtrage
    filtered = allItems.filter(it => {
      const okYear = year ? (new Date(it.date).getFullYear().toString() === year) : true;
      const okCat = cat ? (it.category === cat) : true;
      const okSearch = searchTerm ? (
        (it.title && it.title.toLowerCase().includes(searchTerm)) ||
        (it.description && it.description.toLowerCase().includes(searchTerm))
      ) : true;
      return okYear && okCat && okSearch;
    });
    
    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        default:
          return 0;
      }
    });
    
    renderGallery();
    updateResultsCount();
  };
  
  const updateResultsCount = () => {
    const countEl = document.getElementById('results-count') || document.createElement('div');
    countEl.id = 'results-count';
    countEl.className = 'results-count';
    countEl.textContent = `${filtered.length} résultat${filtered.length !== 1 ? 's' : ''} sur ${allItems.length}`;
    if (!document.getElementById('results-count')) {
      filterBar.appendChild(countEl);
    }
  };

  const renderGallery = () => {
    container.innerHTML = '';
    if (observer) observer.disconnect();

    if (filtered.length === 0) {
      container.className = 'empty-gallery';
      container.innerHTML = `
        <i class="fa fa-image"></i>
        <h3>Aucune photo trouvée</h3>
        <p>Aucun résultat ne correspond à vos critères de recherche.</p>
        <button onclick="document.getElementById('reset-filters').click()" 
                class="button secondary">
          Réinitialiser les filtres
        </button>
      `;
      return;
    }

    container.className = 'gallery-grid';
    
    filtered.forEach((item, idx) => {
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.dataset.index = idx;

      const img = document.createElement('img');
      img.dataset.src = item.thumb || item.src;
      img.alt = item.title || 'Image';
      img.loading = 'lazy';

      const meta = document.createElement('div');
      meta.className = 'meta';
      
      // Formatage de la date
      const formattedDate = item.date ? new Date(item.date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '';
      
      meta.innerHTML = `
        <div class="gallery-title">${item.title || 'Sans titre'}</div>
        <div class="gallery-date">${formattedDate}</div>
        <div class="gallery-category">${item.category || ''}</div>
        <div class="gallery-description">${item.description || ''}</div>
      `;

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

      // Gestionnaires d'événements
      searchInput.addEventListener('input', debounce(applyFilters, 300));
      clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
      });
      sortSelect.addEventListener('change', applyFilters);
      yearSelect.onchange = catSelect.onchange = applyFilters;
      resetButton.addEventListener('click', () => {
        searchInput.value = '';
        sortSelect.value = 'date-desc';
        yearSelect.value = '';
        catSelect.value = '';
        applyFilters();
      });
      
      // Fonction de debounce pour la recherche
      function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      filtered = allItems; // initial
      renderGallery();
    } catch (e) {
      container.textContent = 'Impossible de charger la galerie.';
      console.error(e);
    }
  })();
});
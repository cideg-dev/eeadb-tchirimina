import { useState, useEffect } from 'react';
import { getResources } from '@/lib/dataService';

const ResourcesList = ({ resources: externalResources = [] }) => {
  const [resources, setResources] = useState(externalResources);
  const [filteredResources, setFilteredResources] = useState(externalResources);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date-desc');
  const [loading, setLoading] = useState(externalResources.length === 0);

  // Extraire les catégories et types uniques
  const categories = ['all', ...new Set(resources.map(resource => resource.category || 'autre'))];
  const types = ['all', ...new Set(resources.map(resource => resource.type || 'autre'))];

  // Charger les ressources depuis le service de données
  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (externalResources && externalResources.length > 0) {
          // Si les ressources sont passées en props, les utiliser directement
          setResources(externalResources);
        } else {
          // Sinon, charger les données depuis le service
          const data = await getResources();
          setResources(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des ressources:', error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [externalResources]);

  // Filtrer et trier les ressources
  useEffect(() => {
    let result = resources;
    
    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      result = result.filter(resource => resource.category === selectedCategory);
    }
    
    // Filtrer par type
    if (selectedType !== 'all') {
      result = result.filter(resource => resource.type === selectedType);
    }
    
    // Recherche textuelle
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        (resource.description && resource.description.toLowerCase().includes(term))
      );
    }
    
    // Tri
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
    
    setFilteredResources(result);
  }, [selectedCategory, selectedType, searchTerm, sortOption, resources]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-eeadb-blue mb-4">Recherche et filtres</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-eeadb-blue font-medium mb-2">Recherche</label>
            <div className="relative">
              <input
                type="search"
                placeholder="Rechercher..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-eeadb-blue font-medium mb-2">Catégorie</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes les catégories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-eeadb-blue font-medium mb-2">Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'Tous les types' : type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-eeadb-blue font-medium mb-2">Trier par</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date-desc">Date (récentes en premier)</option>
              <option value="date-asc">Date (anciennes en premier)</option>
              <option value="title-asc">Titre (A-Z)</option>
              <option value="title-desc">Titre (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4 text-gray-600">
        {filteredResources.length} {filteredResources.length === 1 ? 'ressource' : 'ressources'} trouvée{filteredResources.length > 1 ? 's' : ''}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eeadb-blue"></div>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-16">
          <i className="fas fa-file-alt text-5xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune ressource trouvée</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-eeadb-blue text-white p-2 rounded-lg">
                      {resource.type === 'pdf' ? <i className="fas fa-file-pdf"></i> : 
                        resource.type === 'audio' ? <i className="fas fa-file-audio"></i> : 
                        resource.type === 'video' ? <i className="fas fa-file-video"></i> : 
                        <i className="fas fa-file-alt"></i>}
                    </span>
                    <div>
                      <h3 className="font-semibold text-eeadb-blue">{resource.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="bg-blue-100 text-eeadb-blue px-2 py-1 rounded">{resource.category || 'Autre'}</span>
                        <span>{new Date(resource.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  {resource.description && (
                    <p className="text-gray-700 mt-2">{resource.description}</p>
                  )}
                </div>
                <a 
                  href={resource.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-eeadb-blue text-white px-4 py-2 rounded-lg hover:bg-eeadb-blue-dark transition-colors flex items-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Télécharger
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesList;
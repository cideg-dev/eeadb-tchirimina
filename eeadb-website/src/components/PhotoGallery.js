'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import OptimizedImage from './OptimizedImage';
import { getPhotos } from '../lib/dataService';

const PhotoGallery = ({ photos: externalPhotos = [], title = "Galerie Photo", description = "Découvrez nos moments de partage et de célébration" }) => {
  const [photos, setPhotos] = useState(externalPhotos);
  const [filteredPhotos, setFilteredPhotos] = useState(externalPhotos);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(externalPhotos.length === 0);

  // Extraire les catégories uniques
  const categories = ['all', ...new Set(photos.map(photo => photo.category || 'autre'))];

  // Charger les photos depuis le service de données
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (externalPhotos && externalPhotos.length > 0) {
          // Si les photos sont passées en props, les utiliser directement
          setPhotos(externalPhotos);
        } else {
          // Sinon, charger les données depuis le service
          const data = await getPhotos();
          setPhotos(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des photos:', error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [externalPhotos]);

  // Filtrer les photos
  useEffect(() => {
    let result = photos;
    
    if (selectedCategory !== 'all') {
      result = result.filter(photo => photo.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(photo => 
        photo.title.toLowerCase().includes(term) || 
        (photo.description && photo.description.toLowerCase().includes(term))
      );
    }
    
    setFilteredPhotos(result);
  }, [selectedCategory, searchTerm, photos]);

  // Gérer la sélection d'une photo
  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setSelectedPhoto(photos[index]);
  };

  // Navigation dans la lightbox
  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  // Gestion des événements clavier pour la lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhoto) {
        if (e.key === 'Escape') {
          setSelectedPhoto(null);
        } else if (e.key === 'ArrowRight') {
          nextPhoto();
        } else if (e.key === 'ArrowLeft') {
          prevPhoto();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentPhotoIndex, photos]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-eeadb-blue mb-4">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Barre de filtres */}
      <div className="bg-blue-50 p-6 rounded-xl border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-eeadb-blue font-medium mb-2">Recherche</label>
            <div className="relative">
              <input
                type="search"
                placeholder="Rechercher dans les photos..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Rechercher dans les photos"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchTerm('')}
                  aria-label="Effacer la recherche"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-eeadb-blue font-medium mb-2">Catégorie</label>
            <select
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filtrer par catégorie"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes les catégories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-gray-600">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} trouvée{filteredPhotos.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Grille de photos */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eeadb-blue"></div>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-center py-16">
          <i className="fas fa-images text-5xl text-gray-300 mb-4" aria-hidden="true"></i>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune photo trouvée</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={photo.id || index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:transform hover:translate-y-[-5px] transition-all duration-300 cursor-pointer"
              onClick={() => {
                // Trouver l'index dans le tableau original pour la navigation
                const originalIndex = photos.findIndex(p => p.id === photo.id);
                setCurrentPhotoIndex(originalIndex);
                setSelectedPhoto(photos[originalIndex]);
              }}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const originalIndex = photos.findIndex(p => p.id === photo.id);
                  setCurrentPhotoIndex(originalIndex);
                  setSelectedPhoto(photos[originalIndex]);
                }
              }}
              role="button"
              aria-label={`Voir la photo: ${photo.title}`}
            >
              <div className="aspect-square overflow-hidden">
                <OptimizedImage 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  width={400}
                  height={400}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-eeadb-blue truncate">{photo.title}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Fermer la vue détaillée"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={prevPhoto}
              aria-label="Photo précédente"
            >
              <i className="fas fa-chevron-left text-xl"></i>
            </button>
            
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={nextPhoto}
              aria-label="Photo suivante"
            >
              <i className="fas fa-chevron-right text-xl"></i>
            </button>
            
            <div className="relative w-full h-[80vh]">
              <Image 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title} 
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white p-2 bg-black bg-opacity-50 rounded-t-lg">
              <h3 className="font-bold text-lg">{selectedPhoto.title}</h3>
              <p className="text-sm">{selectedPhoto.date} | {selectedPhoto.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
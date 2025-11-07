// pages/admin/gallery.js
import { useAuth } from '../../components/AuthProvider';
import PrivateRoute from '../../components/PrivateRoute';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function GalleryManagement() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  // Simuler la récupération des photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Dans une application réelle, vous récupéreriez les photos depuis une API
        const mockPhotos = [
          {
            id: 1,
            src: '/assets/gallery/2025/concert-de-noel/image1.jpg',
            title: 'Culte de Noël',
            date: '2025-12-24',
            location: 'Temple BERACA',
            category: 'Culte',
            description: 'Photo du culte de Noël 2025'
          },
          {
            id: 2,
            src: '/assets/gallery/2025/concert-de-noel/image2.jpg',
            title: 'Chœur de Noël',
            date: '2025-12-24',
            location: 'Temple BERACA',
            category: 'Louange',
            description: 'Photo du chœur pendant le culte de Noël'
          }
        ];
        
        setPhotos(mockPhotos);
      } catch (error) {
        console.error('Erreur lors de la récupération des photos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const [newPhoto, setNewPhoto] = useState({
    title: '',
    date: '',
    location: '',
    category: 'Autre',
    description: '',
    src: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPhoto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    // Dans une application réelle, vous traiteriez l'upload du fichier ici
    // Pour cette démonstration, nous simulons l'upload
    const file = e.target.files[0];
    if (file) {
      // Générer une URL temporaire pour l'aperçu
      const tempUrl = URL.createObjectURL(file);
      setNewPhoto(prev => ({
        ...prev,
        src: tempUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentPhoto) {
      // Mise à jour d'une photo existante
      const updatedPhotos = photos.map(photo => 
        photo.id === currentPhoto.id ? { ...newPhoto, id: currentPhoto.id } : photo
      );
      setPhotos(updatedPhotos);
    } else {
      // Ajout d'une nouvelle photo
      const photoToAdd = {
        ...newPhoto,
        id: photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1
      };
      setPhotos([...photos, photoToAdd]);
    }
    
    // Réinitialiser le formulaire
    setNewPhoto({
      title: '',
      date: '',
      location: '',
      category: 'Autre',
      description: '',
      src: ''
    });
    setShowForm(false);
    setCurrentPhoto(null);
  };

  const handleEdit = (photo) => {
    setNewPhoto({
      title: photo.title,
      date: photo.date,
      location: photo.location,
      category: photo.category,
      description: photo.description,
      src: photo.src
    });
    setCurrentPhoto(photo);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      setPhotos(photos.filter(photo => photo.id !== id));
    }
  };

  const formatCategory = (category) => {
    const categoryMap = {
      'Culte': 'Culte',
      'Louange': 'Louange',
      'Jeunesse': 'Jeunesse',
      'École': 'École du dimanche',
      'Prière': 'Prière',
      'Autre': 'Autre'
    };
    return categoryMap[category] || category;
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Gestion de la galerie - EEADB-Tchirimina</title>
        </Head>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestion de la galerie</h1>
            <p className="text-gray-600">Ajouter, modifier ou supprimer les photos de la galerie</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                setCurrentPhoto(null);
                setNewPhoto({
                  title: '',
                  date: '',
                  location: '',
                  category: 'Autre',
                  description: '',
                  src: ''
                });
                setShowForm(true);
              }}
              className="bg-eeadb-blue text-white px-4 py-2 rounded-md hover:bg-eeadb-blue-dark transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Ajouter une photo
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentPhoto ? 'Modifier la photo' : 'Ajouter une nouvelle photo'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="src" className="block text-sm font-medium text-gray-700 mb-1">
                      Image *
                    </label>
                    <input
                      type="file"
                      id="src"
                      name="src"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                    {newPhoto.src && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Aperçu de l'image:</p>
                        <img 
                          src={newPhoto.src} 
                          alt="Aperçu" 
                          className="max-h-60 object-contain border border-gray-200 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Titre *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newPhoto.title}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newPhoto.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    >
                      <option value="Culte">Culte</option>
                      <option value="Louange">Louange</option>
                      <option value="Jeunesse">Jeunesse</option>
                      <option value="École">École du dimanche</option>
                      <option value="Prière">Prière</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={newPhoto.date}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Lieu
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={newPhoto.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newPhoto.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-eeadb-blue focus:border-eeadb-blue"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    type="submit"
                    className="bg-eeadb-blue text-white px-4 py-2 rounded-md hover:bg-eeadb-blue-dark transition-colors"
                  >
                    {currentPhoto ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setCurrentPhoto(null);
                      setNewPhoto({
                        title: '',
                        date: '',
                        location: '',
                        category: 'Autre',
                        description: '',
                        src: ''
                      });
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eeadb-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Aucune photo trouvée
                </div>
              ) : (
                photos.map((photo) => (
                  <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 truncate">{photo.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{photo.date}</p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-eeadb-blue rounded-full">
                            {formatCategory(photo.category)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(photo)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(photo.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 truncate">{photo.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </PrivateRoute>
  );
}
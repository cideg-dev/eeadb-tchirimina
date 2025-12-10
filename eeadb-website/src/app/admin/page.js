'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../components/ClientAuthProvider';
import PrivateRoute from '../../components/PrivateRoute';

const AdminPage = () => {
  const authContext = useAuth();
  const user = authContext?.user;
  const login = authContext?.login;
  const logout = authContext?.logout;
  const [formData, setFormData] = useState({
    type: 'pasteur', // pasteur, diacre, departement, membre
    nom: '',
    prenoms: '',
    poste: '',
    anneeMinistere: '',
    profession: '',
    photo: null,
    epouse: {
      nom: '',
      prenoms: '',
      poste: '',
      photo: null
    },
    membres: []
  });
  const [leadershipData, setLeadershipData] = useState({
    pasteur: [],
    diacres: [],
    departements: []
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    // Charger les données existantes si l'utilisateur est connecté
    if (user) {
      // Dans une application réelle, on chargerait depuis une API ou un service
      // Pour l'exemple, nous utiliserons des données fictives
      setLeadershipData({
        pasteur: [
          {
            id: 1,
            nom: "Pasteur Jean Doe",
            prenoms: "Jean",
            anneeMinistere: 2010,
            photo: "/eeadb-tchirimina/images/pasteur.jpg",
            poste: "Pasteur Principal"
          },
          {
            id: 2,
            nom: "Mme Pasteur Doe",
            prenoms: "Marie",
            anneeMinistere: 2010,
            photo: "/eeadb-tchirimina/images/mme-pasteur.jpg",
            poste: "Femme du Pasteur"
          }
        ],
        diacres: [
          {
            id: 3,
            nom: "Diacre Paul Smith",
            prenoms: "Paul",
            poste: "Diacre Principal",
            profession: "Médecin",
            photo: "/eeadb-tchirimina/images/diacre1.jpg",
            epouse: {
              nom: "Mme Diacre Smith",
              prenoms: "Sophie",
              photo: "/eeadb-tchirimina/images/mme-diacre1.jpg",
              poste: "Epouse du Diacre Principal"
            }
          }
        ],
        departements: [
          {
            id: 5,
            nom: "Responsable Département Adoration",
            prenoms: "Thomas",
            poste: "Responsable Adoration",
            photo: "/eeadb-tchirimina/images/responsable-adoration.jpg",
            membres: [
              {
                id: 6,
                nom: "Membre Adoration 1",
                prenoms: "Jean",
                poste: "Animateur Adoration",
                photo: "/eeadb-tchirimina/images/membre-adoration1.jpg"
              }
            ]
          }
        ]
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('epouse.')) {
      const epouseField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        epouse: {
          ...prev.epouse,
          [epouseField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dans une application réelle, on enverrait les données à une API
    console.log('Données à sauvegarder:', formData);
    
    // Mise à jour locale des données
    if (formData.type === 'pasteur') {
      setLeadershipData(prev => ({
        ...prev,
        pasteur: [...prev.pasteur, { ...formData, id: Date.now() }]
      }));
    } else if (formData.type === 'diacre') {
      setLeadershipData(prev => ({
        ...prev,
        diacres: [...prev.diacres, { ...formData, id: Date.now() }]
      }));
    } else if (formData.type === 'departement') {
      setLeadershipData(prev => ({
        ...prev,
        departements: [...prev.departements, { ...formData, id: Date.now(), membres: [] }]
      }));
    } else if (formData.type === 'membre') {
      // Ajouter un membre à un département existant
      const deptIndex = leadershipData.departements.findIndex(d => d.id == formData.departementId);
      if (deptIndex !== -1) {
        const updatedDepts = [...leadershipData.departements];
        updatedDepts[deptIndex].membres = [
          ...updatedDepts[deptIndex].membres,
          { ...formData, id: Date.now() }
        ];
        setLeadershipData(prev => ({
          ...prev,
          departements: updatedDepts
        }));
      }
    }
    
    // Réinitialiser le formulaire
    setFormData({
      type: 'pasteur',
      nom: '',
      prenoms: '',
      poste: '',
      anneeMinistere: '',
      profession: '',
      photo: null,
      epouse: {
        nom: '',
        prenoms: '',
        poste: '',
        photo: null
      },
      membres: []
    });
    
    alert('Informations sauvegardées avec succès !');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Dans une application réelle, on ferait une vérification avec un serveur
    // Pour l'exemple, nous utilisons un simple mot de passe
    if (loginForm.username === 'admin' && loginForm.password === 'admin123' && login) {
      login({ username: loginForm.username });
      setShowLoginForm(false);
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-eeadb-blue">Administration des Dirigeants</h1>
              <button
                onClick={() => logout && logout()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Déconnexion
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formulaire d'ajout */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-eeadb-blue mb-4">Ajouter/Modifier un Dirigeant</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="pasteur">Pasteur</option>
                      <option value="diacre">Diacre</option>
                      <option value="departement">Responsable Département</option>
                      <option value="membre">Membre Département</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nom</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Prénoms</label>
                      <input
                        type="text"
                        name="prenoms"
                        value={formData.prenoms}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Poste</label>
                    <input
                      type="text"
                      name="poste"
                      value={formData.poste}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  {formData.type === 'pasteur' && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Année de ministère</label>
                      <input
                        type="number"
                        name="anneeMinistere"
                        value={formData.anneeMinistere}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        min="1900"
                        max="2030"
                      />
                    </div>
                  )}

                  {(formData.type === 'diacre') && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Profession</label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Photo</label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      accept="image/*"
                    />
                  </div>

                  {(formData.type === 'diacre') && (
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold text-eeadb-blue mb-3">Épouse du Diacre</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Nom</label>
                          <input
                            type="text"
                            name="epouse.nom"
                            value={formData.epouse.nom}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Prénoms</label>
                          <input
                            type="text"
                            name="epouse.prenoms"
                            value={formData.epouse.prenoms}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="block text-gray-700 font-medium mb-2">Poste</label>
                        <input
                          type="text"
                          name="epouse.poste"
                          value={formData.epouse.poste}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="block text-gray-700 font-medium mb-2">Photo</label>
                        <input
                          type="file"
                          name="epouse.photo"
                          onChange={handleFileChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-eeadb-blue-700 hover:bg-eeadb-blue-800 text-white font-bold py-3 px-4 rounded transition-colors"
                  >
                    Enregistrer
                  </button>
                </form>
              </div>

              {/* Aperçu des données */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-eeadb-blue mb-4">Aperçu des Dirigeants</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Pasteurs</h3>
                  <div className="space-y-3">
                    {leadershipData.pasteur.map(leader => (
                      <div key={leader.id} className="border-b pb-2">
                        <p><span className="font-medium">Nom:</span> {leader.nom}</p>
                        <p><span className="font-medium">Prénoms:</span> {leader.prenoms}</p>
                        <p><span className="font-medium">Poste:</span> {leader.poste}</p>
                        <p><span className="font-medium">Année de ministère:</span> {leader.anneeMinistere}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Diacres</h3>
                  <div className="space-y-3">
                    {leadershipData.diacres.map(diacre => (
                      <div key={diacre.id} className="border-b pb-2">
                        <p><span className="font-medium">Nom:</span> {diacre.nom}</p>
                        <p><span className="font-medium">Profession:</span> {diacre.profession}</p>
                        <p><span className="font-medium">Poste:</span> {diacre.poste}</p>
                        {diacre.epouse && (
                          <div className="ml-4 mt-2">
                            <p><span className="font-medium">Épouse:</span> {diacre.epouse.nom}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Responsables Départements</h3>
                  <div className="space-y-3">
                    {leadershipData.departements.map(departement => (
                      <div key={departement.id} className="border-b pb-2">
                        <p><span className="font-medium">Nom:</span> {departement.nom}</p>
                        <p><span className="font-medium">Poste:</span> {departement.poste}</p>
                        {departement.membres && departement.membres.length > 0 && (
                          <div className="ml-4 mt-2">
                            <p className="font-medium">Membres:</p>
                            <ul>
                              {departement.membres.map(membre => (
                                <li key={membre.id}>{membre.nom} - {membre.poste}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminPage;
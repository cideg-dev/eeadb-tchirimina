'use client';

import { useState } from 'react';
import Image from 'next/image';

const Leadership = () => {
  // Données initiales des dirigeants (à remplacer par des données dynamiques)
  const [leadershipData] = useState({
    pasteur: [
      {
        id: 1,
        nom: "Pasteur Jean Doe",
        prenoms: "Jean",
        anneeMinistere: 2010,
        photo: "/eeadb-tchirimina/images/pasteur.jpg", // Placeholder
        poste: "Pasteur Principal"
      },
      {
        id: 2,
        nom: "Mme Pasteur Doe",
        prenoms: "Marie",
        anneeMinistere: 2010,
        photo: "/eeadb-tchirimina/images/mme-pasteur.jpg", // Placeholder
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
      },
      {
        id: 4,
        nom: "Diacre Marc Johnson",
        prenoms: "Marc",
        poste: "Diacre Financier",
        profession: "Comptable",
        photo: "/eeadb-tchirimina/images/diacre2.jpg",
        epouse: {
          nom: "Mme Diacre Johnson",
          prenoms: "Alice",
          photo: "/eeadb-tchirimina/images/mme-diacre2.jpg",
          poste: "Epouse du Diacre Financier"
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
          },
          {
            id: 7,
            nom: "Membre Adoration 2",
            prenoms: "Lucie",
            poste: "Chantre",
            photo: "/eeadb-tchirimina/images/membre-adoration2.jpg"
          }
        ]
      },
      {
        id: 8,
        nom: "Responsable Département École Dominical",
        prenoms: "Émilie",
        poste: "Responsable École Dominical",
        photo: "/eeadb-tchirimina/images/responsable-ecole.jpg",
        membres: [
          {
            id: 9,
            nom: "Membre École Dominical 1",
            prenoms: "Pierre",
            poste: "Professeur École",
            photo: "/eeadb-tchirimina/images/membre-ecole1.jpg"
          }
        ]
      },
      {
        id: 10,
        nom: "Responsable Département Intercession",
        prenoms: "Catherine",
        poste: "Responsable Intercession",
        photo: "/eeadb-tchirimina/images/responsable-intercession.jpg",
        membres: [
          {
            id: 11,
            nom: "Membre Intercession 1",
            prenoms: "André",
            poste: "Intercesseur",
            photo: "/eeadb-tchirimina/images/membre-intercession1.jpg"
          }
        ]
      }
    ]
  });

  const [expandedSections, setExpandedSections] = useState({
    pasteur: false,
    diacres: false,
    departements: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const displayLeader = (leader, isCouple = false) => (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-eeadb-blue-100">
          <Image 
            src={leader.photo || "/eeadb-tchirimina/images/placeholder-profile.jpg"} 
            alt={leader.nom}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold text-eeadb-blue">{leader.nom}</h3>
        <p className="text-gray-600 mb-1">{leader.prenoms}</p>
        {leader.poste && <p className="text-eeadb-blue-600 font-medium">{leader.poste}</p>}
        {leader.anneeMinistere && <p className="text-gray-700">Ministère depuis {leader.anneeMinistere}</p>}
        {leader.profession && <p className="text-gray-700">Profession: {leader.profession}</p>}
      </div>
      {isCouple && leader.epouse && (
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
          <div className="text-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-eeadb-blue-100 mx-auto">
              <Image 
                src={leader.epouse.photo || "/eeadb-tchirimina/images/placeholder-profile.jpg"} 
                alt={leader.epouse.nom}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-700">{leader.epouse.nom}</p>
            {leader.epouse.poste && <p className="text-xs text-eeadb-blue-600">{leader.epouse.poste}</p>}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-eeadb-blue mb-4">Direction de l'Église</h2>
        <div className="w-24 h-1 bg-eeadb-gold-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les dirigeants qui nous guident dans la foi et le service
        </p>
      </div>

      {/* Section Pasteur et Femme du Pasteur */}
      <div className="mb-10">
        <div 
          className="flex justify-between items-center bg-eeadb-blue-700 text-white p-4 rounded-lg cursor-pointer"
          onClick={() => toggleSection('pasteur')}
        >
          <h3 className="text-xl font-bold">Pasteur et Femme du Pasteur</h3>
          <span className="text-xl">{expandedSections.pasteur ? '-' : '+'}</span>
        </div>
        {expandedSections.pasteur && (
          <div className="mt-4">
            {leadershipData.pasteur.map(leader => (
              <div key={leader.id}>
                {displayLeader(leader)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Diacres et leurs épouses */}
      <div className="mb-10">
        <div 
          className="flex justify-between items-center bg-eeadb-blue-700 text-white p-4 rounded-lg cursor-pointer"
          onClick={() => toggleSection('diacres')}
        >
          <h3 className="text-xl font-bold">Diacres et leurs Épouses</h3>
          <span className="text-xl">{expandedSections.diacres ? '-' : '+'}</span>
        </div>
        {expandedSections.diacres && (
          <div className="mt-4">
            {leadershipData.diacres.map(diacre => (
              <div key={diacre.id}>
                {displayLeader(diacre, true)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Départements et leurs membres */}
      <div className="mb-10">
        <div 
          className="flex justify-between items-center bg-eeadb-blue-700 text-white p-4 rounded-lg cursor-pointer"
          onClick={() => toggleSection('departements')}
        >
          <h3 className="text-xl font-bold">Départements de l'Église</h3>
          <span className="text-xl">{expandedSections.departements ? '-' : '+'}</span>
        </div>
        {expandedSections.departements && (
          <div className="mt-4">
            {leadershipData.departements.map(departement => (
              <div key={departement.id} className="mb-8">
                <div className="bg-eeadb-blue-100 p-4 rounded-lg mb-4">
                  {displayLeader(departement)}
                </div>
                {departement.membres && departement.membres.length > 0 && (
                  <div className="ml-8">
                    <h4 className="text-lg font-semibold text-eeadb-blue mb-3">Membres du Département</h4>
                    {departement.membres.map(membre => (
                      <div key={membre.id} className="ml-4">
                        {displayLeader(membre)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leadership;
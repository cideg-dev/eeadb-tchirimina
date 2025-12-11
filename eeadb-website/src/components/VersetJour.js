'use client';

import { useState, useEffect } from 'react';
import { getVersetDuJour } from '../lib/dataService';

// Skeleton Loader Component
const VersetSkeleton = () => (
  <div className="relative bg-eeadb-blue-dark text-white py-12 px-4 rounded-lg shadow-lg overflow-hidden w-full min-h-[320px] flex flex-col justify-center items-center">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>
    <div className="relative z-10 max-w-3xl mx-auto text-center w-full animate-pulse">
      <div className="h-6 bg-eeadb-blue-600 rounded-md w-1/3 mx-auto mb-8"></div>
      <div className="space-y-4">
        <div className="h-8 bg-eeadb-blue-500 rounded-md w-full"></div>
        <div className="h-8 bg-eeadb-blue-500 rounded-md w-5/6 mx-auto"></div>
        <div className="h-8 bg-eeadb-blue-500 rounded-md w-3/4 mx-auto"></div>
      </div>
      <div className="h-6 bg-eeadb-blue-600 rounded-md w-1/4 ml-auto mt-6"></div>
    </div>
  </div>
);

const VersetJour = ({ versetData }) => {
  const [verset, setVerset] = useState(versetData || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!versetData);

  useEffect(() => {
    if (versetData) {
      setVerset(versetData);
      setLoading(false);
    } else {
      const fetchVerset = async () => {
        try {
          const data = await getVersetDuJour();
          setVerset(data);
        } catch (err) {
          console.error('[VersetJour] Erreur de chargement:', err);
          // Utiliser les données fallback
          setVerset({
            text: "Apportez toutes les dîmes à la maison du trésor, afin qu'il y ait de la nourriture dans ma maison; mettez-moi ainsi à l'épreuve, dit l'Éternel des armées, et voyez si je ne vous ouvre pas les fenêtres des cieux, si je ne répands pas sur vous une bénédiction jusqu'à ce qu'il n'y ait plus de place.",
            reference: "Malachie 3:10",
            source: "Bible Segond 21"
          });
        } finally {
          setLoading(false);
        }
      };
      fetchVerset();
    }
  }, [versetData]);

  if (loading) {
    return <VersetSkeleton />;
  }

  if (!verset || !verset.text) {
    return (
        <div className="text-center p-8 bg-eeadb-blue-dark text-white rounded-lg shadow-lg min-h-[320px] flex justify-center items-center">
          <p>Le verset du jour n'est pas disponible pour le moment.</p>
        </div>
      );
  }

  return (
    <section className="relative bg-eeadb-blue-dark text-white py-12 px-4 rounded-lg shadow-lg overflow-hidden min-h-[320px] flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-eeadb-blue-300">Verset du jour</h2>
        <blockquote className="text-2xl sm:text-3xl md:text-4xl leading-relaxed italic mb-4">
          "{verset.text}"
        </blockquote>
        <cite className="block text-right font-medium text-lg sm:text-xl">— {verset.reference}</cite>
        {verset.source && (
          <p className="text-xs sm:text-sm text-eeadb-blue-200 text-center mt-4 font-light">Source: {verset.source}</p>
        )}
      </div>
    </section>
  );
};

export default VersetJour;
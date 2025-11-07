'use client';

import { useState, useEffect } from 'react';
import { getVersetDuJour } from '../lib/dataService';

const VersetJour = ({ versetData }) => {
  const [verset, setVerset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (versetData) {
      // Si les données sont passées en props, les utiliser directement
      setVerset(versetData);
      setLoading(false);
    } else {
      // Sinon, charger les données depuis le service
      const fetchVerset = async () => {
        try {
          setLoading(true);
          const data = await getVersetDuJour();
          setVerset(data);
        } catch (err) {
          setError("Impossible de charger le verset du jour. Veuillez réessayer plus tard.");
        } finally {
          setLoading(false);
        }
      };

      fetchVerset();
    }
  }, [versetData]);

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <i className="fas fa-exclamation-triangle text-red-500 mr-3"></i>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-eeadb-blue-600 to-eeadb-blue-700 text-white p-8 rounded-2xl text-center shadow-lg animate-pulse">
        <h2 className="text-2xl font-bold mb-4 text-center">Verset du jour</h2>
        <div className="h-6 bg-eeadb-blue-300 rounded mb-4"></div>
        <div className="h-4 bg-eeadb-blue-300 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-eeadb-blue-300 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gradient-to-br from-eeadb-blue-600 to-eeadb-blue-800 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 transform ${
        isHovered ? 'scale-[1.02] shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center mb-3">
        <div className="w-12 h-1 bg-eeadb-gold-300 rounded-full"></div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Verset du jour</h2>
      <div className="relative">
        <i className="fas fa-quote-left text-eeadb-gold-300 text-3xl absolute -top-4 -left-2 opacity-50"></i>
        <blockquote className="text-xl italic mb-6 text-center pl-8">
          "{verset.text}"
        </blockquote>
        <i className="fas fa-quote-right text-eeadb-gold-300 text-3xl absolute -bottom-4 -right-2 opacity-50"></i>
      </div>
      <cite className="block text-right font-medium text-xl">— {verset.reference}</cite>
      <div className="flex justify-center mt-6">
        <div className="w-12 h-1 bg-eeadb-gold-300 rounded-full"></div>
      </div>
      <p className="text-sm text-eeadb-blue-200 text-center mt-4 font-light">{verset.source}</p>
    </div>
  );
};

export default VersetJour;
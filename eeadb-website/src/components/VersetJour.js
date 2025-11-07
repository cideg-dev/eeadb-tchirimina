import { useState, useEffect } from 'react';
import { getVersetDuJour } from '../lib/dataService';

const VersetJour = ({ versetData }) => {
  const [verset, setVerset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-eeadb-blue text-white p-6 rounded-xl text-center animate-pulse">
        <h2 className="text-xl font-bold mb-2">Verset du jour</h2>
        <div className="h-6 bg-blue-300 rounded mb-2"></div>
        <div className="h-4 bg-blue-300 rounded w-3/4 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="bg-eeadb-blue text-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Verset du jour</h2>
      <blockquote className="text-lg italic mb-3 text-center">
        "{verset.text}"
      </blockquote>
      <cite className="block text-right font-medium">— {verset.reference}</cite>
      <p className="text-sm text-blue-200 text-center mt-4">{verset.source}</p>
    </div>
  );
};

export default VersetJour;
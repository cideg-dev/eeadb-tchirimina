import Head from 'next/head';
import Layout from '../components/Layout';
import VersetJour from '../components/VersetJour';
import dynamic from 'next/dynamic';

// Chargement différé des composants lourds
const Calendar = dynamic(() => import('../components/Calendar'), {
  loading: () => (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[500px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eeadb-blue"></div>
    </div>
  ),
  ssr: false
});

const PhotoGallery = dynamic(() => import('../components/PhotoGallery'), {
  loading: () => (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-eeadb-blue"></div>
    </div>
  ),
  ssr: false
});

export default function Home() {
  return (
    <Layout title="Accueil - EEADB-Tchirimina">
      {/* Bannière d'accueil */}
      <div className="bg-gradient-to-r from-eeadb-blue-700 to-eeadb-blue-800 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            Bienvenue au temple BERACA
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-2xl mx-auto">
            Un lieu de foi, de communion et d'exploits avec Dieu. Rejoignez-nous pour célébrer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#activites" className="inline-block bg-eeadb-gold-500 hover:bg-eeadb-gold-600 text-eeadb-blue-900 font-bold rounded-lg px-8 py-4 text-lg transition-transform duration-200 hover:scale-105 shadow-lg">
              Voir nos activités
            </a>
            <a href="/contact" className="inline-block bg-white hover:bg-gray-200 text-eeadb-blue-800 font-bold rounded-lg px-8 py-4 text-lg transition-transform duration-200 hover:scale-105 shadow-lg">
              Planifier une visite
            </a>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gray-50">
        {/* Section verset du jour */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12 transition-all duration-300 hover:shadow-xl">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-eeadb-blue mb-2">Verset du Jour</h2>
              <div className="w-16 h-1 bg-eeadb-gold-500 mx-auto rounded-full"></div>
            </div>
            <VersetJour />
          </div>
        </div>

        {/* Section activités à venir */}
        <div id="activites" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-eeadb-blue mb-4">Activités à Venir</h2>
            <div className="w-24 h-1 bg-eeadb-gold-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos prochains cultes, événements et activités communautaires
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
            <Calendar />
          </div>
        </div>

        {/* Section galerie */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-eeadb-blue mb-4">Galerie Photos</h2>
            <div className="w-24 h-1 bg-eeadb-gold-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Moments précieux partagés ensemble lors de nos événements
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
            <PhotoGallery />
          </div>
        </div>
      </main>
    </Layout>
  );
}
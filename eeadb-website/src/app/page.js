import Head from 'next/head';
import Layout from '../components/Layout';
import VersetJour from '../components/VersetJour';
import Calendar from '../components/Calendar';
import PhotoGallery from '../components/PhotoGallery';

export default function Home() {
  return (
    <Layout title="Accueil - EEADB-Tchirimina">
      {/* Bannière d'accueil */}
      <div className="bg-gradient-to-r from-eeadb-blue-700 to-eeadb-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl italic font-light tracking-wide">
            « Avec Dieu nous ferons des exploits »
          </p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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
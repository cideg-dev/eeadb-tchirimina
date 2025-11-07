import Head from 'next/head';
import Layout from '../components/Layout';
import VersetJour from '../components/VersetJour';
import Calendar from '../components/Calendar';
import PhotoGallery from '../components/PhotoGallery';

export default function Home() {
  return (
    <Layout title="Accueil - EEADB-Tchirimina">
      {/* Bannière d'accueil */}
      <div className="bg-eeadb-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina
          </h1>
          <p className="text-xl md:text-2xl italic">
            « Avec Dieu nous ferons des exploits »
          </p>
        </div>
      </div>

      <main className="flex-grow">
        {/* Section verset du jour */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <VersetJour />
          </div>
        </div>

        {/* Section activités à venir */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-eeadb-blue mb-4">Activités à Venir</h2>
            <div className="w-24 h-1 bg-eeadb-blue mx-auto"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <Calendar />
          </div>
        </div>

        {/* Section galerie */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-eeadb-blue mb-4">Galerie Photos</h2>
            <div className="w-24 h-1 bg-eeadb-blue mx-auto"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <PhotoGallery />
          </div>
        </div>
      </main>
    </Layout>
  );
}
import Head from 'next/head';
import Layout from '../components/Layout';
import ResourcesList from '../components/ResourcesList';
import { getResources } from '../lib/api';

export default function RessourcesPage({ resources }) {
  return (
    <Layout title="Ressources">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-eeadb-blue mb-4">Ressources</h1>
          <p className="text-gray-600">Accédez à nos documents, messages et enseignements</p>
        </div>
        
        <ResourcesList resources={resources} />
        
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-eeadb-blue mt-8">
          <h2 className="text-2xl font-bold text-eeadb-blue mb-4">Accès aux ressources restreintes</h2>
          <p className="text-gray-700 mb-4">
            Certaines ressources sont réservées aux membres de l'église. Veuillez utiliser le lien ci-dessous pour accéder à la zone privée.
          </p>
          <a 
            href="https://eeadb-prive.onrender.com/" 
            target="_blank" 
            rel="noopener" 
            className="inline-flex items-center gap-2 bg-eeadb-blue text-white px-6 py-3 rounded-lg hover:bg-eeadb-blue-dark transition-colors"
          >
            <i className="fas fa-lock"></i>
            Accéder à la zone privée
          </a>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const resources = await getResources();
  return {
    props: {
      resources
    },
    // Revalider les données toutes les 6 heures (21600 secondes)
    revalidate: 21600
  };
}
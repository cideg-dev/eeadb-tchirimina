import Head from 'next/head';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import { getEvents } from '../lib/api';

export default function ActivitesPage({ events }) {
  return (
    <Layout title="Activités et Horaires">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-eeadb-blue mb-4">Activités et Horaires</h1>
          <p className="text-gray-600">Découvrez nos activités hebdomadaires et événements spéciaux</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-eeadb-blue mb-6">Horaires des Cultes</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-eeadb-blue text-white p-4 rounded-lg text-center">
                    <i className="fas fa-sun text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-eeadb-blue">Culte du Dimanche</h3>
                    <p className="text-lg text-eeadb-blue font-semibold mt-2">09h00 - 12h00</p>
                    <p className="text-gray-600 mt-1">Culte principal avec sainte cène</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-eeadb-blue text-white p-4 rounded-lg text-center">
                    <i className="fas fa-moon text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-eeadb-blue">Réunion de Prière</h3>
                    <p className="text-lg text-eeadb-blue font-semibold mt-2">Mercredi 18h30 - 20h00</p>
                    <p className="text-gray-600 mt-1">Moment de prière et d'intercession</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-eeadb-blue text-white p-4 rounded-lg text-center">
                    <i className="fas fa-book-bible text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-eeadb-blue">École du Dimanche</h3>
                    <p className="text-lg text-eeadb-blue font-semibold mt-2">Dimanche 08h30 - 09h30</p>
                    <p className="text-gray-600 mt-1">Enseignement pour enfants et adolescents</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="bg-eeadb-blue text-white p-4 rounded-lg text-center">
                    <i className="fas fa-people-roof text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-eeadb-blue">Groupes de Maison</h3>
                    <p className="text-lg text-eeadb-blue font-semibold mt-2">Vendredi 19h00</p>
                    <p className="text-gray-600 mt-1">Communion fraternelle par quartier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Calendar events={events} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const events = await getEvents();
  return {
    props: {
      events
    },
    // Revalider les données toutes les heures (3600 secondes)
    revalidate: 3600
  };
}
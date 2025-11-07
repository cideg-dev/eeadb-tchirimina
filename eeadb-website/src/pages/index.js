import Head from 'next/head';
import Layout from '../components/Layout';
import VersetJour from '../components/VersetJour';
import { getVersetDuJour } from '../lib/api';

export default function HomePage({ versetDuJour }) {
  return (
    <Layout title="Accueil">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section d'accueil pour nouveaux visiteurs */}
        <section id="welcome" className="mb-16 bg-blue-50 p-8 rounded-xl border-l-4 border-eeadb-blue">
          <h2 className="text-3xl font-bold text-eeadb-blue mb-6 text-center">Bienvenue à l'EEADB-Tchirimina</h2>
          <p className="text-lg text-gray-700 mb-10 text-center max-w-3xl mx-auto">
            Nous sommes heureux de vous accueillir dans notre communauté chrétienne. Que vous soyez de passage ou que vous cherchiez une église familiale, vous êtes le bienvenu parmi nous.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-hands-praying text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">Cultes dynamiques</h3>
              <p className="text-gray-600">Venez vivre des moments de louange, d'adoration et d'enseignement biblique.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-people-group text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">Communauté chaleureuse</h3>
              <p className="text-gray-600">Rejoignez une famille spirituelle où chacun trouve sa place.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-heart text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">Accueil personnalisé</h3>
              <p className="text-gray-600">Notre équipe est là pour vous accompagner dans votre découverte de l'église.</p>
            </div>
          </div>
        </section>

        {/* Section des horaires des cultes */}
        <section id="horaires" className="mb-16">
          <h2 className="text-3xl font-bold text-eeadb-blue mb-8 text-center">Horaires des Cultes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-sun text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">Culte du Dimanche</h3>
              <p className="text-lg text-eeadb-blue font-semibold mb-2">09h00 - 12h00</p>
              <p className="text-gray-600">Culte principal avec sainte cène</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-moon text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">Réunion de Prière</h3>
              <p className="text-lg text-eeadb-blue font-semibold mb-2">Mercredi 18h30 - 20h00</p>
              <p className="text-gray-600">Moment de prière et d'intercession</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-book-bible text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">École du Dimanche</h3>
              <p className="text-lg text-eeadb-blue font-semibold mb-2">Dimanche 08h30 - 09h30</p>
              <p className="text-gray-600">Enseignement pour enfants et adolescents</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-people-roof text-eeadb-blue text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-eeadb-blue mb-3">Groupes de Maison</h3>
              <p className="text-lg text-eeadb-blue font-semibold mb-2">Vendredi 19h00</p>
              <p className="text-gray-600">Communion fraternelle par quartier</p>
            </div>
          </div>
        </section>

        {/* Section des prochains événements en vedette */}
        <section id="featured-events" className="mb-16">
          <h2 className="text-3xl font-bold text-eeadb-blue mb-8 text-center">Prochains Événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="bg-eeadb-blue text-white p-4 rounded-lg text-center mr-4">
                <span className="block text-2xl font-bold">24</span>
                <span className="block text-sm uppercase">Déc</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eeadb-blue mb-2">Culte de Noël</h3>
                <p className="text-gray-600 mb-1">18h00 - 20h00</p>
                <p className="text-gray-600">Temple BERACA</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a href="/activites" className="inline-flex items-center gap-2 bg-eeadb-blue text-white px-6 py-3 rounded-lg hover:bg-eeadb-blue-dark transition-colors">
              <i className="fas fa-calendar-days"></i>
              Voir tout le calendrier
            </a>
          </div>
        </section>

        {/* Section Galerie Photo en Vedette */}
        <section id="featured-gallery" className="mb-16">
          <h2 className="text-3xl font-bold text-eeadb-blue mb-4 text-center">Galerie Photo</h2>
          <p className="text-center text-gray-600 mb-8">Découvrez nos moments de partage et de célébration</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Les photos seront chargées dynamiquement par JavaScript */}
          </div>
          <div className="text-center">
            <a href="/galerie" className="inline-flex items-center gap-2 bg-eeadb-blue text-white px-6 py-3 rounded-lg hover:bg-eeadb-blue-dark transition-colors">
              <i className="fas fa-images"></i>
              Voir toute la galerie
            </a>
          </div>
        </section>

        {/* Section Témoignages */}
        <section id="testimonials" className="mb-16 py-12" style={{ background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3a8a 100%)', color: 'white' }}>
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Témoignages</h2>
          <p className="text-center text-blue-100 mb-10">Ce que nos membres disent de notre communauté</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 hover:transform hover:translate-y-[-5px] transition-all duration-300">
              <div className="relative mb-4">
                <p className="text-lg italic">"BERACA est plus qu'une église, c'est une famille. J'ai trouvé ici un lieu où je peux grandir spirituellement et m'épanouir dans ma foi."</p>
              </div>
              <div className="border-t border-white border-opacity-30 pt-4">
                <h4 className="font-bold">Marie L.</h4>
                <p className="text-sm text-blue-200">Membre depuis 5 ans</p>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 hover:transform hover:translate-y-[-5px] transition-all duration-300">
              <div className="relative mb-4">
                <p className="text-lg italic">"L'accueil chaleureux et les enseignements bibliques solides ont transformé ma vie. Je recommande BERACA à tous ceux qui cherchent une communauté authentique."</p>
              </div>
              <div className="border-t border-white border-opacity-30 pt-4">
                <h4 className="font-bold">Pierre K.</h4>
                <p className="text-sm text-blue-200">Nouveau membre</p>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20 hover:transform hover:translate-y-[-5px] transition-all duration-300">
              <div className="relative mb-4">
                <p className="text-lg italic">"Les programmes pour les jeunes sont exceptionnels. Mes enfants adorent venir et grandissent dans la foi grâce à l'encadrement dévoué de l'équipe."</p>
              </div>
              <div className="border-t border-white border-opacity-30 pt-4">
                <h4 className="font-bold">Sophie M.</h4>
                <p className="text-sm text-blue-200">Mère de famille</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section de présentation de l'église */}
        <section id="presentation" className="mb-16 bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-eeadb-blue mb-6 text-center">Notre Église</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            L'Église Évangélique des Assemblées de Dieu du Bénin - Tchirimina (Temple BERACA) est une communauté chrétienne engagée dans l'évangélisation, la formation des disciples et le service dans l'amour.
          </p>
          
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-eeadb-blue mb-6">Nos valeurs</h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <li className="bg-blue-50 p-4 rounded-lg"><strong className="text-eeadb-blue">Foi</strong> - Vivre une relation authentique avec Dieu</li>
              <li className="bg-blue-50 p-4 rounded-lg"><strong className="text-eeadb-blue">Amour</strong> - Servir notre prochain avec compassion</li>
              <li className="bg-blue-50 p-4 rounded-lg"><strong className="text-eeadb-blue">Espérance</strong> - Partager la bonne nouvelle de Jésus-Christ</li>
              <li className="bg-blue-50 p-4 rounded-lg"><strong className="text-eeadb-blue">Communion</strong> - Grandir ensemble dans la foi</li>
            </ul>
          </div>
        </section>

        <section id="verset" className="mb-16">
          <div className="max-w-3xl mx-auto">
            <VersetJour versetData={versetDuJour} />
          </div>
        </section>

        <section id="calendar-section" className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-eeadb-blue">Calendrier des événements</h2>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="bg-white text-eeadb-blue border border-eeadb-blue px-4 py-2 rounded-lg hover:bg-eeadb-blue hover:text-white transition-colors">
                <i className="fas fa-calendar-days"></i> Mois
              </button>
              <button className="bg-white text-eeadb-blue border border-eeadb-blue px-4 py-2 rounded-lg hover:bg-eeadb-blue hover:text-white transition-colors">
                <i className="fas fa-calendar-week"></i> Semaine
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-96 flex items-center justify-center">
            <p className="text-gray-500">Le calendrier interactif s'affichera ici</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const versetDuJour = await getVersetDuJour();
  return {
    props: {
      versetDuJour
    },
    // Revalider les données toutes les 24 heures (86400 secondes)
    revalidate: 86400
  };
}
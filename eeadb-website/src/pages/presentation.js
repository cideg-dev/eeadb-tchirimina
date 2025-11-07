import Head from 'next/head';
import Layout from '../components/Layout';

export default function PresentationPage() {
  return (
    <Layout title="Présentation">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-eeadb-blue mb-4">Présentation de l'Église</h1>
          <p className="text-gray-600">Découvrez notre histoire, nos valeurs et notre mission</p>
        </div>
        
        <div className="bg-gradient-to-r from-eeadb-blue to-eeadb-blue-dark text-white p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold mb-4">Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina</h2>
          <p className="text-xl italic">« Avec Dieu nous ferons des exploits »</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold text-eeadb-blue mb-6">Notre Histoire</h2>
          <p className="text-gray-700 mb-4">
            L'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA) est une communauté chrétienne engagée dans l'évangélisation, la formation des disciples et le service dans l'amour.
          </p>
          <p className="text-gray-700">
            Fondée dans un esprit de dévotion et de service, notre église a pour mission de proclamer l'Évangile de Jésus-Christ et de faire des disciples de toutes les nations. Nous nous efforçons de créer un environnement spirituel où chacun peut grandir dans sa foi, découvrir son potentiel et vivre une relation authentique avec Dieu.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-2xl font-bold text-eeadb-blue mb-6">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-eeadb-blue text-white p-3 rounded-full mt-1">
                <i className="fas fa-hand-holding-heart text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eeadb-blue">Foi</h3>
                <p className="text-gray-700 mt-2">Vivre une relation authentique avec Dieu à travers Jésus-Christ</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-eeadb-blue text-white p-3 rounded-full mt-1">
                <i className="fas fa-heart text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eeadb-blue">Amour</h3>
                <p className="text-gray-700 mt-2">Aimer Dieu et notre prochain avec compassion et dévouement</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-eeadb-blue text-white p-3 rounded-full mt-1">
                <i className="fas fa-seedling text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eeadb-blue">Espérance</h3>
                <p className="text-gray-700 mt-2">Partager la bonne nouvelle de Jésus-Christ et la vie éternelle</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-eeadb-blue text-white p-3 rounded-full mt-1">
                <i className="fas fa-hands-helping text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eeadb-blue">Communion</h3>
                <p className="text-gray-700 mt-2">Grandir ensemble dans la foi et dans la sainte cène</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-eeadb-blue mb-6">Nos Ministères</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-eeadb-blue pl-6 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-xl font-semibold text-eeadb-blue">Louange et Adoration</h3>
              <p className="text-gray-700 mt-2">Notre équipe de louange et d'adoration anime nos cultes avec passion, créant un environnement propice à la rencontre avec Dieu.</p>
            </div>
            
            <div className="border-l-4 border-eeadb-blue pl-6 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-xl font-semibold text-eeadb-blue">Jeunesse</h3>
              <p className="text-gray-700 mt-2">Notre ministère de la jeunesse accompagne les jeunes dans leur croissance spirituelle et leur développement personnel.</p>
            </div>
            
            <div className="border-l-4 border-eeadb-blue pl-6 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-xl font-semibold text-eeadb-blue">Femmes</h3>
              <p className="text-gray-700 mt-2">Notre groupe de femmes se réunit régulièrement pour la prière, le partage et le soutien mutuel.</p>
            </div>
            
            <div className="border-l-4 border-eeadb-blue pl-6 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-xl font-semibold text-eeadb-blue">Hommes</h3>
              <p className="text-gray-700 mt-2">Notre fraternité masculine se rassemble pour se fortifier spirituellement et servir la communauté.</p>
            </div>
            
            <div className="border-l-4 border-eeadb-blue pl-6 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-xl font-semibold text-eeadb-blue">École du Dimanche</h3>
              <p className="text-gray-700 mt-2">Nous proposons des classes d'étude biblique pour tous les âges le dimanche matin avant le culte principal.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
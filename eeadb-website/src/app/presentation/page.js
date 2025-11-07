import Layout from '../../components/Layout';

export default function PresentationPage() {
  return (
    <Layout title="Présentation - EEADB-Tchirimina">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-eeadb-blue mb-4">Présentation de l'Église</h1>
          <div className="w-24 h-1 bg-eeadb-blue mx-auto"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-eeadb-blue mb-6">Notre Histoire</h2>
          <p className="text-gray-700 mb-6">
            L'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA) 
            est une communauté de foi établie dans le quartier Tchirimina à Cotonou. 
            Notre église fait partie de l'Église Évangélique des Assemblées de Dieu du Bénin, 
            une dénomination répandue à travers tout le pays.
          </p>
          
          <h2 className="text-2xl font-semibold text-eeadb-blue mb-6">Notre Mission</h2>
          <p className="text-gray-700 mb-6">
            Notre mission est de proclamer l'Évangile de Jésus-Christ, de former des disciples 
            et de contribuer au développement spirituel et social de notre communauté. 
            Nous croyons en la sanctification par l'Esprit Saint, en la guérison divine 
            et en la venue triomphante du Seigneur Jésus-Christ.
          </p>
          
          <h2 className="text-2xl font-semibold text-eeadb-blue mb-6">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-eeadb-blue">
              <h3 className="text-xl font-semibold mb-3">Adoration</h3>
              <p className="text-gray-700">Nous adorons Dieu en esprit et en vérité.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-eeadb-blue">
              <h3 className="text-xl font-semibold mb-3">Communion</h3>
              <p className="text-gray-700">Nous croyons à la communion fraternelle.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-eeadb-blue">
              <h3 className="text-xl font-semibold mb-3">Mission</h3>
              <p className="text-gray-700">Nous sommes engagés dans la Grande Commission.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
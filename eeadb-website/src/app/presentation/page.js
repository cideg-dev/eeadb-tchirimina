import Layout from '../../components/Layout';

export default function PresentationPage() {
  return (
    <Layout title="Présentation - EEADB-Tchirimina">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-eeadb-blue mb-4">Présentation de l'Église</h1>
          <div className="w-24 h-1 bg-eeadb-gold-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez l'histoire, la mission et les valeurs de l'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
              <i className="fas fa-history text-eeadb-blue-600 text-xl"></i>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-eeadb-blue">Notre Histoire</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            L'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA)
            est une communauté de foi établie dans le quartier Tchirimina à Cotonou.
            Notre église fait partie de l'Église Évangélique des Assemblées de Dieu du Bénin,
            une dénomination répandue à travers tout le pays.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Fondée dans un objectif de glorifier Dieu et de faire connaître Son amour,
            notre église s'efforce d'être une lumière dans la communauté de Tchirimina
            et au-delà. Notre temple, le BERACA, est un lieu de culte où les fidèles
            peuvent venir en quête de Dieu et de Sa bénédiction.
          </p>
        </div>

        <div className="bg-gradient-to-br from-eeadb-blue-50 to-white rounded-2xl shadow-lg p-8 mb-12 border border-eeadb-blue-100">
          <div className="flex items-center mb-6">
            <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
              <i className="fas fa-bullseye text-eeadb-blue-600 text-xl"></i>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-eeadb-blue">Notre Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Notre mission est de proclamer l'Évangile de Jésus-Christ, de former des disciples
            et de contribuer au développement spirituel et social de notre communauté.
            Nous croyons en la sanctification par l'Esprit Saint, en la guérison divine
            et en la venue triomphante du Seigneur Jésus-Christ.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Nous nous engageons à être une église vivante, dynamique et missionnaire,
            soucieuse de répondre aux besoins spirituels et matériels de notre communauté
            dans le respect des valeurs chrétiennes.
          </p>
        </div>

        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-eeadb-blue mb-6">Nos Valeurs</h2>
            <div className="w-16 h-1 bg-eeadb-gold-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-5">
                <div className="bg-eeadb-blue-100 p-4 rounded-full">
                  <i className="fas fa-pray text-eeadb-blue-600 text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-eeadb-blue mb-3">Adoration</h3>
              <p className="text-gray-700 text-center">Nous adorons Dieu en esprit et en vérité, avec ferveur et respect.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-5">
                <div className="bg-eeadb-blue-100 p-4 rounded-full">
                  <i className="fas fa-users text-eeadb-blue-600 text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-eeadb-blue mb-3">Communion</h3>
              <p className="text-gray-700 text-center">Nous croyons à la communion fraternelle et au soutien mutuel.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-5">
                <div className="bg-eeadb-blue-100 p-4 rounded-full">
                  <i className="fas fa-globe text-eeadb-blue-600 text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-eeadb-blue mb-3">Mission</h3>
              <p className="text-gray-700 text-center">Nous sommes engagés dans la Grande Commission et le témoignage.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8 flex justify-center">
              <div className="bg-eeadb-blue-100 p-6 rounded-full">
                <i className="fas fa-church text-eeadb-blue-600 text-5xl"></i>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-eeadb-blue mb-4">Notre Devise</h2>
              <p className="text-xl italic text-gray-700 mb-2">« Avec Dieu nous ferons des exploits »</p>
              <p className="text-gray-600">
                Cette parole tirée de Samuel 14:6 est au cœur de notre foi. Elle exprime notre conviction
                que Dieu est avec nous dans toutes nos entreprises et qu'Il nous donne la force de
                surmonter tous les obstacles pour Sa gloire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
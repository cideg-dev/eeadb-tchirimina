import Layout from '../../components/Layout';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <Layout title="Contact - EEADB-Tchirimina">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-eeadb-blue mb-4">Contactez-nous</h1>
          <div className="w-24 h-1 bg-eeadb-gold-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes là pour vous écouter et répondre à vos questions. Remplissez le formulaire ci-dessous ou utilisez nos coordonnées
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
                <i className="fas fa-envelope-open-text text-eeadb-blue-600 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-eeadb-blue">Formulaire de Contact</h2>
            </div>
            <ContactForm />
          </div>

          <div className="bg-gradient-to-br from-eeadb-blue-50 to-white rounded-2xl shadow-lg p-6 md:p-8 border border-eeadb-blue-100">
            <div className="flex items-center mb-6">
              <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
                <i className="fas fa-address-card text-eeadb-blue-600 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-eeadb-blue">Informations de Contact</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-map-marker-alt text-eeadb-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-eeadb-blue mb-1">Adresse</h3>
                  <p className="text-gray-700">Temple BERACA, Quartier Tchirimina, Cotonou, Bénin</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-phone-alt text-eeadb-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-eeadb-blue mb-1">Téléphone</h3>
                  <p className="text-gray-700">+229 00 00 00 00</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-envelope text-eeadb-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-eeadb-blue mb-1">Email</h3>
                  <p className="text-gray-700">contact@eeadb-tchirimina.org</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-white rounded-xl shadow-sm">
                <div className="bg-eeadb-blue-100 p-3 rounded-lg mr-4">
                  <i className="fas fa-clock text-eeadb-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-eeadb-blue mb-1">Heures de culte</h3>
                  <p className="text-gray-700">Samedis: 16h00 - 18h00</p>
                  <p className="text-gray-700">Dimanches: 08h00 - 12h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
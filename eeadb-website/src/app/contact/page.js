import Layout from '../../components/Layout';
import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <Layout title="Contact - EEADB-Tchirimina">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-eeadb-blue mb-4">Contactez-nous</h1>
          <div className="w-24 h-1 bg-eeadb-blue mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-eeadb-blue mb-6">Formulaire de Contact</h2>
            <ContactForm />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-eeadb-blue mb-6">Informations de Contact</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-gray-700">Temple BERACA, Quartier Tchirimina, Cotonou, Bénin</p>
              </div>
              <div>
                <h3 className="font-semibold">Téléphone</h3>
                <p className="text-gray-700">+229 00 00 00 00</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-700">contact@eeadb-tchirimina.org</p>
              </div>
              <div>
                <h3 className="font-semibold">Heures de culte</h3>
                <p className="text-gray-700">Samedis: 16h00 - 18h00</p>
                <p className="text-gray-700">Dimanches: 08h00 - 12h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
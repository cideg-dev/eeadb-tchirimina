import Head from 'next/head';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <Layout title="Contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-eeadb-blue mb-4">Contactez-nous</h1>
          <p className="text-gray-600">Nous sommes à votre écoute pour toutes questions ou demandes</p>
        </div>
        
        <ContactForm />
      </div>
    </Layout>
  );
}
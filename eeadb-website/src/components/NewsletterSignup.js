// components/NewsletterSignup.js
import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Erreur de connexion. Veuillez réessayer plus tard.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-eeadb-blue to-eeadb-blue-dark text-white p-8 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-2">Restez informé</h3>
      <p className="mb-4">Abonnez-vous à notre newsletter pour recevoir nos actualités</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse e-mail"
          className="flex-grow px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg font-medium ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-white text-eeadb-blue hover:bg-gray-200'
          }`}
        >
          {isSubmitting ? 'Envoi...' : 'S\'abonner'}
        </button>
      </form>
      
      {status.message && (
        <div className={`mt-3 p-3 rounded-lg text-center ${
          status.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;
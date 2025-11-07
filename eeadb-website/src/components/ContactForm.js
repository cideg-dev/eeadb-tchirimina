'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data) => {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères.');
    }
    
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.push('Adresse e-mail invalide.');
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
      errors.push('Le sujet doit contenir au moins 3 caractères.');
    }
    
    if (!data.message || data.message.trim().length < 10) {
      errors.push('Le message doit contenir au moins 10 caractères.');
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    
    if (errors.length) {
      setStatus({ type: 'error', message: errors.join(' ') });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'info', message: 'Envoi en cours...' });

    try {
      // Dans une implémentation réelle, on enverrait les données à une API
      // Pour cette démonstration, nous simulons l'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setStatus({ 
        type: 'success', 
        message: 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.' 
      });
      setFormData({ name: '', email: '', message: '', subject: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-eeadb-blue mb-6 text-center">Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
              placeholder="Votre nom"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Sujet *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
            placeholder="Sujet de votre message"
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eeadb-blue focus:border-transparent"
            placeholder="Votre message..."
            required
          ></textarea>
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-eeadb-blue text-white rounded-lg font-medium hover:bg-eeadb-blue-dark transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i> Envoi en cours...
              </span>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </div>
        
        {status.message && (
          <div className={`p-4 rounded-lg text-center ${
            status.type === 'success' ? 'bg-green-100 text-green-700' :
            status.type === 'error' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {status.message}
          </div>
        )}
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-eeadb-blue mb-4 text-center">Autres moyens de nous contacter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <i className="fas fa-phone text-eeadb-blue text-2xl mb-2"></i>
            <p className="font-medium">Téléphone</p>
            <p className="text-gray-600">+229 00 00 00 00</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <i className="fas fa-envelope text-eeadb-blue text-2xl mb-2"></i>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">contact@eeadb-tchirimina.org</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <i className="fas fa-map-marker-alt text-eeadb-blue text-2xl mb-2"></i>
            <p className="font-medium">Adresse</p>
            <p className="text-gray-600">Temple BERACA, Cotonou, Bénin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
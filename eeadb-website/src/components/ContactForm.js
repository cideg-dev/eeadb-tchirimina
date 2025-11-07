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
  const [focusedField, setFocusedField] = useState('');

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

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message');
      }

      setStatus({
        type: 'success',
        message: 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.'
      });
      setFormData({ name: '', email: '', message: '', subject: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-eeadb-blue mb-6 text-center">Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                focusedField === 'name' 
                  ? 'border-eeadb-blue-500 ring-2 ring-eeadb-blue-200' 
                  : 'border-gray-300 hover:border-eeadb-blue-400'
              }`}
              placeholder="Votre nom"
              required
            />
            {focusedField === 'name' && (
              <div className="absolute -bottom-5 text-xs text-eeadb-blue-500">
                Veuillez entrer votre nom complet
              </div>
            )}
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                focusedField === 'email' 
                  ? 'border-eeadb-blue-500 ring-2 ring-eeadb-blue-200' 
                  : 'border-gray-300 hover:border-eeadb-blue-400'
              }`}
              placeholder="votre.email@exemple.com"
              required
            />
            {focusedField === 'email' && (
              <div className="absolute -bottom-5 text-xs text-eeadb-blue-500">
                Format: exemple@domaine.com
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Sujet *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => handleFocus('subject')}
            onBlur={handleBlur}
            className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
              focusedField === 'subject' 
                ? 'border-eeadb-blue-500 ring-2 ring-eeadb-blue-200' 
                : 'border-gray-300 hover:border-eeadb-blue-400'
            }`}
            placeholder="Sujet de votre message"
            required
          />
          {focusedField === 'subject' && (
            <div className="absolute -bottom-5 text-xs text-eeadb-blue-500">
              Décrivez brièvement le sujet de votre message
            </div>
          )}
        </div>

        <div className="relative">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            rows="5"
            className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
              focusedField === 'message' 
                ? 'border-eeadb-blue-500 ring-2 ring-eeadb-blue-200' 
                : 'border-gray-300 hover:border-eeadb-blue-400'
            }`}
            placeholder="Votre message..."
            required
          ></textarea>
          {focusedField === 'message' && (
            <div className="absolute -bottom-5 text-xs text-eeadb-blue-500">
              Minimum 10 caractères
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-4 bg-gradient-to-r from-eeadb-blue-600 to-eeadb-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-3"></i> Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className="fas fa-paper-plane mr-3"></i> Envoyer le message
              </span>
            )}
          </button>
        </div>

        {status.message && (
          <div className={`p-4 rounded-lg text-center border-l-4 ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-500' 
              : status.type === 'error' 
                ? 'bg-red-50 text-red-700 border-red-500' 
                : 'bg-blue-50 text-blue-700 border-blue-500'
          }`}>
            <div className="flex items-center justify-center">
              <i className={`fas ${
                status.type === 'success' 
                  ? 'text-green-500' 
                  : status.type === 'error' 
                    ? 'text-red-500' 
                    : 'text-blue-500'
              } mr-2`}></i>
              <span>{status.message}</span>
            </div>
          </div>
        )}
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-eeadb-blue mb-4 text-center">Autres moyens de nous contacter</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-br from-eeadb-blue-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eeadb-blue-100 text-eeadb-blue mb-3">
              <i className="fas fa-phone text-xl"></i>
            </div>
            <p className="font-medium text-eeadb-blue">Téléphone</p>
            <p className="text-gray-600 mt-1">+229 00 00 00 00</p>
          </div>
          <div className="bg-gradient-to-br from-eeadb-blue-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eeadb-blue-100 text-eeadb-blue mb-3">
              <i className="fas fa-envelope text-xl"></i>
            </div>
            <p className="font-medium text-eeadb-blue">Email</p>
            <p className="text-gray-600 mt-1">contact@eeadb-tchirimina.org</p>
          </div>
          <div className="bg-gradient-to-br from-eeadb-blue-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-eeadb-blue-100 text-eeadb-blue mb-3">
              <i className="fas fa-map-marker-alt text-xl"></i>
            </div>
            <p className="font-medium text-eeadb-blue">Adresse</p>
            <p className="text-gray-600 mt-1">Temple BERACA, Cotonou, Bénin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
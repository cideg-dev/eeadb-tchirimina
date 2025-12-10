'use client';

import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Layout({ children, title = "EEADB-Tchirimina" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [skipLinkFocused, setSkipLinkFocused] = useState(false);

  // Gestion du défilement pour l'effet de navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{title} — EEADB-Tchirimina</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="description" content="Site officiel de l'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA)" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
      </Head>

      {/* Lien pour sauter au contenu principal pour les utilisateurs de lecteurs d'écran */}
      <a 
        href="#main-content" 
        className={`fixed top-4 left-4 z-50 px-4 py-2 bg-eeadb-blue text-white rounded-lg shadow-lg transition-transform duration-300 ${
          skipLinkFocused ? 'translate-y-0' : '-translate-y-full'
        } focus:translate-y-0`}
        onFocus={() => setSkipLinkFocused(true)}
        onBlur={() => setSkipLinkFocused(false)}
      >
        Aller au contenu principal
      </a>

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header avec navigation */}
        <header
          className={`bg-eeadb-blue-700 text-white shadow-md transition-all duration-300 ${
            isScrolled ? 'fixed top-0 w-full z-50' : 'relative'
          }`}
          role="banner"
          aria-label="En-tête principal"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300 p-1 rounded transition-all duration-200"
                  aria-label="Page d'accueil de l'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina"
                >
                  <Image
                    src="/eeadb-tchirimina/assets/logo-ad.png"
                    alt="Logo EEADB-Tchirimina"
                    className="h-12 w-auto object-contain"
                    width={48}
                    height={48}
                    priority
                  />
                  <div>
                    <h1 className="text-lg md:text-xl font-bold">EEADB-Tchirimina</h1>
                    <p className="text-xs md:text-sm text-eeadb-blue-200">« Avec Dieu nous ferons des exploits »</p>
                  </div>
                </Link>
              </div>

              {/* Navigation desktop */}
              <nav className="hidden md:flex" aria-label="Navigation principale">
                <ul className="flex space-x-1">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      aria-current={title.includes("Accueil") ? "page" : undefined}
                    >
                      <i className="fas fa-house text-sm" aria-hidden="true"></i> <span className="sr-only">Page d'</span>Accueil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/presentation"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      aria-current={title.includes("Présentation") ? "page" : undefined}
                    >
                      <i className="fas fa-church text-sm" aria-hidden="true"></i> Présentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/activites"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      aria-current={title.includes("Activités") ? "page" : undefined}
                    >
                      <i className="fas fa-calendar-days text-sm" aria-hidden="true"></i> Activités
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/galerie"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      aria-current={title.includes("Galerie") ? "page" : undefined}
                    >
                      <i className="fas fa-images text-sm" aria-hidden="true"></i> Galerie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ressources"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      aria-current={title.includes("Ressources") ? "page" : undefined}
                    >
                      <i className="fas fa-book text-sm" aria-hidden="true"></i> Ressources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      aria-current={title.includes("Contact") ? "page" : undefined}
                    >
                      <i className="fas fa-envelope text-sm" aria-hidden="true"></i> Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                    >
                      <i className="fas fa-user-lock text-sm" aria-hidden="true"></i> Admin
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Bouton menu mobile */}
              <button
                className="md:hidden text-white focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300 p-2 rounded transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              >
                <i 
                  className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} 
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            {/* Navigation mobile */}
            {isMenuOpen && (
              <nav className="md:hidden py-4 border-t border-eeadb-blue-600" aria-label="Navigation mobile">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={title.includes("Accueil") ? "page" : undefined}
                    >
                      <i className="fas fa-house" aria-hidden="true"></i> <span className="sr-only">Page d'</span>Accueil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/presentation"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={title.includes("Présentation") ? "page" : undefined}
                    >
                      <i className="fas fa-church" aria-hidden="true"></i> Présentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/activites"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={title.includes("Activités") ? "page" : undefined}
                    >
                      <i className="fas fa-calendar-days" aria-hidden="true"></i> Activités
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/galerie"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={title.includes("Galerie") ? "page" : undefined}
                    >
                      <i className="fas fa-images" aria-hidden="true"></i> Galerie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ressources"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={title.includes("Ressources") ? "page" : undefined}
                    >
                      <i className="fas fa-book" aria-hidden="true"></i> Ressources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={title.includes("Contact") ? "page" : undefined}
                    >
                      <i className="fas fa-envelope" aria-hidden="true"></i> Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-eeadb-blue-600 rounded transition-colors focus:outline-none focus:ring-4 focus:ring-eeadb-blue-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-user-lock" aria-hidden="true"></i> Admin
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </header>

        {/* Espace pour le header fixe */}
        {isScrolled && <div className="h-16"></div>}

        <main id="main-content" className="flex-grow pt-6" tabIndex="-1">
          {children}
        </main>

        <footer className="bg-eeadb-blue-700 text-white py-8 mt-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg font-semibold">Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina</p>
              <p className="text-eeadb-blue-200 mt-2">« Avec Dieu nous ferons des exploits »</p>
              <p className="mt-4">© {new Date().getFullYear()} EEADB-Tchirimina. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
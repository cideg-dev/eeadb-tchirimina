import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Layout({ children, title = "EEADB-Tchirimina" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css" rel="stylesheet" />
      </Head>
      
      <Script
        src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.js"
        strategy="beforeInteractive"
      />

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header avec navigation */}
        <header 
          className={`bg-eeadb-blue text-white shadow-md transition-all duration-300 ${
            isScrolled ? 'fixed top-0 w-full z-50' : 'relative'
          }`}
          role="banner"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 p-1 rounded">
                  <img 
                    src="/assets/logo-ad.png" 
                    alt="Logo EEADB-Tchirimina" 
                    className="h-12 w-auto object-contain" 
                    width="48"
                    height="48"
                  />
                  <div>
                    <h1 className="text-lg md:text-xl font-bold">EEADB-Tchirimina</h1>
                    <p className="text-xs md:text-sm text-blue-200">« Avec Dieu nous ferons des exploits »</p>
                  </div>
                </Link>
              </div>

              {/* Navigation desktop */}
              <nav className="hidden md:flex" aria-label="Navigation principale">
                <ul className="flex space-x-1">
                  <li>
                    <Link 
                      href="/" 
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-house text-sm"></i> Accueil
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/presentation" 
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-church text-sm"></i> Présentation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/activites" 
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-calendar-days text-sm"></i> Activités
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/galerie" 
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-images text-sm"></i> Galerie
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/ressources" 
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-book text-sm"></i> Ressources
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-envelope text-sm"></i> Contact
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://eeadb-prive.onrender.com/" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-1 px-3 py-2 text-sm md:text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-lock text-sm"></i> Zone privée
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Bouton menu mobile */}
              <button
                className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 p-2 rounded"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>

            {/* Navigation mobile */}
            {isMenuOpen && (
              <nav className="md:hidden pb-4" aria-label="Navigation mobile">
                <ul className="space-y-1">
                  <li>
                    <Link 
                      href="/" 
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-house"></i> Accueil
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/presentation" 
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-church"></i> Présentation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/activites" 
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-calendar-days"></i> Activités
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/galerie" 
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-images"></i> Galerie
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/ressources" 
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-book"></i> Ressources
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-envelope"></i> Contact
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://eeadb-prive.onrender.com/" 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-2 px-3 py-3 text-base text-white hover:bg-blue-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <i className="fas fa-lock"></i> Zone privée
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </header>

        {/* Espace pour le header fixe */}
        {isScrolled && <div className="h-16"></div>}

        <main className="flex-grow pt-6">
          {children}
        </main>

        <footer className="bg-eeadb-blue text-white py-8 mt-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg font-semibold">Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina</p>
              <p className="text-blue-200 mt-2">« Avec Dieu nous ferons des exploits »</p>
              <p className="mt-4">© {new Date().getFullYear()} EEADB-Tchirimina. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
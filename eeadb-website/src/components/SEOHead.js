// components/SEOHead.js
import Head from 'next/head';

const SEOHead = ({ title, description, image, url, type = 'website', ...props }) => {
  return (
    <Head>
      <title>{title ? `${title} - EEADB-Tchirimina` : 'EEADB-Tchirimina - Avec Dieu nous ferons des exploits'}</title>
      <meta name="description" content={description || 'Site officiel de l\'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA)'} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || 'https://eeadb-tchirimina.org/'} />
      <meta property="og:title" content={title ? `${title} - EEADB-Tchirimina` : 'EEADB-Tchirimina - Avec Dieu nous ferons des exploits'} />
      <meta property="og:description" content={description || 'Site officiel de l\'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA)'} />
      <meta property="og:image" content={image || '/eeadb-tchirimina/assets/logo-ad.png'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || 'https://eeadb-tchirimina.org/'} />
      <meta property="twitter:title" content={title ? `${title} - EEADB-Tchirimina` : 'EEADB-Tchirimina - Avec Dieu nous ferons des exploits'} />
      <meta property="twitter:description" content={description || 'Site officiel de l\'Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina (Temple BERACA)'} />
      <meta property="twitter:image" content={image || '/eeadb-tchirimina/assets/logo-ad.png'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || 'https://eeadb-tchirimina.org/'} />
      
      {/* Additional meta tags */}
      <meta name="keywords" content="EEADB, Tchirimina, église, bénin, christianisme, culte, prière, beraca, assemblées de dieu" />
      <meta name="author" content="EEADB-Tchirimina" />
      <meta name="robots" content="index, follow" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Church",
            "name": "Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina",
            "alternateName": "EEADB-Tchirimina",
            "url": "https://eeadb-tchirimina.org/",
            "logo": "/eeadb-tchirimina/assets/logo-ad.png",
            "description": "Temple BERACA - Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cotonou",
              "addressCountry": "BJ"
            },
            "telephone": "",
            "openingHours": [
              "Sunday 09:00-12:00",
              "Wednesday 18:30-20:00"
            ],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "6.3917",
              "longitude": "2.4462"
            },
            "founder": {
              "@type": "Organization",
              "name": "Assemblées de Dieu du Bénin"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "Fédération des Églises et Missions Évangéliques du Bénin"
            }
          })
        }}
      />
    </Head>
  );
};

export default SEOHead;
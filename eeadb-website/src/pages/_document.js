// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo-ad.png" />
        <meta name="theme-color" content="#1e3a8a" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW enregistré avec succès:', registration.scope);
                    }, function(err) {
                      console.log('Echec d\'enregistrement du SW:', err);
                    });
                });
              }
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
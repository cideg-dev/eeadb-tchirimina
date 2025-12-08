import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.googleapis.com https://translate.google.com https://r2cdn.perplexity.ai; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com; font-src 'self' data: https://fonts.gstatic.com https://r2cdn.perplexity.ai; img-src 'self' data: https: blob:; connect-src 'self' https://translate.googleapis.com https://translate.google.com; frame-src 'self' https://www.youtube.com; object-src 'none'; base-uri 'self'"
        />
      </head>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
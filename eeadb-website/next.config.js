const isProd = process.env.NODE_ENV === 'production';
const repoName = '/eeadb-tchirimina';

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export', // Nécessaire pour GitHub Pages
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : undefined,
  images: {
    unoptimized: true, // Nécessaire pour l'export statique
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'eeadb-tchirimina.org',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 semaine
  },
  experimental: {
    scrollRestoration: true,
  },
  // Les headers ne sont pas supportés avec output: 'export'
  env: {
    // Variables d'environnement
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configuration spécifique au client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  }
}
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
  images: {
    domains: ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'localhost', 'eeadb-tchirimina.org', 'placehold.co'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 semaine
  },
  experimental: {
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        // Appliquer des headers de sécurité à toutes les routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
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
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>EEADB-Tchirimina — Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-eeadb-blue mb-4">
              Église Évangélique des Assemblées de Dieu du Bénin – Tchirimina
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              « Avec Dieu nous ferons des exploits »
            </p>
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-eeadb-blue">
              <h2 className="text-2xl font-semibold text-eeadb-blue mb-4">Projet en cours de développement</h2>
              <p className="text-gray-700">
                Ce site est en cours de reconstruction avec Next.js pour une meilleure expérience utilisateur.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
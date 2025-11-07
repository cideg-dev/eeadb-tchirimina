import Layout from '@/components/Layout';
import PhotoGallery from '@/components/PhotoGallery';

export default function GaleriePage() {
  return (
    <Layout title="Galerie - EEADB-Tchirimina">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-eeadb-blue mb-4">Galerie de Photos</h1>
          <div className="w-24 h-1 bg-eeadb-blue mx-auto"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <PhotoGallery />
        </div>
      </div>
    </Layout>
  );
}
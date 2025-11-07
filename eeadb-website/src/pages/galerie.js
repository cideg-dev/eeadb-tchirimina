import Head from 'next/head';
import Layout from '../components/Layout';
import PhotoGallery from '../components/PhotoGallery';
import { getGalleryPhotos } from '../lib/api';

export default function GaleriePage({ photos }) {
  return (
    <Layout title="Galerie Photo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhotoGallery 
          photos={photos} 
          title="Galerie Photo" 
          description="Découvrez nos moments de partage et de célébration" 
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const photos = await getGalleryPhotos();
  return {
    props: {
      photos
    },
    // Revalider les données toutes les heures (3600 secondes)
    revalidate: 3600
  };
}
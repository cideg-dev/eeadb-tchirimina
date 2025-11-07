// components/A11ySkipLinks.js
import Link from 'next/link';

const A11ySkipLinks = () => {
  return (
    <div className="skip-links sr-only sr-only-focusable">
      <Link href="#main-content" className="block p-4 bg-eeadb-blue text-white font-bold">
        Aller au contenu principal
      </Link>
      <Link href="#main-navigation" className="block p-4 bg-eeadb-blue text-white font-bold">
        Aller à la navigation principale
      </Link>
    </div>
  );
};

export default A11ySkipLinks;
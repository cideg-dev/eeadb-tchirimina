import ClientAuthProvider from '../../components/ClientAuthProvider';

export default function AdminLayout({ children }) {
  return (
    <ClientAuthProvider>
      {children}
    </ClientAuthProvider>
  );
}
import ClientAuthProvider from '../../components/ClientAuthProvider';

export default function LoginLayout({ children }) {
  return (
    <ClientAuthProvider>
      {children}
    </ClientAuthProvider>
  );
}
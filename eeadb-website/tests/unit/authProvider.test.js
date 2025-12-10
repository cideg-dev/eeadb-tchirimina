/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/components/AuthProvider';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// Mock pour next/router
const mockRouter = {
  push: jest.fn(),
  query: {},
  asPath: '/',
  isReady: true,
};

const AuthConsumer = () => {
  const { user, loading, login } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'no user'}</div>
      <div data-testid="loading">{loading ? 'loading' : 'loaded'}</div>
      <button 
        data-testid="login-btn"
        onClick={() => login('test@test.com', 'password')}
      >
        Login
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  it('devrait fournir un état initial sans utilisateur', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <AuthProvider>
          <AuthConsumer />
        </AuthProvider>
      </RouterContext.Provider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('no user');
    expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
  });

  it('ne devrait pas autoriser la connexion avec des identifiants réels', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <AuthProvider>
          <AuthConsumer />
        </AuthProvider>
      </RouterContext.Provider>
    );

    const loginBtn = screen.getByTestId('login-btn');
    loginBtn.click();

    // On vérifie que la tentative de connexion échoue
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user');
    });
  });
});
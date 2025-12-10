// jest.setup.js
import '@testing-library/jest-dom';

// Ajouter les propriétés manquantes à l'objet window
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock pour les APIs manquantes dans jsdom
HTMLCanvasElement.prototype.getContext = jest.fn();
HTMLCanvasElement.prototype.toBlob = jest.fn();
HTMLCanvasElement.prototype.toDataURL = jest.fn();
/**
 * @jest-environment jsdom
 */
import { getVersetDuJour, getEvents, getPhotos, getResources } from '../../src/lib/dataService';

// Mock pour fetch
global.fetch = jest.fn();

describe('DataService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getVersetDuJour', () => {
    it('devrait retourner les données du verset du jour', async () => {
      const mockData = {
        text: "Test verset",
        reference: "Test référence",
        source: "Test source"
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getVersetDuJour();
      
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('devrait retourner les données fallback en cas d\'erreur', async () => {
      fetch.mockRejectedValueOnce(new Error('Erreur réseau'));

      const result = await getVersetDuJour();
      
      // Vérifie que les données fallback sont retournées
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('reference');
      expect(result).toHaveProperty('source');
    });
  });

  describe('getEvents', () => {
    it('devrait retourner les événements', async () => {
      const mockEvents = [
        { id: 1, title: 'Événement test' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      });

      const result = await getEvents();
      
      expect(result).toEqual(mockEvents);
    });

    it('devrait retourner les données fallback en cas d\'erreur', async () => {
      fetch.mockRejectedValueOnce(new Error('Erreur réseau'));

      const result = await getEvents();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getPhotos', () => {
    it('devrait retourner les photos', async () => {
      const mockPhotos = [
        { id: 1, src: '/test.jpg', title: 'Photo test' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotos,
      });

      const result = await getPhotos();
      
      expect(result).toEqual(mockPhotos);
    });

    it('devrait retourner les données fallback en cas d\'erreur', async () => {
      fetch.mockRejectedValueOnce(new Error('Erreur réseau'));

      const result = await getPhotos();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getResources', () => {
    it('devrait retourner les ressources', async () => {
      const mockResources = [
        { id: 1, title: 'Ressource test', type: 'document' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResources,
      });

      const result = await getResources();
      
      expect(result).toEqual(mockResources);
    });

    it('devrait retourner les données fallback en cas d\'erreur', async () => {
      fetch.mockRejectedValueOnce(new Error('Erreur réseau'));

      const result = await getResources();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
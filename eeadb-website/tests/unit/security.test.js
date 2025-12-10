/**
 * @jest-environment jsdom
 */
import { isValidEndpoint } from '../../src/lib/dataService';

describe('Sécurité - Validation des endpoints', () => {
  it('devrait valider les endpoints autorisés', () => {
    expect(isValidEndpoint('verset_du_jour.json')).toBe(true);
    expect(isValidEndpoint('events.json')).toBe(true);
    expect(isValidEndpoint('photos.json')).toBe(true);
    expect(isValidEndpoint('resources.json')).toBe(true);
  });

  it('devrait rejeter les endpoints non autorisés', () => {
    expect(isValidEndpoint('malicious_file.json')).toBe(false);
    expect(isValidEndpoint('../config')).toBe(false);
    expect(isValidEndpoint('verset_du_jour.json?malicious=true')).toBe(false);
    expect(isValidEndpoint('')).toBe(false);
    expect(isValidEndpoint(null)).toBe(false);
    expect(isValidEndpoint(undefined)).toBe(false);
  });
});
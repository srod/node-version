/*!
 * node-version
 * Copyright(c) 2011-2018 Rodolphe Stoclin
 * MIT Licensed
 */

describe('node-version', () => {
  let nodeVersion;

  beforeAll(() => {
    delete process.versions.node;
    process.versions.node = '10.0.0';
    nodeVersion = require('../index');
  });

  test('should be ok', () => {
    expect(nodeVersion).toBeTruthy();
  });

  test('should have original property', () => {
    expect(nodeVersion).toHaveProperty('original');
  });

  test('original value should be ok', () => {
    expect(nodeVersion.original).toBe('v10.0.0');
  });

  test('should have short property', () => {
    expect(nodeVersion).toHaveProperty('short');
  });

  test('short value should be ok', () => {
    expect(nodeVersion.short).toBe('10.0');
  });

  test('should have long property', () => {
    expect(nodeVersion).toHaveProperty('long');
  });

  test('long value should be ok', () => {
    expect(nodeVersion.long).toBe('10.0.0');
  });

  test('should have major property', () => {
    expect(nodeVersion).toHaveProperty('major');
  });

  test('major value should be ok', () => {
    expect(nodeVersion.major).toBe('10');
  });

  test('should have minor property', () => {
    expect(nodeVersion).toHaveProperty('minor');
  });

  test('minor value should be ok', () => {
    expect(nodeVersion.minor).toBe('0');
  });

  test('should have build property', () => {
    expect(nodeVersion).toHaveProperty('build');
  });

  test('build value should be ok', () => {
    expect(nodeVersion.build).toBe('0');
  });
});

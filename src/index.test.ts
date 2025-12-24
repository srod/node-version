/*!
 * node-version
 * Copyright(c) 2011-2025 Rodolphe Stoclin
 * MIT Licensed
 */

import { describe, expect, test, vi } from 'vitest';
import { getVersion, version } from './index.js';

vi.mock('node:process', () => ({
  versions: {
    node: '10.1.0'
  }
}));

const TARGET_NODE_MAJOR = '10';
const TARGET_NODE_MINOR = '1';
const TARGET_NODE_PATCH = '0';

describe('node-version', () => {
  test('should be ok', () => {
    expect(version).toBeTruthy();
    expect(getVersion()).toBeTruthy();
  });

  test('should have original property', () => {
    expect(version).toHaveProperty('original');
    expect(getVersion()).toHaveProperty('original');
  });

  test('original value should be ok', () => {
    const expected = `v${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`;
    expect(version.original).toBe(expected);
    expect(getVersion().original).toBe(expected);
  });

  test('should have short property', () => {
    expect(version).toHaveProperty('short');
  });

  test('short value should be ok', () => {
    const expected = `${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}`;
    expect(version.short).toBe(expected);
    expect(getVersion().short).toBe(expected);
  });

  test('should have long property', () => {
    expect(version).toHaveProperty('long');
  });

  test('long value should be ok', () => {
    const expected = `${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`;
    expect(version.long).toBe(expected);
    expect(getVersion().long).toBe(expected);
  });

  test('should have major property', () => {
    expect(version).toHaveProperty('major');
  });

  test('major value should be ok', () => {
    expect(version.major).toBe(TARGET_NODE_MAJOR);
    expect(getVersion().major).toBe(TARGET_NODE_MAJOR);
  });

  test('should have minor property', () => {
    expect(version).toHaveProperty('minor');
  });

  test('minor value should be ok', () => {
    expect(version.minor).toBe(TARGET_NODE_MINOR);
    expect(getVersion().minor).toBe(TARGET_NODE_MINOR);
  });

  test('should have build property', () => {
    expect(version).toHaveProperty('build');
  });

  test('build value should be ok', () => {
    expect(version.build).toBe(TARGET_NODE_PATCH);
    expect(getVersion().build).toBe(TARGET_NODE_PATCH);
  });

  test('all properties should be strings', () => {
    const v = getVersion();
    expect(typeof v.original).toBe('string');
    expect(typeof v.short).toBe('string');
    expect(typeof v.long).toBe('string');
    expect(typeof v.major).toBe('string');
    expect(typeof v.minor).toBe('string');
    expect(typeof v.build).toBe('string');
  });

  test('object should have exactly 6 properties', () => {
    expect(Object.keys(version)).toHaveLength(6);
    expect(Object.keys(getVersion())).toHaveLength(6);
  });

  test('original property should start with v', () => {
    expect(version.original).toMatch(/^v/);
  });

  test('numeric properties should be valid numbers', () => {
    const v = getVersion();
    expect(Number(v.major)).not.toBeNaN();
    expect(Number(v.minor)).not.toBeNaN();
    expect(Number(v.build)).not.toBeNaN();
  });

  test('short format should have exactly one dot', () => {
    const dots = version.short.split('.').length - 1;
    expect(dots).toBe(1);
  });

  test('long format should have exactly two dots', () => {
    const dots = version.long.split('.').length - 1;
    expect(dots).toBe(2);
  });

  test('long should equal original without v prefix', () => {
    expect(version.long).toBe(version.original.slice(1));
  });
});

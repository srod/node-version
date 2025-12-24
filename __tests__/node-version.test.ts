/*!
 * node-version
 * Copyright(c) 2011-2025 Rodolphe Stoclin
 * MIT Licensed
 */

import { describe, expect, test, vi } from 'vitest';
import { version } from '../src';

const TARGET_NODE_MAJOR = '10';
const TARGET_NODE_MINOR = '1';
const TARGET_NODE_PATCH = '0';

describe('node-version', () => {
  vi.mock('process', () => {
    return { versions: { node: '10.1.0' } };
  });

  test('should be ok', () => {
    expect(version).toBeTruthy();
  });

  test('should have original property', () => {
    expect(version).toHaveProperty('original');
  });

  test('original value should be ok', () => {
    expect(version.original).toBe(`v${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`);
  });

  test('should have short property', () => {
    expect(version).toHaveProperty('short');
  });

  test('short value should be ok', () => {
    expect(version.short).toBe(`${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}`);
  });

  test('should have long property', () => {
    expect(version).toHaveProperty('long');
  });

  test('long value should be ok', () => {
    expect(version.long).toBe(`${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`);
  });

  test('should have major property', () => {
    expect(version).toHaveProperty('major');
  });

  test('major value should be ok', () => {
    expect(version.major).toBe(TARGET_NODE_MAJOR);
  });

  test('should have minor property', () => {
    expect(version).toHaveProperty('minor');
  });

  test('minor value should be ok', () => {
    expect(version.minor).toBe(TARGET_NODE_MINOR);
  });

  test('should have build property', () => {
    expect(version).toHaveProperty('build');
  });

  test('build value should be ok', () => {
    expect(version.build).toBe(TARGET_NODE_PATCH);
  });
});

/*!
 * node-version
 * Copyright(c) 2011-2023 Rodolphe Stoclin
 * MIT Licensed
 */

import { describe, expect, test } from 'vitest';
import nodeVersion from '../src';

const TARGET_NODE_MAJOR = '14';
const TARGET_NODE_MINOR = '21';
const TARGET_NODE_PATCH = '1';

describe('node-version', () => {
  test('should be ok', () => {
    expect(nodeVersion).toBeTruthy();
  });

  test('should have original property', () => {
    expect(nodeVersion).toHaveProperty('original');
  });

  test('original value should be ok', () => {
    expect(nodeVersion.original).toBe(`v${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`);
  });

  test('should have short property', () => {
    expect(nodeVersion).toHaveProperty('short');
  });

  test('short value should be ok', () => {
    expect(nodeVersion.short).toBe(`${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}`);
  });

  test('should have long property', () => {
    expect(nodeVersion).toHaveProperty('long');
  });

  test('long value should be ok', () => {
    expect(nodeVersion.long).toBe(`${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`);
  });

  test('should have major property', () => {
    expect(nodeVersion).toHaveProperty('major');
  });

  test('major value should be ok', () => {
    expect(nodeVersion.major).toBe(TARGET_NODE_MAJOR);
  });

  test('should have minor property', () => {
    expect(nodeVersion).toHaveProperty('minor');
  });

  test('minor value should be ok', () => {
    expect(nodeVersion.minor).toBe(TARGET_NODE_MINOR);
  });

  test('should have build property', () => {
    expect(nodeVersion).toHaveProperty('build');
  });

  test('build value should be ok', () => {
    expect(nodeVersion.build).toBe(TARGET_NODE_PATCH);
  });
});

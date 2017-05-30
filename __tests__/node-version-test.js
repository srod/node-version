/*!
 * node-version
 * Copyright(c) 2011-2017 Rodolphe Stoclin
 * MIT Licensed
 */

'use strict';

describe('node-version', function() {
  test('should be ok', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toBeTruthy();
  });

  test('should have original property', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toHaveProperty('original');
  });

  test('should have short property', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toHaveProperty('short');
  });

  test('should have long property', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toHaveProperty('long');
  });

  test('should have major property', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toHaveProperty('major');
  });

  test('should have minor property', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toHaveProperty('minor');
  });

  test('should have build property', function() {
    var nodeVersion = require('../index');
    expect(nodeVersion).toHaveProperty('build');
  });
});

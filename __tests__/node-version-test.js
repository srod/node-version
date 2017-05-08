/*!
 * node-version
 * Copyright(c) 2011-2017 Rodolphe Stoclin
 * MIT Licensed
 */

'use strict';

describe('node-version', function() {
  beforeEach(function() {
    this.nodeVersion = require('../index');
  });

  test('should be ok', function() {
    expect(this.nodeVersion).toBeTruthy();
    expect(this.nodeVersion).toHaveProperty('original');
    expect(this.nodeVersion).toHaveProperty('short');
    expect(this.nodeVersion).toHaveProperty('long');
    expect(this.nodeVersion).toHaveProperty('major');
    expect(this.nodeVersion).toHaveProperty('minor');
    expect(this.nodeVersion).toHaveProperty('build');
  });
});

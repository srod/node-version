/*!
 * node-version
 * Copyright(c) 2011-2023 Rodolphe Stoclin
 * MIT Licensed
 */

import { versions } from 'node:process';

const nodeVersion = () => {
  const split = versions.node.split('.');

  return {
    original: `v${versions.node}`,
    short: `${split[0]}.${split[1]}`,
    long: versions.node,
    major: split[0],
    minor: split[1],
    build: split[2]
  };
};

/**
 * Expose `nodeVersion()`.
 */
nodeVersion.default = nodeVersion();
export = nodeVersion();

/*!
 * node-version
 * Copyright(c) 2011-2025 Rodolphe Stoclin
 * MIT Licensed
 */

import { versions } from 'node:process';

const getVersion = () => {
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
 * Expose `version`.
 */
export const version = getVersion();

/*!
 * node-version
 * Copyright(c) 2011-2025 Rodolphe Stoclin
 * MIT Licensed
 */

/**
 * Node version object.
 */
export interface NodeVersion {
  /**
   * The original version string, prefixed with 'v' (e.g., 'v20.0.0').
   */
  original: string;
  /**
   * The short version string, containing only major and minor (e.g., '20.0').
   */
  short: string;
  /**
   * The full version string (e.g., '20.0.0').
   */
  long: string;
  /**
   * The major version number as a string (e.g., '20').
   */
  major: string;
  /**
   * The minor version number as a string (e.g., '0').
   */
  minor: string;
  /**
   * The build/patch version number as a string (e.g., '0').
   */
  build: string;
}

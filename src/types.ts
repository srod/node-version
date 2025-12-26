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
    /**
     * Check if the current Node version is at least the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     */
    isAtLeast(version: string): boolean;
    /**
     * Check if the current Node version matches the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     */
    is(version: string): boolean;
    /**
     * Check if the current Node version is strictly greater than the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     */
    isAbove(version: string): boolean;
    /**
     * Check if the current Node version is strictly less than the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     */
    isBelow(version: string): boolean;
    /**
     * Check if the current Node version is at most the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     */
    isAtMost(version: string): boolean;
}

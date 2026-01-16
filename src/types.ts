/*!
 * node-version
 * Copyright(c) 2011-2026 Rodolphe Stoclin
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
     * @returns {boolean} True if current version >= target version.
     * @example
     * version.isAtLeast('18.0.0'); // true if current is 20.0.0
     */
    isAtLeast(version: string): boolean;
    /**
     * Check if the current Node version matches the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     * @returns {boolean} True if current version === target version.
     * @example
     * version.is('20.0.0'); // true if current is 20.0.0
     */
    is(version: string): boolean;
    /**
     * Check if the current Node version is strictly greater than the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     * @returns {boolean} True if current version > target version.
     * @example
     * version.isAbove('18.0.0'); // true if current is 20.0.0
     */
    isAbove(version: string): boolean;
    /**
     * Check if the current Node version is strictly less than the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     * @returns {boolean} True if current version < target version.
     * @example
     * version.isBelow('22.0.0'); // true if current is 20.0.0
     */
    isBelow(version: string): boolean;
    /**
     * Check if the current Node version is at most the specified version.
     * @param version The version to compare against (e.g., '20.0.0').
     * @returns {boolean} True if current version <= target version.
     * @example
     * version.isAtMost('22.0.0'); // true if current is 20.0.0
     */
    isAtMost(version: string): boolean;
    /**
     * Check if the current version is an LTS release.
     * @see https://github.com/nodejs/release#release-schedule
     */
    isLTS: boolean;
    /**
     * The LTS codename (e.g., 'Iron') if currently on an LTS release, otherwise undefined.
     * @see https://github.com/nodejs/release#release-schedule
     */
    ltsName: string | undefined;
    /**
     * Check if the current version is considered End-of-Life (EOL).
     * @see https://github.com/nodejs/release#end-of-life-releases
     */
    isEOL: boolean;
    /**
     * The date when this major version becomes End-of-Life.
     * Undefined if the EOL date is not known (e.g., for very old or future versions not yet in the map).
     * @see https://github.com/nodejs/release#release-schedule
     */
    eolDate: Date | undefined;
    /**
     * Returns the original version string.
     */
    toString(): string;
}

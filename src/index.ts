/*!
 * node-version
 * Copyright(c) 2011-2026 Rodolphe Stoclin
 * MIT Licensed
 */

import { release, versions } from "node:process";
import type { NodeVersion } from "./types.js";

export type { NodeVersion };

/**
 * End-of-Life dates for Node.js major versions.
 */
export const EOL_DATES: Record<string, string> = {
    "18": "2025-04-30",
    "20": "2026-04-30",
    "22": "2027-04-30",
    "24": "2028-04-30",
};

/**
 * Check if a major version is EOL.
 */
const checkEOL = (major: string): boolean => {
    const eolDate = EOL_DATES[major];
    if (!eolDate) return false;
    return new Date() > new Date(eolDate);
};

/**
 * Get Node current version.
 *
 * @returns {NodeVersion} An object containing detailed version information, comparisons, and LTS/EOL status.
 *
 * @example
 * import { version } from 'node-version';
 * console.log(version.original); // 'v20.10.0'
 * if (version.isLTS) {
 *   console.log('Running on LTS!');
 * }
 */
export const getVersion = (): NodeVersion => {
    const nodeVersion = versions?.node ?? "0.0.0";
    const split = nodeVersion.split(".");
    // Pre-calculate numeric version parts for faster comparison
    const nodeVersionParts = split.map((s) => Number(s) || 0);
    const major = split[0] || "0";
    const eolString = EOL_DATES[major];

    /**
     * Compare the current node version with a target version string.
     */
    const compareTo = (target: string): number => {
        const len = target.length;
        if (len === 0) return NaN;

        // Check for whitespace (equivalent to target !== target.trim())
        // ASCII space is 32. We check if start or end characters are whitespace.
        const first = target.charCodeAt(0);
        const last = target.charCodeAt(len - 1);
        if (first <= 32 || last <= 32) {
            return NaN;
        }

        let start = 0;
        // Handle 'v' or 'V' prefix
        if (first === 118 || first === 86) {
            start = 1;
            if (len === 1) return NaN;
        }

        let p1 = 0; // index in nodeVersionParts
        let current = 0;
        let hasDigit = false;

        let result = 0;
        let determined = false;

        for (let i = start; i < len; i++) {
            const code = target.charCodeAt(i);

            if (code >= 48 && code <= 57) {
                // 0-9
                if (!determined) {
                    current = current * 10 + (code - 48);
                }
                hasDigit = true;
            } else if (code === 46) {
                // .
                if (!hasDigit) return NaN; // Empty segment or starting with dot

                if (!determined) {
                    // Compare with node version part
                    const n1 = nodeVersionParts[p1] || 0;
                    if (n1 > current) {
                        result = 1;
                        determined = true;
                    } else if (n1 < current) {
                        result = -1;
                        determined = true;
                    }
                }

                current = 0;
                hasDigit = false;
                p1++;
            } else {
                return NaN; // Invalid character
            }
        }

        if (!hasDigit) return NaN; // Trailing dot or empty last segment

        if (!determined) {
            // Compare last segment
            const n1 = nodeVersionParts[p1] || 0;
            if (n1 > current) return 1;
            if (n1 < current) return -1;
            p1++;

            // Check remaining node parts
            for (; p1 < nodeVersionParts.length; p1++) {
                if (nodeVersionParts[p1] > 0) return 1;
            }
            return 0;
        }

        return result;
    };

    return {
        original: `v${nodeVersion}`,
        short: `${split[0] || "0"}.${split[1] || "0"}`,
        long: nodeVersion,
        major: major,
        minor: split[1] || "0",
        build: split[2] || "0",
        isAtLeast: (version: string): boolean => {
            return compareTo(version) >= 0;
        },
        is: (version: string): boolean => {
            return nodeVersion === version;
        },
        isAbove: (version: string): boolean => {
            return compareTo(version) > 0;
        },
        isBelow: (version: string): boolean => {
            return compareTo(version) < 0;
        },
        isAtMost: (version: string): boolean => {
            return compareTo(version) <= 0;
        },
        isLTS: !!release.lts,
        ltsName: String(release.lts || "") || undefined,
        isEOL: checkEOL(major),
        eolDate: eolString ? new Date(eolString) : undefined,
        toString: () => `v${nodeVersion}`,
    };
};

/**
 * Node version information.
 */
export const version: NodeVersion = getVersion();

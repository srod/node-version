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

        let start = 0;
        // Handle optional 'v' or 'V' prefix
        const c = target.charCodeAt(0);
        if (c === 118 || c === 86) {
            start = 1;
            if (start === len) return NaN;
        }

        let val = 0;
        let segmentIdx = 0;
        let hasDigits = false;
        let result = 0;

        for (let i = start; i < len; i++) {
            const code = target.charCodeAt(i);

            // '.' (dot)
            if (code === 46) {
                if (!hasDigits) return NaN; // Empty segment

                if (result === 0) {
                    const n1 = nodeVersionParts[segmentIdx] || 0;
                    if (n1 > val) {
                        result = 1;
                    } else if (n1 < val) {
                        result = -1;
                    }
                }

                // Reset for next segment
                val = 0;
                hasDigits = false;
                segmentIdx++;
                continue;
            }

            // '0'-'9'
            if (code >= 48 && code <= 57) {
                val = val * 10 + (code - 48);
                hasDigits = true;
                continue;
            }

            // Invalid character
            return NaN;
        }

        // Check last segment
        if (!hasDigits) return NaN; // Trailing dot

        if (result === 0) {
            const n1 = nodeVersionParts[segmentIdx] || 0;
            if (n1 > val) {
                result = 1;
            } else if (n1 < val) {
                result = -1;
            }
        }

        segmentIdx++;

        // Check for remaining node version parts
        if (result === 0) {
            while (segmentIdx < nodeVersionParts.length) {
                if (nodeVersionParts[segmentIdx] > 0) return 1;
                segmentIdx++;
            }
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

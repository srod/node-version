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
        // Optimization: Avoid allocations for trim() and regex
        const len = target.length;
        if (len === 0) return NaN;

        // Check for whitespace at start or end
        const firstChar = target.charCodeAt(0);
        const lastChar = target.charCodeAt(len - 1);
        if (firstChar <= 32 || lastChar <= 32) return NaN;

        // Handle 'v' prefix
        let start = 0;
        if (firstChar === 118 || firstChar === 86) { // 'v' or 'V'
            start = 1;
            if (len === 1) return NaN; // Just "v"
        }

        // Iterate manually to parse segments
        let segmentVal = 0;
        let segmentStart = start;
        let partIndex = 0;
        let result = 0;
        let determined = false;

        for (let i = start; i <= len; i++) {
            const charCode = i < len ? target.charCodeAt(i) : 46; // Use dot for end of string to trigger flush

            if (charCode === 46) { // '.'
                if (i === segmentStart) return NaN; // Empty segment (e.g. "..")

                if (!determined) {
                    const n1 = nodeVersionParts[partIndex] || 0;
                    const n2 = segmentVal;

                    if (n1 > n2) {
                        result = 1;
                        determined = true;
                    } else if (n1 < n2) {
                        result = -1;
                        determined = true;
                    }
                    partIndex++;
                }

                segmentVal = 0;
                segmentStart = i + 1;
            } else if (charCode >= 48 && charCode <= 57) { // '0'-'9'
                segmentVal = segmentVal * 10 + (charCode - 48);
            } else {
                return NaN; // Invalid character
            }
        }

        if (determined) {
            return result;
        }

        // If not determined, we processed all parts of target and they matched node parts so far.
        // We need to check if nodeVersion has more non-zero parts.
        // But wait, the previous loop increments partIndex.

        // Example 1: Node="20.10.1", Target="20.10"
        // Loop processed 20 (match), 10 (match). partIndex is 2.
        // We need to check nodeVersionParts[2] which is 1.

        // Example 2: Node="20.10", Target="20.10.1"
        // Loop processed 20 (match), 10 (match). partIndex is 2.
        // Loop processed 1.
        // nodeVersionParts[2] is 0 (undefined->0). Target segment is 1.
        // 0 < 1 => result = -1. determined=true.
        // So this case is handled inside the loop IF nodeVersionParts returns 0 for out of bounds.
        // nodeVersionParts is array of numbers. nodeVersionParts[partIndex] || 0 is used.
        // So yes, it handles Target being longer.

        // So we only need to handle Node being longer.
        if (partIndex < nodeVersionParts.length) {
             for (let k = partIndex; k < nodeVersionParts.length; k++) {
                const n1 = nodeVersionParts[k];
                if (n1 > 0) return 1;
                if (n1 < 0) return -1;
             }
        }

        return 0;
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

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
        let i = 0;
        const len = target.length;
        if (len === 0) return NaN;

        // Skip leading 'v' or 'V'
        const c0 = target.charCodeAt(0);
        if (c0 === 118 || c0 === 86) {
            // v or V
            i++;
        }

        // If string was just "v", return NaN (stripped length 0 check)
        if (i === len) return NaN;

        let result = 0;
        let p = 0; // index in nodeVersionParts

        let val = 0;
        let hasDigits = false;

        for (; i < len; i++) {
            const code = target.charCodeAt(i);

            if (code === 46) {
                // dot
                if (!hasDigits) return NaN; // Empty segment or leading dot e.g. ".1" or "1..2"

                // Compare segment
                const n1 = nodeVersionParts[p] || 0;
                const n2 = val;

                if (result === 0) {
                    if (n1 > n2) result = 1;
                    else if (n1 < n2) result = -1;
                }

                p++;
                val = 0;
                hasDigits = false;
            } else if (code >= 48 && code <= 57) {
                // 0-9
                val = val * 10 + (code - 48);
                hasDigits = true;
            } else {
                // Invalid character (including whitespace, letters, etc.)
                return NaN;
            }
        }

        // Process last segment
        if (!hasDigits) return NaN; // Trailing dot "1.2."

        const n1 = nodeVersionParts[p] || 0;
        const n2 = val;

        if (result === 0) {
            if (n1 > n2) result = 1;
            else if (n1 < n2) result = -1;
        }
        p++;

        // Check remaining node parts
        for (; p < nodeVersionParts.length; p++) {
            const n1 = nodeVersionParts[p] || 0;
            if (result === 0) {
                if (n1 > 0) result = 1;
                // n2 is 0 implicitly
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

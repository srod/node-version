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

        let index = 0;
        // Check for 'v' or 'V' prefix
        const code0 = target.charCodeAt(0);
        if (code0 === 118 || code0 === 86) {
            // 'v' or 'V'
            index++;
            if (index === len) return NaN; // "v" is invalid
        }

        let currentPart = 0;
        let partIndex = 0;
        let hasDigits = false;
        let result = 0; // 0 = equal, 1 = node > target, -1 = node < target
        const nodePartsLen = nodeVersionParts.length;

        for (; index < len; index++) {
            const code = target.charCodeAt(index);

            if (code >= 48 && code <= 57) {
                // '0'-'9'
                hasDigits = true;
                currentPart = currentPart * 10 + (code - 48);
            } else if (code === 46) {
                // '.'
                if (!hasDigits) return NaN; // Empty segment (e.g. "1..2" or ".1")

                if (result === 0) {
                    const nodePart = partIndex < nodePartsLen ? nodeVersionParts[partIndex] : 0;
                    if (nodePart > currentPart) result = 1;
                    else if (nodePart < currentPart) result = -1;
                }

                currentPart = 0;
                hasDigits = false;
                partIndex++;
            } else {
                return NaN; // Invalid character (whitespace, letters, etc.)
            }
        }

        if (!hasDigits) return NaN; // Trailing dot (e.g. "1.")

        // Compare the last segment
        if (result === 0) {
            const nodePart = partIndex < nodePartsLen ? nodeVersionParts[partIndex] : 0;
            if (nodePart > currentPart) result = 1;
            else if (nodePart < currentPart) result = -1;
        }

        partIndex++;

        if (result === 0) {
            for (; partIndex < nodePartsLen; partIndex++) {
                const nodePart = nodeVersionParts[partIndex];
                if (nodePart > 0) return 1;
                if (nodePart < 0) return -1;
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

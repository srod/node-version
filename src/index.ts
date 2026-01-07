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

        // Verify no leading/trailing whitespace
        if (target.charCodeAt(0) <= 32 || target.charCodeAt(len - 1) <= 32) {
            if (target !== target.trim()) return NaN;
        }

        let start = 0;
        // Strip 'v' or 'V' prefix
        const c0 = target.charCodeAt(0);
        if (c0 === 118 || c0 === 86) {
            start = 1;
        }

        if (start >= len) return NaN;

        // Manual version parsing
        const targetParts: number[] = [];
        let segmentStart = start;
        let hasDigit = false;

        for (let i = start; i < len; i++) {
            const code = target.charCodeAt(i);
            if (code === 46) {
                // Dot separator
                if (i === segmentStart) return NaN; // Empty segment or leading dot
                if (!hasDigit) return NaN; // Segment with no digits? handled below
                targetParts.push(Number(target.slice(segmentStart, i)));
                segmentStart = i + 1;
                hasDigit = false;
            } else if (code >= 48 && code <= 57) {
                // Digit 0-9
                hasDigit = true;
            } else {
                // Invalid character
                return NaN;
            }
        }

        // Handle last segment
        if (segmentStart === len) return NaN; // Trailing dot
        if (!hasDigit) {
            // Check if last segment was empty or non-digit (already checked in loop but ensuring consistency)
            return NaN;
        }
        targetParts.push(Number(target.slice(segmentStart)));

        const maxLen = Math.max(nodeVersionParts.length, targetParts.length);

        for (let i = 0; i < maxLen; i++) {
            const n1 = nodeVersionParts[i] || 0;
            const n2 = targetParts[i] || 0;
            if (n1 > n2) return 1;
            if (n1 < n2) return -1;
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

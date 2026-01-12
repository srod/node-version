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
 * @see https://github.com/nodejs/release#end-of-life-releases
 */
export const EOL_DATES: Record<string, string> = {
    // Odd versions (EOL dates)
    "19": "2023-06-01",
    "21": "2024-06-01",
    "23": "2025-06-01",
    "25": "2026-06-01",
    // Even versions (LTS EOL dates)
    "12": "2022-04-30",
    "14": "2023-04-30",
    "16": "2023-09-11",
    "18": "2025-04-30",
    "20": "2026-04-30",
    "22": "2027-04-30",
    "24": "2028-04-30",
};

/**
 * Check if a major version is EOL.
 * Any version below 12 is automatically considered EOL.
 */
const checkEOL = (major: string): boolean => {
    // Hard check for very old versions
    if (Number(major) < 12) {
        return true;
    }

    const eolDate = EOL_DATES[major];
    // If we have a date, check against it
    if (eolDate) {
        return new Date() > new Date(eolDate);
    }

    // If no date found and it's not < 12, we default to false
    // (It might be a very new version like 26, or a weird version)
    return false;
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
        if (target !== target.trim() || target.length === 0) {
            return NaN;
        }

        const stripped = target.replace(/^v/i, "");

        if (stripped.length === 0) {
            return NaN;
        }

        const s2 = stripped.split(".");

        for (const segment of s2) {
            if (segment === "" || !/^\d+$/.test(segment)) {
                return NaN;
            }
        }

        const len = Math.max(nodeVersionParts.length, s2.length);

        for (let i = 0; i < len; i++) {
            const n1 = nodeVersionParts[i] || 0;
            const n2 = Number(s2[i]) || 0;
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

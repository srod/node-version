/*!
 * node-version
 * Copyright(c) 2011-2026 Rodolphe Stoclin
 * MIT Licensed
 */

import { release, versions } from "node:process";
import type { NodeVersion } from "./types.js";

export type { NodeVersion };

/**
 * Get Node current version.
 */
export const getVersion = (): NodeVersion => {
    const nodeVersion = versions?.node ?? "0.0.0";
    const split = nodeVersion.split(".");
    // Pre-calculate numeric version parts for faster comparison
    const nodeVersionParts = split.map((s) => Number(s) || 0);

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
        major: split[0] || "0",
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
        isEOL: checkEOL(split[0] || "0"),
        toString: () => `v${nodeVersion}`,
    };
};

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
 * Node version information.
 */
export const version: NodeVersion = getVersion();

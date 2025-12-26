/*!
 * node-version
 * Copyright(c) 2011-2025 Rodolphe Stoclin
 * MIT Licensed
 */

import { versions } from "node:process";
import type { NodeVersion } from "./types.js";

export type { NodeVersion };

/**
 * Get Node current version.
 */
export const getVersion = (): NodeVersion => {
    const nodeVersion = versions?.node ?? "0.0.0";
    const split = nodeVersion.split(".");

    return {
        original: `v${nodeVersion}`,
        short: `${split[0] || "0"}.${split[1] || "0"}`,
        long: nodeVersion,
        major: split[0] || "0",
        minor: split[1] || "0",
        build: split[2] || "0",
        isAtLeast: (version: string): boolean => {
            return compareVersions(nodeVersion, version) >= 0;
        },
        is: (version: string): boolean => {
            return nodeVersion === version;
        },
        isAbove: (version: string): boolean => {
            return compareVersions(nodeVersion, version) > 0;
        },
        isBelow: (version: string): boolean => {
            return compareVersions(nodeVersion, version) < 0;
        },
        isAtMost: (version: string): boolean => {
            return compareVersions(nodeVersion, version) <= 0;
        },
    };
};

/**
 * Compare two version strings.
 * Returns 1 if v1 > v2, -1 if v1 < v2, and 0 if v1 === v2.
 */
const compareVersions = (v1: string, v2: string): number => {
    const s1 = v1.split(".");
    const s2 = v2.split(".");
    const len = Math.max(s1.length, s2.length);

    for (let i = 0; i < len; i++) {
        const n1 = Number(s1[i] || 0);
        const n2 = Number(s2[i] || 0);
        if (n1 > n2) return 1;
        if (n1 < n2) return -1;
    }

    return 0;
};

/**
 * Node version information.
 */
export const version: NodeVersion = getVersion();

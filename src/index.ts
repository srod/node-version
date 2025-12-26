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
            const v = version.split(".");
            const n = nodeVersion.split(".");
            const len = Math.max(v.length, n.length);
            for (let i = 0; i < len; i++) {
                const vNum = Number(v[i] || 0);
                const nNum = Number(n[i] || 0);
                if (nNum > vNum) return true;
                if (nNum < vNum) return false;
            }
            return true;
        },
        is: (version: string): boolean => {
            return nodeVersion === version;
        },
    };
};

/**
 * Node version information.
 */
export const version: NodeVersion = getVersion();

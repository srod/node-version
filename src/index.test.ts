/*!
 * node-version
 * Copyright(c) 2011-2026 Rodolphe Stoclin
 * MIT Licensed
 */

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { versions as realVersions } from "node:process";
import { EOL_DATES, getVersion, version } from "./index.js";

const { mockVersion, mockRelease } = vi.hoisted(() => ({
    mockVersion: { node: "10.1.0" },
    mockRelease: { lts: "Dubnium" },
}));

vi.mock("node:process", () => ({
    versions: mockVersion,
    release: mockRelease,
}));

const TARGET_NODE_MAJOR = "10";
const TARGET_NODE_MINOR = "1";
const TARGET_NODE_PATCH = "0";

describe("node-version", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("should be ok", () => {
        expect(version).toBeTruthy();
        expect(getVersion()).toBeTruthy();
    });

    test("should have original property", () => {
        expect(version).toHaveProperty("original");
        expect(getVersion()).toHaveProperty("original");
    });

    test("original value should be ok", () => {
        const expected = `v${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`;
        expect(version.original).toBe(expected);
        expect(getVersion().original).toBe(expected);
    });

    test("should have short property", () => {
        expect(version).toHaveProperty("short");
    });

    test("short value should be ok", () => {
        const expected = `${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}`;
        expect(version.short).toBe(expected);
        expect(getVersion().short).toBe(expected);
    });

    test("should have long property", () => {
        expect(version).toHaveProperty("long");
    });

    test("long value should be ok", () => {
        const expected = `${TARGET_NODE_MAJOR}.${TARGET_NODE_MINOR}.${TARGET_NODE_PATCH}`;
        expect(version.long).toBe(expected);
        expect(getVersion().long).toBe(expected);
    });

    test("should have major property", () => {
        expect(version).toHaveProperty("major");
    });

    test("major value should be ok", () => {
        expect(version.major).toBe(TARGET_NODE_MAJOR);
        expect(getVersion().major).toBe(TARGET_NODE_MAJOR);
    });

    test("should have minor property", () => {
        expect(version).toHaveProperty("minor");
    });

    test("minor value should be ok", () => {
        expect(version.minor).toBe(TARGET_NODE_MINOR);
        expect(getVersion().minor).toBe(TARGET_NODE_MINOR);
    });

    test("should have build property", () => {
        expect(version).toHaveProperty("build");
    });

    test("build value should be ok", () => {
        expect(version.build).toBe(TARGET_NODE_PATCH);
        expect(getVersion().build).toBe(TARGET_NODE_PATCH);
    });

    test("all properties should be strings", () => {
        const v = getVersion();
        expect(typeof v.original).toBe("string");
        expect(typeof v.short).toBe("string");
        expect(typeof v.long).toBe("string");
        expect(typeof v.major).toBe("string");
        expect(typeof v.minor).toBe("string");
        expect(typeof v.build).toBe("string");
    });

    test("object should have exactly 16 properties", () => {
        expect(Object.keys(version)).toHaveLength(16);
        expect(Object.keys(getVersion())).toHaveLength(16);
    });

    test("original property should start with v", () => {
        expect(version.original).toMatch(/^v/);
    });

    test("numeric properties should be valid numbers", () => {
        const v = getVersion();
        expect(Number(v.major)).not.toBeNaN();
        expect(Number(v.minor)).not.toBeNaN();
        expect(Number(v.build)).not.toBeNaN();
    });

    test("short format should have exactly one dot", () => {
        const dots = version.short.split(".").length - 1;
        expect(dots).toBe(1);
    });

    test("long format should have exactly two dots", () => {
        const dots = version.long.split(".").length - 1;
        expect(dots).toBe(2);
    });

    test("long should equal original without v prefix", () => {
        expect(version.long).toBe(version.original.slice(1));
    });

    test("toString should return original version", () => {
        expect(version.toString()).toBe(version.original);
        expect(String(version)).toBe(version.original);
    });

    describe("robustness", () => {
        test("should handle malformed version string", () => {
            mockVersion.node = "10";
            const v = getVersion();
            expect(v.major).toBe("10");
            expect(v.minor).toBe("0");
            expect(v.build).toBe("0");
            expect(v.short).toBe("10.0");
            mockVersion.node = "10.1.0"; // reset
        });

        test("should handle missing versions.node", () => {
            // @ts-expect-error
            mockVersion.node = undefined;
            const v = getVersion();
            expect(v.major).toBe("0");
            expect(v.long).toBe("0.0.0");
            // Branch coverage for isAtLeast with undefined nodeVersion
            expect(v.isAtLeast("1.0.0")).toBe(false);
            mockVersion.node = "10.1.0"; // reset
        });

        test("should handle empty version string", () => {
            mockVersion.node = "";
            const v = getVersion();
            expect(v.major).toBe("0");
            expect(v.minor).toBe("0");
            expect(v.build).toBe("0");
            expect(v.short).toBe("0.0");
            // Branch coverage for isAtLeast with empty nodeVersion
            expect(v.isAtLeast("0.0.1")).toBe(false);
            mockVersion.node = "10.1.0"; // reset
        });
    });

    describe("comparison", () => {
        test("isAtLeast should return true for lower version", () => {
            expect(version.isAtLeast("9.0.0")).toBe(true);
            expect(version.isAtLeast("10.0.0")).toBe(true);
            expect(version.isAtLeast("10.0.9")).toBe(true); // 10.1.0 > 10.0.9
        });

        test("isAtLeast should return true for equal version", () => {
            expect(version.isAtLeast("10.1.0")).toBe(true);
        });

        test("isAtLeast should return false for higher version", () => {
            expect(version.isAtLeast("10.1.1")).toBe(false);
            expect(version.isAtLeast("10.2.0")).toBe(false);
            expect(version.isAtLeast("11.0.0")).toBe(false);
        });

        test("isAtLeast should handle partial versions", () => {
            expect(version.isAtLeast("10")).toBe(true);
            expect(version.isAtLeast("10.1")).toBe(true);
            expect(version.isAtLeast("10.2")).toBe(false);
        });

        test("isAtLeast should handle longer target versions", () => {
            // Node 10.1.0 vs 10.1.0.1 (hypothetical)
            expect(version.isAtLeast("10.1.0.1")).toBe(false);
        });

        test("is should return true for equal version", () => {
            expect(version.is("10.1.0")).toBe(true);
        });

        test("is should return false for different version", () => {
            expect(version.is("10.1.1")).toBe(false);
            expect(version.is("11.0.0")).toBe(false);
        });

        test("isAbove should return true for strictly lower version", () => {
            expect(version.isAbove("9.0.0")).toBe(true);
            expect(version.isAbove("10.0.9")).toBe(true);
        });

        test("isAbove should return false for equal version", () => {
            expect(version.isAbove("10.1.0")).toBe(false);
        });

        test("isAbove should return false for higher version", () => {
            expect(version.isAbove("10.2.0")).toBe(false);
        });

        test("isBelow should return true for strictly higher version", () => {
            expect(version.isBelow("11.0.0")).toBe(true);
            expect(version.isBelow("10.2.0")).toBe(true);
        });

        test("isBelow should return false for equal version", () => {
            expect(version.isBelow("10.1.0")).toBe(false);
        });

        test("isBelow should return false for lower version", () => {
            expect(version.isBelow("9.0.0")).toBe(false);
        });

        test("isAtMost should return true for higher version", () => {
            expect(version.isAtMost("11.0.0")).toBe(true);
            expect(version.isAtMost("10.2.0")).toBe(true);
        });

        test("isAtMost should return true for equal version", () => {
            expect(version.isAtMost("10.1.0")).toBe(true);
        });

        test("isAtMost should return false for lower version", () => {
            expect(version.isAtMost("9.0.0")).toBe(false);
        });

        test("should handle 'v' prefix in comparisons", () => {
            // nodeVersion is "10.1.0"
            expect(version.isAtLeast("v10.1.0")).toBe(true);
            expect(version.is("v10.1.0")).toBe(false); // is() is strict string equality
            expect(version.isAbove("v10.0.0")).toBe(true);
            expect(version.isBelow("v10.2.0")).toBe(true);

            // Critical security test case: ensure v11 (higher) is correctly identified as higher
            // Previously might have failed if 'v' caused NaN comparison issues
            expect(version.isBelow("v11.0.0")).toBe(true);
            expect(version.isAtLeast("v11.0.0")).toBe(false);
        });
    });

    describe("lts and eol", () => {
        test("should identify non-LTS version", () => {
            // @ts-expect-error
            mockRelease.lts = undefined;
            const v = getVersion();
            expect(v.isLTS).toBe(false);
            expect(v.ltsName).toBeUndefined();
        });

        test("should identify LTS version", () => {
            mockRelease.lts = "Iron";
            const v = getVersion();
            expect(v.isLTS).toBe(true);
            expect(v.ltsName).toBe("Iron");
        });

        test("should check EOL status for future EOL", () => {
            vi.setSystemTime(new Date("2024-01-01"));
            mockVersion.node = "20.10.0";
            const v = getVersion();
            expect(v.isEOL).toBe(false);
        });

        test("should check EOL status for past EOL", () => {
            vi.setSystemTime(new Date("2027-01-01"));
            mockVersion.node = "20.10.0"; // EOL is 2026-04-30
            const v = getVersion();
            expect(v.isEOL).toBe(true);
        });

        test("should handle unknown EOL version", () => {
            mockVersion.node = "99.0.0";
            const v = getVersion();
            expect(v.isEOL).toBe(false);
        });

        test("should return true for very old version (Node 16)", () => {
            mockVersion.node = "16.0.0";
            const v = getVersion();
            expect(v.isEOL).toBe(true);
        });

        test("should return true for very old version (Node 0.10)", () => {
            mockVersion.node = "0.10.0";
            const v = getVersion();
            expect(v.isEOL).toBe(true);
        });

        test("should handle version 18 EOL", () => {
            vi.setSystemTime(new Date("2025-05-01"));
            mockVersion.node = "18.0.0"; // EOL is 2025-04-30
            const v = getVersion();
            expect(v.isEOL).toBe(true);
        });

        test("should have current running node major in EOL_DATES if even", () => {
            const currentMajor = (realVersions.node || "").split(".")[0] || "0";
            const isEven = Number(currentMajor) % 2 === 0;

            if (isEven) {
                expect(EOL_DATES).toHaveProperty(currentMajor);
            }
        });

        test("should have eolDate property", () => {
            mockVersion.node = "20.10.0";
            const v = getVersion();
            expect(v.eolDate).toBeDefined();
            expect(v.eolDate).toBeInstanceOf(Date);
            expect(v.eolDate?.toISOString().split("T")[0]).toBe("2026-04-30");
        });

        test("should have undefined eolDate for unknown version", () => {
            mockVersion.node = "99.0.0";
            const v = getVersion();
            expect(v.eolDate).toBeUndefined();
        });
    });
});

import { describe, expect, test, vi } from "vitest";
import { getVersion } from "./index.js";

// We mock process.versions to control the "current" version
const { mockVersion } = vi.hoisted(() => ({
    mockVersion: { node: "20.0.0" },
}));

vi.mock("node:process", () => ({
    versions: mockVersion,
    release: {},
}));

describe("security fixes", () => {
    test("should treat multiple 'v' prefixes as valid version if numeric part follows", () => {
        // Current: 20.0.0
        // Target: vv99.0.0
        // With robust stripping: "vv99.0.0" -> "99.0.0".
        // Comparison: 20 < 99.
        // isAtLeast("vv99.0.0") should be false.
        const v = getVersion();
        expect(v.isAtLeast("vv99.0.0")).toBe(false);
        // However, isBelow should now be true because it's a valid version comparison
        expect(v.isBelow("vv99.0.0")).toBe(true);
    });

    test("should return false (fail-closed) for excessively long version strings", () => {
        const v = getVersion();
        const longString = `1.${"1.".repeat(500)}`; // > 256 chars
        expect(v.isAtLeast(longString)).toBe(false);
        expect(v.isBelow(longString)).toBe(false);
    });

    test("should treat invalid strings as non-match (fail-closed)", () => {
        // Current: 20.0.0
        // Target: "garbage"
        // Before fix: NaN -> 0.0.0. Result: 20 > 0 -> true.
        // After fix: Returns false for all comparisons.
        const v = getVersion();

        expect(v.isAtLeast("garbage")).toBe(false);
        expect(v.isBelow("garbage")).toBe(false);
        expect(v.isAbove("garbage")).toBe(false);
        expect(v.isAtMost("garbage")).toBe(false);
    });

    test("should reject malformed version strings", () => {
        const v = getVersion();

        expect(v.isAtLeast("")).toBe(false);
        expect(v.isAtLeast("v")).toBe(false);
        expect(v.isAtLeast("10.garbage.0")).toBe(false);
        expect(v.isAtLeast("10.0.garbage")).toBe(false);
        expect(v.isAtLeast(" 10.0.0")).toBe(false);
        expect(v.isAtLeast("10.0.0 ")).toBe(false);
        expect(v.isAtLeast(" 10.0.0 ")).toBe(false);
    });

    test("should handle 'version X' strings correctly", () => {
        const v = getVersion();
        // "version 99" -> parsed as NaN -> returns false
        expect(v.isAtLeast("version 99")).toBe(false);
    });

    test("should still handle valid versions with v prefix", () => {
        const v = getVersion();
        expect(v.isAtLeast("v10.0.0")).toBe(true);
        expect(v.isAtLeast("v20.0.0")).toBe(true);
        expect(v.isBelow("v30.0.0")).toBe(true);
    });

    test("should still handle valid versions without v prefix", () => {
        const v = getVersion();
        expect(v.isAtLeast("10.0.0")).toBe(true);
    });
});

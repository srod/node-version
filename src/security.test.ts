
import { describe, expect, test } from "vitest";
import { getVersion } from "./index.js";

describe("security robustness", () => {
    test("should throw error when comparing against malformed version string", () => {
        const v = getVersion();

        // These inputs contain non-numeric segments which are invalid semver
        const invalidInputs = [
            "1.a.1",
            "foo.bar.baz",
            "1.2.c",
            "10.0.NaN"
        ];

        invalidInputs.forEach(input => {
            expect(() => v.isAtLeast(input)).toThrow(/Invalid version string/);
            expect(() => v.isAbove(input)).toThrow(/Invalid version string/);
            expect(() => v.isBelow(input)).toThrow(/Invalid version string/);
            expect(() => v.isAtMost(input)).toThrow(/Invalid version string/);
        });
    });

    test("should validate even valid looking but non-numeric segments properly", () => {
         const v = getVersion();
         // "Infinity" is technically a number in JS but invalid in version string usually
         // But Number("Infinity") is Infinity.
         // Standard semver is X.Y.Z where X,Y,Z are non-negative integers.
         // We might want to be strict about integer parsing.

         // For now, let's stick to preventing NaN which was the primary issue.
         // If "Infinity" passes Number(), it might break logic too.

         expect(() => v.isAtLeast("1.Infinity.0")).toThrow();
    });
});

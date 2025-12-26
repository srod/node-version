import { defineConfig } from "tsdown";

export default defineConfig({
    entry: "src/index.ts",
    format: ["esm"],
    dts: true,
    clean: true,
    sourcemap: true,
    outExtensions({ format }) {
        if (format === "es") return { js: ".js", dts: ".d.ts" };
    },
});

import { defineConfig } from "rollup";
import copy from "rollup-plugin-copy";

export default defineConfig({
  input: ["modules/index.js", "modules/scale/color.js"],
  output: {
    dir: "build",
    format: "esm",
    entryFileNames: (chunk) => `${chunk.name === "index" ? "vepr" : chunk.name}.js`,
  },
  plugins: [
    copy({
      targets: [
        { src: ["LICENSE", "README.md"], dest: "build" },
        { src: ["package.json"], dest: "build", transform: generatePkg },
      ],
    }),
  ],
});

function generatePkg(contents) {
  let pkg = JSON.parse(contents.toString());
  let newPkg = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    license: pkg.license,
    author: pkg.author,
    homepage: pkg.homepage,
    repository: pkg.repository,
    type: "module",
    main: "./vepr.js",
    module: "./vepr.js",
    exports: {
      ".": "./vepr.js",
      "./color": "./color.js",
    },
    types: "./vepr.d.ts",
    files: ["*.js", "*.d.ts"],
    sideEffects: false,
    keywords: pkg.keywords,
    dependencies: pkg.dependencies,
    peerDependencies: pkg.peerDependencies,
  };
  return JSON.stringify(newPkg, null, 2);
}

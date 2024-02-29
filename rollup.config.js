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
        { src: ["LICENSE"], dest: "build" },
        { src: ["README.md"], dest: "build", transform: generateReadme },
        { src: ["package.json"], dest: "build", transform: generatePkg },
      ],
    }),
  ],
});

function generateReadme(contents) {
  return `
# 🐗 Vepr

_Vepr is a JavaScript library for exploratory data visualization._

Vepr implements special protocol that allows declaring complex data
visualizations in a scheme with small footprint and being able to transfer the
visualization to different environment (e.g. server → browser, web worker → main
thread).

Vepr can be installed using NPM:

    npm install vepr

And used as a node module:

    import { render, blueprint, dot } from "vepr";

Or accessed via CDNs like unpkg.com or esm.sh right in the browser environment:

    <script type="module">
      import { render, blueprint, dot } from "https://unpkg.com/vepr@0.0.0";
    </script>

Out of the box Vepr includes typing declarations for TypeScript (or TS Language
Server, thus can be leveraged in JS-only environment as well).
`.trimStart();
}

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

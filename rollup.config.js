import copy from "rollup-plugin-copy";

export default {
  input: ["modules/index.js"],
  output: { file: "build/vepr.js", format: "esm" },
  plugins: [
    copy({
      targets: [
        { src: ["LICENSE", "README.md"], dest: "build" },
        { src: ["package.json"], dest: "build", transform: generatePkg },
      ],
    }),
  ],
};

function generatePkg(contents) {
  let pkg = JSON.parse(contents.toString());
  return JSON.stringify(
    {
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
      exports: "./vepr.js",
      types: "./vepr.d.ts",
      files: ["*.js", "*.d.ts"],
      sideEffects: false,
      keywords: pkg.keywords,
      dependencies: pkg.dependencies,
      peerDependencies: pkg.peerDependencies,
    },
    null,
    2,
  );
}

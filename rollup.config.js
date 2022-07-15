import copy from "rollup-plugin-copy";
import size from "rollup-plugin-bundle-size";
import multi from "@rollup/plugin-multi-entry";

export default {
  input: ["modules/*.js", "modules/mark/*.js", "modules/transform/*.js"],
  output: { file: "build/vepr.js", format: "esm" },
  plugins: [
    multi(),
    size(),
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
      main: "./vepr.js",
      module: "./vepr.js",
      exports: "./vepr.js",
      type: "module",
      types: pkg.types,
      sideEffects: false,
      files: pkg.files,
      keywords: pkg.keywords,
      dependencies: pkg.dependencies,
      peerDependencies: pkg.peerDependencies,
    },
    null,
    2,
  );
}

import { parallel, series, src, dest } from "gulp";
import Vinyl from "vinyl";
import ts from "typescript";
import { format } from "prettier";
import { pipeline } from "node:stream/promises";
import { basename, relative } from "node:path";
import { readFileSync } from "node:fs";

import { rollup } from "rollup";

import yargs from "yargs";
import { Parcel } from "@parcel/core";

import { ESLint } from "eslint";
import { createVitest } from "vitest/node";

export let ci = parallel(test, lint);

export async function test() {
  let { watch } = yargs(process.argv).boolean("watch").parse();
  let vitest = await createVitest("test", { watch }, undefined, {
    coverage: {
      enabled: true,
      provider: "istanbul",
      include: ["modules"],
    },
  });
  await vitest.start();
  await vitest.close();
}

export async function lint() {
  let { fix } = yargs(process.argv).boolean("fix").parse();
  let eslint = new ESLint({ fix, cache: true });
  let result = await eslint.lintFiles(["modules"]);
  let format = await eslint.loadFormatter("stylish");
  if (fix) await ESLint.outputFixes(result);
  let warnCount = result.reduce((sum, res) => sum + res.warningCount, 0);
  console.log(format.format(result));
  if (warnCount > 10) throw new Error("ESLint found too many warnings (maximum: 10).");
}

export async function docs() {
  let { build } = yargs(process.argv).boolean("build").parse();
  let bundler = new Parcel({
    entries: "docs/*.html",
    defaultConfig: "@parcel/config-default",
    serveOptions: { port: 3000 },
    hmrOptions: { port: 3000 },
  });
  try {
    return build ? bundler.run() : bundler.watch();
  } catch (err) {
    console.log(err.diagnostics);
  }
}

export let build = series(bundle, decls);

export async function bundle() {
  let input = [
    "modules/index.js",
    "modules/scale/color.js",
    "modules/motion.js",
    "modules/interaction.js",
  ];
  let bundle = await rollup({ input });
  await bundle.write({
    dir: "build",
    format: "esm",
    entryFileNames: (chunk) => `${chunk.name === "index" ? "vepr" : chunk.name}.js`,
  });
  await Promise.all([
    pipeline(src("LICENSE"), dest("build")),
    pipeline(src("README.md"), map(generateReadme), dest("build")),
    pipeline(src("package.json"), map(generatePkg), dest("build")),
  ]);
}

function map(fn) {
  return async function* process(source) {
    for await (let file of source)
      yield file.clone({ contents: Buffer.from(fn(file.contents.toString())) });
  };
}

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
      "./interaction": "./interaction.js",
      "./motion": "./motion.js",
    },
    files: ["*.js", "*.d.ts"],
    sideEffects: false,
    keywords: pkg.keywords,
    dependencies: pkg.dependencies,
    peerDependencies: pkg.peerDependencies,
  };
  return JSON.stringify(newPkg, null, 2);
}

export function decls() {
  return pipeline(src(["build/*.js"]), declarations, prettierdts, dest("build"));
}

async function* declarations(source) {
  let config = { allowJs: true, declaration: true, emitDeclarationOnly: true, skipLibCheck: true };
  let host = ts.createCompilerHost(config);
  let roots = new Map();
  let output = new Set();
  host.writeFile = (fileName, contents) => {
    output.add(new Vinyl({ path: basename(fileName), contents: Buffer.from(contents) }));
  };
  host.readFile = (fileName) => {
    return roots.get(fileName)?.contents.toString() ?? readFileSync(fileName, "utf8");
  };
  for await (let file of source) {
    roots.set(relative(process.cwd(), file.path), file);
  }
  ts.createProgram(Array.from(roots.keys()), config, host).emit();
  for (let file of output) yield file;
}

async function* prettierdts(source) {
  for await (let file of source) {
    let clone = file.clone({ contents: false });
    let contents = await format(clone.contents.toString(), {
      parser: "typescript",
    });
    clone.contents = Buffer.from(contents);
    yield clone;
  }
}

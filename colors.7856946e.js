// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hK5U4":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "53c344877856946e";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"dVdtG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dot", ()=>(0, _dotJs.dot));
parcelHelpers.export(exports, "barX", ()=>(0, _barJs.barX));
parcelHelpers.export(exports, "barY", ()=>(0, _barJs.barY));
parcelHelpers.export(exports, "line", ()=>(0, _lineJs.line));
parcelHelpers.export(exports, "identity", ()=>(0, _identityJs.identity));
parcelHelpers.export(exports, "blueprint", ()=>(0, _blueprintJs.blueprint));
parcelHelpers.export(exports, "render", ()=>(0, _renderJs.render));
parcelHelpers.export(exports, "rank", ()=>(0, _arrayJs.rank));
parcelHelpers.export(exports, "bisect", ()=>(0, _arrayJs.bisect));
parcelHelpers.export(exports, "bisector", ()=>(0, _arrayJs.bisector));
parcelHelpers.export(exports, "extent", ()=>(0, _arrayJs.extent));
parcelHelpers.export(exports, "min", ()=>(0, _arrayJs.min));
parcelHelpers.export(exports, "max", ()=>(0, _arrayJs.max));
parcelHelpers.export(exports, "ascending", ()=>(0, _arrayJs.ascending));
parcelHelpers.export(exports, "descending", ()=>(0, _arrayJs.descending));
parcelHelpers.export(exports, "pow", ()=>(0, _numberJs.pow));
parcelHelpers.export(exports, "log", ()=>(0, _numberJs.log));
parcelHelpers.export(exports, "symlog", ()=>(0, _numberJs.symlog));
parcelHelpers.export(exports, "toggleProfiling", ()=>(0, _profilingJs.toggleProfiling));
parcelHelpers.export(exports, "brush", ()=>(0, _interactionJs.brush));
parcelHelpers.export(exports, "zoom", ()=>(0, _interactionJs.zoom));
parcelHelpers.export(exports, "interpolateLinear", ()=>(0, _functionJs.interpolateLinear));
parcelHelpers.export(exports, "interpolateDiscrete", ()=>(0, _functionJs.interpolateDiscrete));
parcelHelpers.export(exports, "normalizeLinear", ()=>(0, _functionJs.normalizeLinear));
parcelHelpers.export(exports, "normalizeQuantile", ()=>(0, _functionJs.normalizeQuantile));
parcelHelpers.export(exports, "normalizeQuantize", ()=>(0, _functionJs.normalizeQuantize));
parcelHelpers.export(exports, "normalizeDiverging", ()=>(0, _functionJs.normalizeDiverging));
parcelHelpers.export(exports, "normalizeBand", ()=>(0, _functionJs.normalizeBand));
parcelHelpers.export(exports, "interpolateBlues", ()=>(0, _colorJs.interpolateBlues));
parcelHelpers.export(exports, "schemeBlues", ()=>(0, _colorJs.schemeBlues));
parcelHelpers.export(exports, "interpolateGreens", ()=>(0, _colorJs.interpolateGreens));
parcelHelpers.export(exports, "schemeGreens", ()=>(0, _colorJs.schemeGreens));
parcelHelpers.export(exports, "interpolateGreys", ()=>(0, _colorJs.interpolateGreys));
parcelHelpers.export(exports, "schemeGreys", ()=>(0, _colorJs.schemeGreys));
parcelHelpers.export(exports, "interpolateOranges", ()=>(0, _colorJs.interpolateOranges));
parcelHelpers.export(exports, "schemeOranges", ()=>(0, _colorJs.schemeOranges));
parcelHelpers.export(exports, "interpolatePurples", ()=>(0, _colorJs.interpolatePurples));
parcelHelpers.export(exports, "schemePurples", ()=>(0, _colorJs.schemePurples));
parcelHelpers.export(exports, "interpolateReds", ()=>(0, _colorJs.interpolateReds));
parcelHelpers.export(exports, "schemeReds", ()=>(0, _colorJs.schemeReds));
parcelHelpers.export(exports, "interpolateBuGn", ()=>(0, _colorJs.interpolateBuGn));
parcelHelpers.export(exports, "schemeBuGn", ()=>(0, _colorJs.schemeBuGn));
parcelHelpers.export(exports, "interpolateBuPu", ()=>(0, _colorJs.interpolateBuPu));
parcelHelpers.export(exports, "schemeBuPu", ()=>(0, _colorJs.schemeBuPu));
parcelHelpers.export(exports, "interpolateGnBu", ()=>(0, _colorJs.interpolateGnBu));
parcelHelpers.export(exports, "schemeGnBu", ()=>(0, _colorJs.schemeGnBu));
parcelHelpers.export(exports, "interpolateOrRd", ()=>(0, _colorJs.interpolateOrRd));
parcelHelpers.export(exports, "schemeOrRd", ()=>(0, _colorJs.schemeOrRd));
parcelHelpers.export(exports, "interpolatePuBu", ()=>(0, _colorJs.interpolatePuBu));
parcelHelpers.export(exports, "schemePuBu", ()=>(0, _colorJs.schemePuBu));
parcelHelpers.export(exports, "interpolatePuBuGn", ()=>(0, _colorJs.interpolatePuBuGn));
parcelHelpers.export(exports, "schemePuBuGn", ()=>(0, _colorJs.schemePuBuGn));
parcelHelpers.export(exports, "interpolatePuRd", ()=>(0, _colorJs.interpolatePuRd));
parcelHelpers.export(exports, "schemePuRd", ()=>(0, _colorJs.schemePuRd));
parcelHelpers.export(exports, "interpolateRdPu", ()=>(0, _colorJs.interpolateRdPu));
parcelHelpers.export(exports, "schemeRdPu", ()=>(0, _colorJs.schemeRdPu));
parcelHelpers.export(exports, "interpolateYlGn", ()=>(0, _colorJs.interpolateYlGn));
parcelHelpers.export(exports, "schemeYlGn", ()=>(0, _colorJs.schemeYlGn));
parcelHelpers.export(exports, "interpolateYlGnBu", ()=>(0, _colorJs.interpolateYlGnBu));
parcelHelpers.export(exports, "schemeYlGnBu", ()=>(0, _colorJs.schemeYlGnBu));
parcelHelpers.export(exports, "interpolateYlOrBr", ()=>(0, _colorJs.interpolateYlOrBr));
parcelHelpers.export(exports, "schemeYlOrBr", ()=>(0, _colorJs.schemeYlOrBr));
parcelHelpers.export(exports, "interpolateYlOrRd", ()=>(0, _colorJs.interpolateYlOrRd));
parcelHelpers.export(exports, "schemeYlOrRd", ()=>(0, _colorJs.schemeYlOrRd));
parcelHelpers.export(exports, "interpolateBrBG", ()=>(0, _colorJs.interpolateBrBG));
parcelHelpers.export(exports, "schemeBrBG", ()=>(0, _colorJs.schemeBrBG));
parcelHelpers.export(exports, "interpolatePiYG", ()=>(0, _colorJs.interpolatePiYG));
parcelHelpers.export(exports, "schemePiYG", ()=>(0, _colorJs.schemePiYG));
parcelHelpers.export(exports, "interpolatePRGn", ()=>(0, _colorJs.interpolatePRGn));
parcelHelpers.export(exports, "schemePRGn", ()=>(0, _colorJs.schemePRGn));
parcelHelpers.export(exports, "interpolatePuOr", ()=>(0, _colorJs.interpolatePuOr));
parcelHelpers.export(exports, "schemePuOr", ()=>(0, _colorJs.schemePuOr));
parcelHelpers.export(exports, "interpolateRdBu", ()=>(0, _colorJs.interpolateRdBu));
parcelHelpers.export(exports, "schemeRdBu", ()=>(0, _colorJs.schemeRdBu));
parcelHelpers.export(exports, "interpolateRdGy", ()=>(0, _colorJs.interpolateRdGy));
parcelHelpers.export(exports, "schemeRdGy", ()=>(0, _colorJs.schemeRdGy));
parcelHelpers.export(exports, "interpolateRdYlBu", ()=>(0, _colorJs.interpolateRdYlBu));
parcelHelpers.export(exports, "schemeRdYlBu", ()=>(0, _colorJs.schemeRdYlBu));
parcelHelpers.export(exports, "interpolateRdYlGn", ()=>(0, _colorJs.interpolateRdYlGn));
parcelHelpers.export(exports, "schemeRdYlGn", ()=>(0, _colorJs.schemeRdYlGn));
parcelHelpers.export(exports, "interpolateSpectral", ()=>(0, _colorJs.interpolateSpectral));
parcelHelpers.export(exports, "schemeSpectral", ()=>(0, _colorJs.schemeSpectral));
parcelHelpers.export(exports, "schemeObservable10", ()=>(0, _colorJs.schemeObservable10));
parcelHelpers.export(exports, "schemeTableau10", ()=>(0, _colorJs.schemeTableau10));
parcelHelpers.export(exports, "shape", ()=>shape);
var _dotJs = require("./mark/dot.js");
var _barJs = require("./mark/bar.js");
var _lineJs = require("./mark/line.js");
var _identityJs = require("./transform/identity.js");
var _blueprintJs = require("./blueprint.js");
var _renderJs = require("./render.js");
var _arrayJs = require("./scale/array.js");
var _numberJs = require("./scale/number.js");
var _profilingJs = require("./profiling.js");
var _interactionJs = require("./interaction.js");
var _shapeJs = require("./shape.js");
var _functionJs = require("./scale/function.js");
var _colorJs = require("./scale/color.js");
let shape = {
    dot: (0, _shapeJs.dot),
    line: (0, _shapeJs.line),
    rect: (0, _shapeJs.rect)
};

},{"./mark/dot.js":"gMmWf","./mark/bar.js":"1zssT","./mark/line.js":"doILt","./transform/identity.js":"aJ1q9","./blueprint.js":"4WYbu","./render.js":"fEPD2","./scale/array.js":"cdccN","./scale/number.js":"fgbt0","./profiling.js":"8OBde","./interaction.js":"3UlS1","./shape.js":"f9LAK","./scale/function.js":"9ZpiC","./scale/color.js":"cHCrs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gMmWf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Dots */ parcelHelpers.export(exports, "dot", ()=>dot);
var _arrayJs = require("../scale/array.js");
var _variableJs = require("../variable.js");
var _shapeJs = require("../shape.js");
function* dot(data, process) {
    let vectors = process(data);
    let variables = yield {
        x: {
            type: "numeral",
            domain: (0, _arrayJs.extent)(vectors.x)
        },
        y: {
            type: "numeral",
            domain: (0, _arrayJs.extent)(vectors.y)
        }
    };
    let x = (0, _variableJs.normalizeOf)(variables.x);
    let y = (0, _variableJs.normalizeOf)(variables.y);
    let subset = vectors.index.filter((index)=>vectors.bitset[index >> 5] & 0x80000000 >>> index);
    // QUESTION how can I optimize x/y channels while keeping pointers in tact
    // or should I apply filter on render? can the filter state be altered via controls?
    let { dot } = _shapeJs;
    return dot(subset, {
        x: (p)=>x(vectors.x[p]),
        y: (p)=>y(vectors.y[p]),
        r: ()=>3
    }).snapshot();
}

},{"../scale/array.js":"cdccN","../variable.js":"gIBhj","../shape.js":"f9LAK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cdccN":[function(require,module,exports) {
/**
 * Compute an array of indices of values sorted in ascending order
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity]
 *   Default is `identity`
 * @returns {Uint32Array}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rank", ()=>rank);
/**
 * Bisect right
 *
 * @template T
 * @param {T[]} values
 * @param {T} x
 */ parcelHelpers.export(exports, "bisect", ()=>bisect);
parcelHelpers.export(exports, "bisector", ()=>bisector);
/**
 * Returns a tuple of [min, max] values of an array. Returns [undefined,
 * undefined] if the target array is empty.
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf]
 * @returns {[R, R] | [undefined, undefined]} Tuple of min and max values
 */ parcelHelpers.export(exports, "extent", ()=>extent);
/**
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity]
 *   Default is `identity`
 * @returns {R[]} Array of unique values
 */ parcelHelpers.export(exports, "unique", ()=>unique);
/**
 * Basic reusable function that can often be used as a default value for when
 * mapping is unnecessary.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */ parcelHelpers.export(exports, "identity", ()=>identity);
/**
 * Returns max value of an array. Returns undefined if the target array is
 * empty.
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf]
 * @returns {R | undefined}
 */ parcelHelpers.export(exports, "max", ()=>max);
/**
 * Returns min value of an array. Returns undefined if the target array is
 * empty.
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf]
 * @returns {R | undefined}
 */ parcelHelpers.export(exports, "min", ()=>min);
parcelHelpers.export(exports, "linearTicks", ()=>linearTicks);
/**
 * A comparator that ensures ascending order and handles nulls and NaNs.
 * Resulting order is following:
 *
 * [x0, x1, x2, x3, x..., NaN..., null..., undefined...]
 *
 * @template T
 * @param {T} a
 * @param {T} b
 */ parcelHelpers.export(exports, "ascending", ()=>ascending);
/**
 * A comparator that ensures descending order and handles nulls and NaNs.
 * Resulting order is following:
 *
 * [x4, x3, x2, x1, x..., NaN..., null..., undefined...]
 *
 * @template T
 * @param {T} a
 * @param {T} b
 */ parcelHelpers.export(exports, "descending", ()=>descending);
function rank(values, valueOf = identity) {
    return Uint32Array.from({
        length: values.length
    }, (_, i)=>i).sort((iA, iB)=>{
        return ascending(valueOf(values[iA], iA, values), valueOf(values[iB], iB, values));
    });
}
function bisect(values, x, lo = 0, hi = values.length) {
    while(lo < hi){
        let mid = lo + hi >>> 1;
        let v = values[mid];
        if (ascending(v, x) <= 0) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
function bisector(valueOf = identity) {
    // TODO inline ascending() for speed
    function left(values, x, lo = 0, hi = values.length) {
        while(lo < hi){
            let mid = lo + hi >>> 1;
            let v = valueOf(values[mid]);
            if (ascending(v, x) < 0) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    function right(values, x, lo = 0, hi = values.length) {
        while(lo < hi){
            let mid = lo + hi >>> 1;
            let v = valueOf(values[mid]);
            if (ascending(v, x) <= 0) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    return {
        left,
        right
    };
}
function extent(values, valueOf) {
    if (values.length === 0) return [
        undefined,
        undefined
    ];
    if (valueOf != null) {
        let min = valueOf(values[0], 0, values);
        let max = min;
        for(let index = 1, value; index < values.length; index++){
            value = valueOf(values[index], index, values);
            if (value == null) continue;
            if (value > max) max = value;
            else if (value < min) min = value;
        }
        return [
            min,
            max
        ];
    } else {
        let min = values[0];
        let max = min;
        for(let index = 1, value; index < values.length; index++){
            value = values[index];
            if (value == null) continue;
            if (value > max) max = value;
            else if (value < min) min = value;
        }
        return [
            min,
            max
        ];
    }
}
function unique(values, valueOf) {
    return Array.from(new Set(valids(values, valueOf)));
}
function* valids(values, valueOf) {
    if (valueOf != null) for(let index = 0, value; index < values.length; index++){
        value = valueOf(values[index], index, values);
        if (value != null && !Number.isNaN(value)) yield value;
    }
    else for(let index = 0, value; index < values.length; index++){
        value = values[index];
        if (value != null && !Number.isNaN(value)) yield value;
    }
}
function identity(value) {
    return value;
}
function max(values, valueOf) {
    // TODO switch to iterables
    if (values.length === 0) return undefined;
    if (valueOf != null) {
        let max = valueOf(values[0], 0, values);
        for(let index = 1, value; index < values.length; index++){
            value = valueOf(values[index], index, values);
            if (value != null && max < value) max = value;
        }
        return max;
    } else {
        let max = values[0];
        for(let index = 1, value; index < values.length; index++){
            value = values[index];
            if (value != null && max < value) max = value;
        }
        return max;
    }
}
function min(values, valueOf) {
    if (values.length === 0) return undefined;
    if (valueOf != null) {
        let min = valueOf(values[0], 0, values);
        for(let index = 1, value; index < values.length; index++){
            value = valueOf(values[index], index, values);
            if (value != null && min > value) min = value;
        }
        return min;
    } else {
        let min = values[0];
        for(let index = 1, value; index < values.length; index++){
            value = values[index];
            if (value != null && min > value) min = value;
        }
        return min;
    }
}
let e10 = Math.sqrt(50);
let e5 = Math.sqrt(10);
let e2 = Math.sqrt(2);
function linearTicks(start, stop, count) {
    // allow descending ticks generation
    let reverse = start > stop;
    let [lo, hi] = reverse ? [
        stop,
        start
    ] : [
        start,
        stop
    ];
    // delta is enough to generate evenly spaced intervals but not enough for human-readable
    let delta = (hi - lo) / count;
    // selecting 10 as a base for generating nice intervals
    let power = Math.floor(Math.log10(delta));
    // this will give up IEEE 754 weirdness
    let error = delta / 10 ** power;
    // floor to closest desired interval (10 | 5 | 2 | 1)
    let approx = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
    // calculate tick step that can be used in further calc
    let step = 10 ** -power / approx;
    // get starting and ending point that include required values in the scale
    let x0 = Math.floor(lo * step);
    let x1 = Math.ceil(hi * step);
    let result = Array.from({
        length: x1 - x0 + 1
    }, (_, i)=>(x0 + i) / step);
    return reverse ? result.reverse() : result;
}
function ascending(a, b) {
    // prettier-ignore
    return Object.is(a, b) ? 0 : a === null ? 1 : b === null ? -1 : a < b ? -1 : a > b ? 1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
}
function descending(a, b) {
    // prettier-ignore
    return Object.is(a, b) ? 0 : a === null ? 1 : b === null ? -1 : a < b ? 1 : a > b ? -1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"gIBhj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "normalizeOf", ()=>normalizeOf);
parcelHelpers.export(exports, "apply", ()=>apply);
var _arrayJs = require("./scale/array.js");
var _functionJs = require("./scale/function.js");
function normalizeOf(variable) {
    if (variable.type === "numeral") return (0, _functionJs.normalizeLinear)(variable.domain[0], variable.domain[1]);
    else if (variable.type === "ordinal") {
        let norm = (0, _functionJs.normalizeBand)(variable.domain, 0.1, 0.1);
        return Object.assign((v)=>norm(v) + norm.width / 2, norm);
    }
    throw new Error(`Unsupported variable type: ${variable.type}`);
}
function apply(scale, channel) {
    return ArrayBuffer.isView(channel) ? (p)=>scale(channel[p]) : constant(scale(channel));
}
function constant(v) {
    return (_)=>v;
}

},{"./scale/array.js":"cdccN","./scale/function.js":"9ZpiC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9ZpiC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create a function to interpolate number in range [0..1] to a continuous range
 * [r1..r2]
 *
 * @param {number} r1
 * @param {number} r2
 * @returns {(t: number) => number}
 */ parcelHelpers.export(exports, "interpolateLinear", ()=>interpolateLinear);
/**
 * Create a function to interpolate number in range [0..1] to a discrete value
 * of given set
 *
 * @template T
 * @param {T[]} vs
 * @returns {(t: number) => T}
 */ parcelHelpers.export(exports, "interpolateDiscrete", ()=>interpolateDiscrete);
/**
 * @param {number} d1
 * @param {number} d2
 * @returns {(x: number) => number}
 */ parcelHelpers.export(exports, "normalizeLinear", ()=>normalizeLinear);
/**
 * @param {number[]} vs
 * @returns {(x: number) => number}
 */ parcelHelpers.export(exports, "normalizeQuantile", ()=>normalizeQuantile);
/**
 * @param {number} d1
 * @param {number} d2
 * @returns {(x: number) => number}
 */ parcelHelpers.export(exports, "normalizeQuantize", ()=>normalizeQuantize);
/**
 * @param {number} d1
 * @param {number} d2
 * @param {number} d3
 * @returns {(x: number) => number}
 */ parcelHelpers.export(exports, "normalizeDiverging", ()=>normalizeDiverging);
/**
 * @template T
 * @param {T[]} vs
 * @param {number} [paddingInner=0] Default is `0`
 * @param {number} [paddingOuter=0] Default is `0`
 * @param {number} [align=0.5] Default is `0.5`
 * @returns {((x: T) => number) & { width: number }}
 */ parcelHelpers.export(exports, "normalizeBand", ()=>normalizeBand);
/**
 * @param {number} a
 * @param {number} b
 * @returns {(x: number) => number}
 */ parcelHelpers.export(exports, "clamp", ()=>clamp);
var _arrayJs = require("./array.js");
function interpolateLinear(r1, r2) {
    let k = r2 - r1;
    return k === 0 ? ()=>r1 : (t)=>r1 + k * t;
}
function interpolateDiscrete(vs) {
    // QUESTION should it clamp by default?
    let n = vs.length;
    return (t)=>vs[Math.max(0, Math.min(Math.floor(t * n), n - 1))];
}
function normalizeLinear(d1, d2) {
    let k = d2 - d1;
    return k === 0 ? ()=>0.5 : (x)=>(x - d1) / k;
}
function normalizeQuantile(vs) {
    let n = 100;
    let rank = new Uint32Array(vs);
    for(let i = 0; i < rank.length; i++)rank[i] = i;
    rank.sort((iA, iB)=>(0, _arrayJs.ascending)(vs[iA], vs[iB]));
    // TODO ignore NaN, null, undefined, find insertion point to avoid those in pointers
    let thresholds = new Float64Array(n - 1);
    // TODO replace vs.length with hard limit to dismiss missing/invalid elements in population
    for(let j = 0, c = vs.length; j < n; j++){
        let p = (j + 1) / n;
        let i = (c - 1) * p;
        let i0 = Math.floor(i);
        let value0 = vs[rank[i0]];
        let value1 = vs[rank[i0 + 1]];
        thresholds[j] = value0 + (value1 - value0) * (i - i0);
    }
    return (x)=>isNaN(x) ? NaN : (0, _arrayJs.bisect)(thresholds, x) / (n - 1);
}
function normalizeQuantize(d1, d2) {
    let n = 100;
    let thresholds = new Float64Array(n - 1);
    for(let i = 0; i < n; i++)thresholds[i] = ((i + 1) * d2 - (i - 1 - n) * d1) / n;
    return (x)=>isNaN(x) ? NaN : (0, _arrayJs.bisect)(thresholds, x) / (n - 1);
}
function normalizeDiverging(d1, d2, d3) {
    let k10 = d1 === d2 ? 0 : 0.5 / (d2 - d1);
    let k21 = d2 === d3 ? 0 : 0.5 / (d3 - d2);
    let sign = d2 < d1 ? -1 : 1;
    return (x)=>0.5 + (x - d2) * (sign * x < sign * d2 ? k10 : k21);
}
function normalizeBand(vs, paddingInner = 0, paddingOuter = 0, align = 0.5) {
    let count = vs.length;
    let step = 1 / Math.max(1, count - paddingInner + paddingOuter * 2);
    let start = (1 - step * (count - paddingInner)) * align;
    let width = step * (1 - paddingInner);
    return Object.assign((x)=>step * vs.indexOf(x) + start, {
        width
    });
}
function clamp(a, b) {
    return (x)=>Math.max(a, Math.min(x, b));
}

},{"./array.js":"cdccN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f9LAK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @template T
 * @param {T[] | object} data
 * @param {{
 *   x?: (value: T) => number;
 *   y?: (value: T) => number;
 *   r?: (value: T) => number;
 * }} transform
 */ parcelHelpers.export(exports, "dot", ()=>dot);
parcelHelpers.export(exports, "line", ()=>line);
parcelHelpers.export(exports, "rect", ()=>rect);
var _array = require("./scale/array");
function dot(data, transform) {
    function snapshot() {
        if (!isArrayLike(data)) return data;
        let { x, y, r } = transform;
        return {
            key: "dot",
            index: Uint32Array.from(data, (_, i)=>i),
            x: apply(x, data, Float64Array),
            y: apply(y, data, Float64Array),
            r: apply(r, data, Float64Array)
        };
    }
    function channels(input) {
        let { x, y, r } = transform;
        if (isArrayLike(input)) return {
            series: input,
            x,
            y,
            r
        };
        return {
            series: input.index,
            x: vector(x, input.x),
            y: vector(y, input.y),
            r: input.r != null ? vector((0, _array.identity), input.r) : constant(3)
        };
    }
    /** @param {CanvasRenderingContext2D} context */ function render(context) {
        let { series, x, y, r } = channels(data);
        let tau = 2 * Math.PI;
        context.lineWidth = 1.5;
        context.strokeStyle = "currentColor";
        for (let item of series){
            context.beginPath();
            context.arc(x(item), y(item), r(item), 0, tau, false);
            context.stroke();
        }
    }
    return {
        render,
        snapshot
    };
}
function line(data, transform) {
    function snapshot() {
        if (!isArrayLike(data)) return data;
        let { x, y } = transform;
        return {
            key: "line",
            index: Uint32Array.from(data, (_, i)=>i),
            x: apply(x, data, Float64Array),
            y: apply(y, data, Float64Array)
        };
    }
    function channels(input) {
        let { x, y } = transform;
        if (isArrayLike(input)) return {
            series: input,
            x,
            y
        };
        return {
            series: input.index,
            x: vector(x, input.x),
            y: vector(y, input.y)
        };
    }
    /** @param {CanvasRenderingContext2D} context */ function render(context) {
        let { series, x, y } = channels(data);
        let path = new Path2D();
        let lx, ly;
        let moving = true;
        for (let item of series){
            lx = x(item);
            ly = y(item);
            if (Number.isNaN(lx) || Number.isNaN(ly)) moving = true;
            else {
                if (moving) path.moveTo(lx, ly);
                else path.lineTo(lx, ly);
                moving = false;
            }
        }
        context.beginPath();
        context.lineWidth = 1.5;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.miterLimit = 1;
        context.strokeStyle = "currentColor";
        context.stroke(path);
    }
    return {
        render,
        snapshot
    };
}
function rect(data, transform) {
    function snapshot() {
        if (!isArrayLike(data)) return data;
        let { x, y, x1 = x, x2 = x, y1 = y, y2 = y, alpha } = transform;
        return {
            key: "rect",
            index: Uint32Array.from(data, (_, i)=>i),
            x1: apply(x1, data, Float64Array),
            x2: apply(x2, data, Float64Array),
            y1: apply(y1, data, Float64Array),
            y2: apply(y2, data, Float64Array),
            alpha: apply(alpha, data, Float64Array)
        };
    }
    function channels(input) {
        let { x, y, x1 = x, x2 = x, y1 = y, y2 = y, alpha } = transform;
        if (isArrayLike(input)) return {
            series: input,
            x1,
            x2,
            y1,
            y2,
            alpha
        };
        return {
            series: input.index,
            x1: vector(x1, input.x1),
            x2: vector(x2, input.x2),
            y1: vector(y1, input.y1),
            y2: vector(y2, input.y2),
            alpha: input.alpha != null ? vector((0, _array.identity), input.alpha) : constant(1)
        };
    }
    /** @param {CanvasRenderingContext2D} context */ function render(context) {
        let { series, x1, x2, y1, y2, alpha } = channels(data);
        context.fillStyle = "currentColor";
        for (let item of series){
            context.globalAlpha = alpha(item);
            context.fillRect(x1(item), y1(item), x2(item) - x1(item), y2(item) - y1(item));
        }
    }
    return {
        render,
        snapshot
    };
}
function constant(value) {
    return ()=>value;
}
function apply(fn, data, type) {
    return fn != null ? fn.length > 0 ? type.from(data, fn) : fn() : null;
}
function vector(fn, data) {
    return isArrayLike(data) ? (pointer)=>fn(data[pointer], pointer) : constant(fn != null ? fn(data) : data);
}
/** @param {any} input */ function isArrayLike(input) {
    return ArrayBuffer.isView(input) || Array.isArray(input);
}

},{"./scale/array":"cdccN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1zssT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Horizontal bars. Ordinal Y scale, Quantitive X scale */ parcelHelpers.export(exports, "barX", ()=>barX);
/** Vertical series of bars. Quantitive Y scale, Ordinal X scale */ parcelHelpers.export(exports, "barY", ()=>barY);
var _arrayJs = require("../scale/array.js");
var _functionJs = require("../scale/function.js");
var _shapeJs = require("../shape.js");
function* barX(data, process) {
    let vectors = process(data);
    let variables = yield {
        x: {
            type: "numeral",
            domain: (0, _arrayJs.extent)(vectors.x)
        },
        y: {
            type: "ordinal",
            domain: (0, _arrayJs.unique)(vectors.y)
        }
    };
    let y = (0, _functionJs.normalizeBand)(variables.y.domain, 0.1, 0.1);
    let x = (0, _functionJs.normalizeLinear)(variables.x.domain[0], variables.x.domain[1]);
    let subset = vectors.index.filter((index)=>vectors.bitset[index >> 5] & 0x80000000 >>> index);
    return (0, _shapeJs.rect)(subset, {
        x1: ()=>0,
        x2: (index)=>x(vectors.x[index]),
        y1: (index)=>y(vectors.y[index]),
        y2: (index)=>y(vectors.y[index]) + y.width
    }).snapshot();
}
function* barY(data, process) {
    let vectors = process(data);
    let variables = yield {
        x: {
            type: "ordinal",
            domain: Array.from(new Set(vectors.x))
        },
        y: {
            type: "numeral",
            domain: (0, _arrayJs.extent)(vectors.y)
        }
    };
    let x = (0, _functionJs.normalizeBand)(variables.x.domain, 0.1, 0.1);
    let y = (0, _functionJs.normalizeLinear)(variables.y.domain[0], variables.y.domain[1]);
    let subset = vectors.index.filter((index)=>vectors.bitset[index >> 5] & 0x80000000 >>> index);
    return (0, _shapeJs.rect)(subset, {
        x1: (index)=>x(vectors.x[index]),
        x2: (index)=>x(vectors.x[index]) + x.width,
        y1: (index)=>y(vectors.y[index]),
        y2: ()=>0
    }).snapshot();
}

},{"../scale/array.js":"cdccN","../scale/function.js":"9ZpiC","../shape.js":"f9LAK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"doILt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "line", ()=>line);
var _arrayJs = require("../scale/array.js");
var _variableJs = require("../variable.js");
var _shapeJs = require("../shape.js");
function* line(data, process) {
    let vectors = process(data);
    let variables = yield {
        x: {
            type: "numeral",
            domain: (0, _arrayJs.extent)(vectors.x)
        },
        y: {
            type: "numeral",
            domain: (0, _arrayJs.extent)(vectors.y)
        }
    };
    let x = (0, _variableJs.normalizeOf)(variables.x);
    let y = (0, _variableJs.normalizeOf)(variables.y);
    let subset = vectors.index.filter((index)=>vectors.bitset[index >> 5] & 0x80000000 >>> index);
    let { line } = _shapeJs;
    return line(subset, {
        x: (index)=>x(vectors.x[index]),
        y: (index)=>y(vectors.y[index])
    }).snapshot();
}

},{"../scale/array.js":"cdccN","../variable.js":"gIBhj","../shape.js":"f9LAK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aJ1q9":[function(require,module,exports) {
/**
 * @template T
 * @typedef TransformOptions
 * @property {(value: T, index: number) => boolean} [filter]
 * @property {(a: T, b: T) => -1 | 0 | 1} [sort]
 * @property {boolean} [reverse]
 */ /**
 * @template T
 * @template [K]
 * @param {Record<K, string>} encodings
 * @param {TransformOptions<T>} [options]
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "identity", ()=>identity);
function identity(encodings, options = {}) {
    /**
   * @param {T[]} data
   * @param {Record<K, string>} defaults
   */ return function identity(data, defaults = {}) {
        let index = Uint32Array.from(data, (_, i)=>i);
        let bitset = Uint32Array.from({
            length: Math.ceil(data.length / 32)
        });
        if ("filter" in options) for(let i = 0; i < index.length; i++){
            let v = index[i];
            if (options.filter(data[v], v)) bitset[v >> 5] |= 0x80000000 >>> v;
        }
        else bitset.fill(0xffffffff);
        if ("sort" in options) index.sort((iA, iB)=>options.sort(data[iA], data[iB]));
        if ("reverse" in options) {
            if (options.reverse) index.reverse();
        }
        let combined = Object.assign({}, defaults, encodings);
        return Object.assign(Object.fromEntries(Object.keys(combined).map((key)=>{
            return [
                key,
                Array.from(index, (index)=>data[index][encodings[key]])
            ];
        })), {
            index,
            bitset
        });
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4WYbu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A serializable representation of a data visualization
 *
 * @typedef {object} Blueprint
 * @property {object} layout
 */ /**
 * Materialize the data visualization so it can be sent to a renderer. The
 * blueprint composer function generates an optimized definition of data
 * visualization that then needs to be send to renderer.
 *
 * @returns {Blueprint}
 */ parcelHelpers.export(exports, "blueprint", ()=>blueprint);
var _profilingJs = require("./profiling.js");
var _arrayJs = require("./scale/array.js");
var _axisJs = require("./legend/axis.js");
function blueprint(options) {
    (0, _profilingJs.markStart)("blueprint");
    let variables = options.marks.reduce((vars, mark)=>{
        let local = mark.next().value;
        for(let key in local)if (vars[key] == null) vars[key] = local[key];
        else {
            let union = vars[key].domain.concat(local[key].domain);
            if (vars[key].type === "numeral") vars[key] = Object.assign({}, vars[key], {
                domain: (0, _arrayJs.extent)(union)
            });
            else if (vars[key].type === "ordinal") vars[key] = Object.assign({}, vars[key], {
                domain: (0, _arrayJs.unique)(union)
            });
        }
        return vars;
    }, {
        x: options.x,
        y: options.y
    });
    let layers = options.marks.flatMap((mark)=>mark.next(variables).value);
    // I can produce an array of layouts to represent faceting
    let layout = {
        main: layers,
        haxis: [
            (0, _axisJs.axisX)(variables.x)
        ],
        vaxis: [
            (0, _axisJs.axisY)(variables.y)
        ]
    };
    (0, _profilingJs.markFinish)("blueprint");
    return {
        layout
    };
}

},{"./profiling.js":"8OBde","./scale/array.js":"cdccN","./legend/axis.js":"2mG9g","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8OBde":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** @param {boolean} enabled */ parcelHelpers.export(exports, "toggleProfiling", ()=>toggleProfiling);
/** @param {string} name */ parcelHelpers.export(exports, "markStart", ()=>markStart);
/** @param {string} name */ parcelHelpers.export(exports, "markFinish", ()=>markFinish);
let profilingEnabled = false;
let observer = new PerformanceObserver((entries)=>{
    console.table(entries.getEntries().filter(selectVeprEntry), [
        "name",
        "duration"
    ]);
});
/** @param {PerformanceEntry} entry */ function selectVeprEntry(entry) {
    return entry.name.startsWith("vepr/");
}
function toggleProfiling(enabled) {
    profilingEnabled = enabled && typeof performance !== "undefined";
    if (enabled) observer.observe({
        entryTypes: [
            "measure"
        ],
        durationThreshold: 5000
    });
    else observer.disconnect();
}
function markStart(name) {
    if (profilingEnabled) performance.mark("vepr/start-" + name);
}
function markFinish(name) {
    if (profilingEnabled) {
        performance.mark("vepr/finish-" + name);
        performance.measure("vepr/" + name, "vepr/start-" + name, "vepr/finish-" + name);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2mG9g":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisX", ()=>axisX);
parcelHelpers.export(exports, "axisY", ()=>axisY);
parcelHelpers.export(exports, "renderAxis", ()=>renderAxis);
var _arrayJs = require("../scale/array.js");
var _variableJs = require("../variable.js");
function axisX(variable) {
    let x = (0, _variableJs.normalizeOf)(variable);
    let ticks;
    if (variable.type === "numeral") ticks = (0, _arrayJs.linearTicks)(variable.domain[0], variable.domain[1], 15);
    else if (variable.type === "ordinal") ticks = variable.domain;
    return {
        key: "axis",
        channels: {
            index: Uint32Array.from(ticks, (_, i)=>i),
            x: Float64Array.from(ticks, x),
            y: 0.5,
            text: ticks,
            textAlign: "center",
            textBaseline: "middle",
            filterStrategy: variable.type === "numeral" ? "parity" : null
        }
    };
}
function axisY(variable) {
    let y = (0, _variableJs.normalizeOf)(variable);
    let ticks;
    if (variable.type === "numeral") ticks = (0, _arrayJs.linearTicks)(variable.domain[0], variable.domain[1], 15);
    else if (variable.type === "ordinal") ticks = variable.domain;
    return {
        key: "axis",
        channels: {
            index: Uint32Array.from(ticks, (_, i)=>i),
            x: 0.5,
            y: Float64Array.from(ticks, y),
            text: ticks,
            textAlign: "right",
            textBaseline: "middle",
            filterStrategy: variable.type === "numeral" ? "parity" : null
        }
    };
}
function renderAxis(context, scales, channels) {
    let x = (0, _variableJs.apply)(scales.x, channels.x);
    let y = (0, _variableJs.apply)(scales.y, channels.y);
    context.font = "normal 10px/1 sans-serif";
    context.fillStyle = "currentColor";
    context.textAlign = channels.textAlign;
    context.textBaseline = channels.textBaseline;
    let labels = Array.from(channels.index, (pointer)=>{
        let text = channels.text[pointer];
        let metric = context.measureText(text);
        let x1 = x(pointer);
        let y1 = y(pointer);
        let x2 = x1 + metric.width;
        let y2 = y1 + metric.actualBoundingBoxAscent + metric.actualBoundingBoxDescent;
        return {
            text,
            x1,
            x2,
            y1,
            y2
        };
    });
    let M = context.measureText("M");
    let filter = channels.filterStrategy != null ? channels.filterStrategy === "greedy" ? greedy : parity : null;
    if (filter != null && ArrayBuffer.isView(channels.x)) {
        let gap = M.width;
        labels = filter(labels, gap);
    }
    if (filter != null && ArrayBuffer.isView(channels.y)) {
        let gap = M.actualBoundingBoxAscent + M.actualBoundingBoxDescent;
        labels = filter(labels, gap);
    }
    for (let label of labels)context.fillText(label.text, label.x1, label.y1);
}
function parity(labels, gap) {
    while(labels.some((l, i, ls)=>i > 0 && intersect(l, ls[i - 1], gap)))labels = labels.filter((_, index)=>index % 2 === 0);
    return labels;
}
function greedy(labels, gap) {
    let cursor;
    return labels.filter((label)=>(cursor == null || !intersect(label, cursor, gap)) && (cursor = label, true));
}
function intersect(a, b, gap = 0) {
    return gap > Math.max(b.x1 - a.x2, a.x1 - b.x2, b.y1 - a.y2, a.y1 - b.y2);
}

},{"../scale/array.js":"cdccN","../variable.js":"gIBhj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fEPD2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create canvas rendering controller
 *
 * @param {HTMLElement} container HTML element to render to
 * @param {number} [layers=1] Default is `1`
 */ parcelHelpers.export(exports, "stage", ()=>stage);
/**
 * Render a visualization blueprint using Canvas
 *
 * @deprecated This will be moved to the user space soon
 * @param {Blueprint} blueprint A thing to render
 * @param {HTMLElement} container HTML element to render to
 */ parcelHelpers.export(exports, "render", ()=>render);
var _observableJs = require("./observable.js");
var _scaleJs = require("./scale/scale.js");
var _profilingJs = require("./profiling.js");
var _axisJs = require("./legend/axis.js");
var _shapeJs = require("./shape.js");
var _functionJs = require("./scale/function.js");
function stage(container, layers = 1) {
    let os = (0, _observableJs.ObservableScope)();
    let canvas = createCanvas(container);
    let size = observeElementSize(os, container);
    let style = observeContainerStyle(os, container);
    let devicePixelRatio = observeDevicePixelRatio(os);
    let pointer = observePointer(os, container);
    // Real canvas element size in dom is different from the drawing canvas available
    // The drawing canvas needs to be readjusted accordingly to the size available,
    // device pixel ratio and additional scaling factor for better image quality.
    let scale = os.computed(()=>{
        let { width, height } = size();
        let dpr = devicePixelRatio();
        return scaleCanvasArea(width, height, dpr);
    }, shallowObjectEqual);
    let context = os.computed(()=>{
        let { width, height, ratio } = scale();
        return acquireCanvasContext(canvas, width, height, ratio);
    });
    function dispose() {
        releaseCanvas(canvas);
        canvas.remove();
        canvas = null;
        os.dispose();
    }
    return {
        os,
        canvas,
        size,
        style,
        scale,
        context,
        pointer,
        dispose
    };
}
function render(blueprint, container) {
    let cnvs = stage(container);
    let bp = cnvs.os.observable(blueprint);
    let blocks = cnvs.os.computed(()=>{
        let { width, height } = cnvs.size();
        let trackX = (0, _scaleJs.track)([
            "20u",
            "1f"
        ], width, 20, 4);
        let trackY = (0, _scaleJs.track)([
            "1f",
            "30u"
        ], height, 10, 4);
        return {
            main: {
                x: (0, _functionJs.interpolateLinear)(...trackX(1, 1)),
                y: (0, _functionJs.interpolateLinear)(...trackY(0, 1).reverse())
            },
            haxis: {
                x: (0, _functionJs.interpolateLinear)(...trackX(1, 1)),
                y: (0, _functionJs.interpolateLinear)(...trackY(1, 1).reverse())
            },
            vaxis: {
                x: (0, _functionJs.interpolateLinear)(...trackX(0, 1)),
                y: (0, _functionJs.interpolateLinear)(...trackY(0, 1).reverse())
            }
        };
    });
    cnvs.os.watch(()=>{
        // HACK canvas only picks up currentColor and current font settings if defined via style attribute
        // re-render canvas if the color changes, so dark/light theme switch is supported
        Object.assign(cnvs.canvas.style, cnvs.style());
        let { width, height } = cnvs.size();
        let ctx = cnvs.context();
        let { layout } = bp();
        let areas = blocks();
        let renderFn = new Map([
            [
                "axis",
                (0, _axisJs.renderAxis)
            ]
        ]);
        let actl = new AbortController();
        (0, _profilingJs.markStart)("render");
        ctx.clearRect(0, 0, width, height);
        for(let area in layout){
            let scales = areas[area];
            let layers = layout[area];
            for (let layer of layers)if (layer.key in _shapeJs) {
                ctx.save();
                _shapeJs[layer.key](layer, scales).render(ctx);
                ctx.restore();
            } else {
                let render = renderFn.get(layer.key);
                ctx.save();
                render(ctx, scales, layer.channels);
                ctx.restore();
            }
        }
        (0, _profilingJs.markFinish)("render");
        return ()=>actl.abort();
    });
    return {
        update: bp,
        remove: cnvs.dispose
    };
}
/**
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */ function observeElementSize(os, target) {
    return os.observe(()=>{
        let rect = target.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    }, (cb)=>{
        let observer = new ResizeObserver(cb);
        observer.observe(target);
        return ()=>observer.disconnect();
    }, shallowObjectEqual);
}
/**
 * Browser's devicePixelRatio can change dynamically when user switches monitor
 * resolution or moves a browser window from one monitor to another.
 *
 * @param {ObservableScope} os
 */ function observeDevicePixelRatio(os) {
    return os.observe(()=>window.devicePixelRatio, (cb)=>{
        let media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
        media.addEventListener("change", cb);
        return ()=>media.addEventListener("change", cb);
    });
}
/**
 * HTMLCanvas element doesn't inherit some style properties from parent. This
 * means the only way `currentColor` can be used for rendering is when the
 * canvas itself has the color styling set. This observer tracks parent's
 * current color and readjust when browser's color scheme changes.
 *
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */ function observeContainerStyle(os, target) {
    return os.observe(()=>{
        let style = getComputedStyle(target);
        let color = style.getPropertyValue("color");
        let fontFamily = style.getPropertyValue("font-family");
        let fontFeatureSettings = style.getPropertyValue("font-feature-settings");
        return {
            color,
            fontFamily,
            fontFeatureSettings
        };
    }, (cb)=>{
        let media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", cb);
        return ()=>media.removeEventListener("change", cb);
    }, shallowObjectEqual);
}
/**
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */ function observePointer(os, target) {
    let state = {
        down: false,
        over: false,
        x: 0,
        y: 0
    };
    /** @param {PointerEvent} event */ function handleEvent(event) {
        switch(event.type){
            case "pointerdown":
                state.down = true;
                break;
            case "pointerup":
                state.down = false;
                break;
            case "pointerenter":
                state.over = true;
                break;
            case "pointerleave":
                state.over = false;
                break;
            case "pointermove":
                state.x = event.offsetX;
                state.y = event.offsetY;
                break;
        }
    }
    return os.observe(()=>state, (cb)=>{
        /** @param {PointerEvent} event */ function handle(event) {
            if (event.name === "pointerdown") target.setPointerCapture(event.pointerId);
            else if (event.name === "pointerup") target.releasePointerCapture(event.pointerId);
            handleEvent(event);
            cb();
        }
        target.addEventListener("pointermove", handle);
        target.addEventListener("pointerdown", handle);
        target.addEventListener("pointerup", handle);
        target.addEventListener("pointerenter", handle);
        target.addEventListener("pointerleave", handle);
        return ()=>{
            target.removeEventListener("pointermove", handle);
            target.removeEventListener("pointerdown", handle);
            target.removeEventListener("pointerup", handle);
            target.removeEventListener("pointerover", handle);
            target.removeEventListener("pointerleave", handle);
        };
    }, ()=>false);
}
/**
 * Rendering area of canvas can be different from its visual element's size.
 * This function computes proper rendering area size based on devicePixelRatio
 * and optional scaling factor that can enhance image sharpness (though by
 * consuming more CPU and RAM).
 *
 * @param {number} width
 * @param {number} height
 * @param {number} dpr
 * @param {number} [k=1] Additional scale factor that increases image quality by
 *   further expanding canvas area. Default is `1`
 */ function scaleCanvasArea(width, height, dpr, k = 1) {
    let maxCanvasArea = 2 ** 24; // iOS can't handle more
    let ratio, rwidth, rheight;
    // reduce scale factor until the canvas fits the limits
    do {
        ratio = dpr * k;
        rwidth = width * ratio | 0;
        rheight = height * ratio | 0;
    }while (rwidth * rheight > maxCanvasArea && --k > 1);
    return {
        width: rwidth,
        height: rheight,
        ratio
    };
}
/**
 * Initialize canvas element to render viz to. Parent container assumed to have
 * `position: relative` style to ensure fewer layout shifts during canvas
 * rescaling.
 *
 * @param {HTMLElement} container
 */ function createCanvas(container) {
    let canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.inset = "0 0 0 0";
    canvas.style.background = "transparent";
    canvas.style.border = "none";
    container.append(canvas);
    return canvas;
}
/**
 * Doing our best to make browser release some memory
 *
 * @param {HTMLCanvasElement} target
 */ function releaseCanvas(target) {
    target.width = 1;
    target.height = 1;
    target.style.width = "1px";
    target.style.height = "1px";
    let ctx = target.getContext("2d");
    if (ctx != null) {
        ctx.clearRect(0, 0, 1, 1);
        ctx = null;
    }
}
/**
 * A routine to properly readjust HTMLCanvas size and acquire its 2D rendering
 * context. This function has additional tricks implemented for triggering
 * browser's GC cycles and making sure the rendering context exist (there are
 * known bugs in Webkit that can make it nullable).
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} width
 * @param {number} height
 * @param {number} ratio
 */ function acquireCanvasContext(canvas, width, height, ratio) {
    let tries = 0;
    let ctx;
    do {
        releaseCanvas(canvas);
        ctx = canvas.getContext("2d", {
            desynchronized: true
        });
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.transform = "translateZ(0) scale(1)";
    // https://bugs.webkit.org/show_bug.cgi?id=195325
    // Canvas context can be null in Webkit. Doing our best to recover
    }while (ctx == null || ++tries < 2);
    ctx.scale(ratio, ratio);
    return ctx;
}
/**
 * Iterates over keys of same type objects and returns false if any of
 * properties are not equal (using Object.is()). Otherwise returns true.
 *
 * @template [T=object] Default is `object`
 * @param {T} a
 * @param {T} b
 * @returns Boolean
 */ function shallowObjectEqual(a, b) {
    for(let k in a)if (!Object.is(a[k], b[k])) return false;
    return true;
}

},{"./observable.js":"hGOGg","./scale/scale.js":"chPnd","./profiling.js":"8OBde","./legend/axis.js":"2mG9g","./shape.js":"f9LAK","./scale/function.js":"9ZpiC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGOGg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** @typedef {ReturnType<typeof ObservableScope>} ObservableScope */ /**
 * @template T
 * @typedef {(() => T) & ((value: T) => void)} Observable
 */ /**
 * Creates isolated scope of observable values and its consumers.
 *
 * @example
 *   let os = ObservableScope();
 *   let counter = os.observable(0);
 *   let double = os.computed(() => counter() * 2);
 *
 *   let dispose = os.watch(() => {
 *     let value = double();
 *     console.log(value);
 *   });
 *
 *   counter(counter() + 1); // prints 2 in the console
 */ parcelHelpers.export(exports, "ObservableScope", ()=>ObservableScope);
const PROVIDER = 1;
const CONSUMER = 2;
const DISPOSER = 4;
function ObservableScope() {
    let head = {
        prev: null,
        next: null
    };
    let tail = {
        prev: null,
        next: null
    };
    (head.next = tail).prev = head;
    let tracked = null;
    let marked = null;
    /**
   * Provide an observable that reads from external source
   *
   * @template T
   * @param {() => T} get
   * @param {(cb: () => void) => () => void} subscribe
   * @param {(a: T, b: T) => boolean} [equals=Object.is] Default is `Object.is`
   * @returns {() => T}
   */ function observe(get, subscribe, equals = Object.is) {
        let value = get();
        let clear = subscribe(()=>{
            let val = get();
            let changed = !equals(val, value);
            value = val;
            if (changed) {
                marked = [
                    node
                ];
                digest();
            }
        });
        let dispose = ()=>{
            if (typeof clear === "function") {
                clear();
                clear = null;
            }
            (node.prev.next = node.next).prev = node.prev;
        };
        let node = {
            flag: PROVIDER + DISPOSER,
            dispose,
            prev: tail.prev,
            next: tail
        };
        tail.prev = tail.prev.next = node;
        return ()=>{
            if (tracked != null) tracked.add(node);
            return value;
        };
    }
    /**
   * Basic read/write observable atom
   *
   * @template T
   * @param {T} value
   * @param {(a: T, b: T) => boolean} [equals=Object.is] Default is `Object.is`
   * @returns {Observable<T>}
   */ function observable(value, equals = Object.is) {
        let node = {
            flag: PROVIDER,
            prev: tail.prev,
            next: tail
        };
        tail.prev = tail.prev.next = node;
        return (val)=>{
            if (typeof val === "undefined") {
                if (tracked != null) tracked.add(node);
                return value;
            } else {
                if (tracked != null || marked != null) throw new Error("write while read is prohibited");
                let changed = !equals(val, value);
                value = val;
                if (changed) {
                    marked = [
                        node
                    ];
                    digest();
                }
            }
        };
    }
    /**
   * Computed value that also works as derived atom
   *
   * @template T
   * @param {() => T} get
   * @param {(a: T, b: T) => boolean} [equals=Object.is] Default is `Object.is`
   * @returns {Observable<T>}
   */ function computed(get, equals = Object.is) {
        tracked = new WeakSet();
        let value = get();
        let update = ()=>{
            let val = get();
            let changed = !equals(val, value);
            value = val;
            if (changed) marked.push(node);
        };
        let node = {
            flag: PROVIDER + CONSUMER,
            tracked,
            update,
            prev: tail.prev,
            next: tail
        };
        tail.prev = tail.prev.next = node;
        tracked = null;
        return (val)=>{
            if (typeof val === "undefined") {
                if (tracked != null) tracked.add(node);
                return value;
            } else {
                if (tracked != null || marked != null) throw new Error("write while read is prohibited");
                let changed = !equals(val, value);
                value = val;
                if (changed) {
                    marked = [
                        node
                    ];
                    digest();
                }
            }
        };
    }
    /**
   * Observable watcher for side effects
   *
   * @param {() => (() => void) | void)} fn
   * @returns {() => void} A function to cleanup and dispose the watcher
   */ function watch(fn) {
        tracked = new WeakSet();
        let clear = fn();
        let update = ()=>{
            if (typeof clear === "function") clear();
            clear = fn();
        };
        let dispose = ()=>{
            if (typeof clear === "function") {
                clear();
                clear = null;
            }
            (node.prev.next = node.next).prev = node.prev;
        };
        let node = {
            flag: CONSUMER + DISPOSER,
            tracked,
            update,
            dispose,
            prev: tail.prev,
            next: tail
        };
        tail.prev = tail.prev.next = node;
        tracked = null;
        return dispose;
    }
    function digest() {
        let cursor = marked[0];
        while((cursor = cursor.next) !== tail)if (cursor.flag & CONSUMER && marked.some((node)=>cursor.tracked.has(node))) cursor.update();
        marked = null;
    }
    /**
   * Clean up the context
   *
   * @returns {void}
   */ function dispose() {
        let cursor = head;
        while((cursor = cursor.next) !== tail)if (cursor.flag & DISPOSER) cursor.dispose();
        head = {
            prev: null,
            next: null
        };
        tail = {
            prev: null,
            next: null
        };
        (head.next = tail).prev = head;
    }
    return {
        observe,
        observable,
        computed,
        watch,
        dispose
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"chPnd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Implements one dimensional grid-like layout binning scale.
 *
 * @example
 *   let columns = track(["20u", "1f", "50u"], containerWidth);
 *   let rows = track(["15u", "20u", "1f", "20u"], containerHeight);
 *   let [x0, x1] = columns(1);
 *   let scaleX = scaleLinear(domainX, [x0, x1]);
 *
 * @param {string[]} template
 * @param {number} length
 * @param {number} [padding=0] Default is `0`
 * @param {number} [gap=0] Default is `0`
 * @param {number} [u=1] Default is `1`
 * @returns {(start: number, span?: number) => [number, number]}
 */ parcelHelpers.export(exports, "track", ()=>track);
const UNIT = /^[\d.]+u$/;
const FRAC = /^[\d.]+f$/;
const PERC = /^[\d.]+%$/;
function track(template, length, padding = 0, gap = 0, u = 1) {
    let n = template.length;
    let cLength = length - 2 * padding;
    let nUnits = 0;
    let nFractions = 0;
    let nPercents = 0;
    for(let index = 0; index < n; index++){
        let def = template[index];
        if (FRAC.test(def)) nFractions += parseFloat(def);
        else if (UNIT.test(def)) nUnits += parseFloat(def);
        else if (PERC.test(def)) nPercents += parseFloat(def);
    }
    let f = Math.max(0, (length - 2 * padding - nUnits * u - nPercents * (cLength / 100) - (n - 1) * gap) / nFractions);
    let bins = template.map((def)=>{
        if (FRAC.test(def)) return parseFloat(def) * f;
        else if (UNIT.test(def)) return parseFloat(def) * u;
        else if (PERC.test(def)) return parseFloat(def) * (cLength / 100);
        else throw new Error(`Unknown unit ${def}`);
    });
    return (start, span = 1)=>{
        if (start < 0 || span < 0) throw new Error("invariant");
        let offset = reduce(bins, 0, start, sum, 0) + padding + start * gap;
        let limit = reduce(bins, start, span, sum, 0) + (span - 1) * gap;
        return [
            offset,
            offset + limit
        ];
    };
}
function reduce(array, offset, limit, reducer, result) {
    for(let index = offset; index < offset + limit; index++)result = reducer(result, array[index]);
    return result;
}
function sum(a, b) {
    return a + b;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fgbt0":[function(require,module,exports) {
/**
 * @param {number} [exponent=1] Default is `1`
 * @returns {(value: number) => number}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "pow", ()=>pow);
/**
 * @param {number} [base=Math.E] Default is `Math.E`
 * @returns {(value: number) => number}
 */ parcelHelpers.export(exports, "log", ()=>log);
/**
 * @param {number} [constant=1] Default is `1`
 * @returns {(value: number) => number}
 */ parcelHelpers.export(exports, "symlog", ()=>symlog);
function pow(exponent = 1) {
    return (x)=>x < 0 ? -((-x) ** exponent) : x ** exponent;
}
function log(base = Math.E) {
    if (base === Math.E) return Math.log;
    if (base === 10) return Math.log10;
    if (base === 2) return Math.log2;
    return base = Math.log(base), (x)=>Math.log(x) / base;
}
function symlog(constant = 1) {
    return (x)=>Math.sign(x) * Math.log1p(Math.abs(x / constant));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3UlS1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Brush allows gestures within controlled bounded space in unbounded cartesian
 * coordinates
 *
 * @param {"x" | "y" | "xy"} dimensions Gesture constraints
 */ parcelHelpers.export(exports, "brush", ()=>brush);
parcelHelpers.export(exports, "zoom", ()=>zoom);
const [North, South, West, East, Inside, Outside, Outbound] = [
    1,
    2,
    4,
    8,
    16,
    32,
    64
];
function brush(dimensions) {
    let x0, y0, x1, y1, constraints;
    let startX, startY;
    let allowsX = dimensions.includes("x");
    let allowsY = dimensions.includes("y");
    let state = "idle";
    let selection, snapshot;
    let handle = Outbound;
    /**
   * @param {[[number, number], [number, number]]} extent Top left and right
   *   bottom points of available space
   */ function extent(extent) {
        [[x0, y0], [x1, y1]] = extent;
        constraints = extent;
    }
    function down(x, y) {
        startX = x;
        startY = y;
        snapshot = selection;
        handle = selection != null ? alignment(x, y, selection, allowsX, allowsY, constraints) : x0 < x && x < x1 && y0 < y && y < y1 ? Outside : Outbound;
        state = handle === Outbound ? "idle" : handle === Outside ? "select" : handle === Inside ? "drag" : "resize";
    }
    function move(x, y) {
        if (state === "select") {
            let newX0 = allowsX ? Math.max(x0, Math.min(x, startX)) : x0;
            let newX1 = allowsX ? Math.min(Math.max(x, startX), x1) : x1;
            let newY0 = allowsY ? Math.max(y0, Math.min(y, startY)) : y0;
            let newY1 = allowsY ? Math.min(Math.max(y, startY), y1) : y1;
            let new0 = [
                newX0,
                newY0
            ];
            let new1 = [
                newX1,
                newY1
            ];
            selection = [
                new0,
                new1
            ];
        }
        if (state === "drag") {
            let dx = x - startX;
            let dy = y - startY;
            let candidateX0 = snapshot[0][0] + dx;
            let candidateX1 = snapshot[1][0] + dx;
            let adjustX = candidateX0 < x0 ? x0 - candidateX0 : candidateX1 > x1 ? x1 - candidateX1 : 0;
            let candidateY0 = snapshot[0][1] + dy;
            let candidateY1 = snapshot[1][1] + dy;
            let adjustY = candidateY0 < y0 ? y0 - candidateY0 : candidateY1 > y1 ? y1 - candidateY1 : 0;
            let newX0 = allowsX ? candidateX0 + adjustX : x0;
            let newX1 = allowsX ? candidateX1 + adjustX : x1;
            let newY0 = allowsY ? candidateY0 + adjustY : y0;
            let newY1 = allowsY ? candidateY1 + adjustY : y1;
            let new0 = [
                newX0,
                newY0
            ];
            let new1 = [
                newX1,
                newY1
            ];
            selection = [
                new0,
                new1
            ];
        }
        if (state === "resize") {
            let resizeX = allowsX && handle & West + East;
            let resizeY = allowsY && handle & North + South;
            let startX = resizeX ? snapshot[handle & East ? 0 : 1][0] : NaN;
            let startY = resizeY ? snapshot[handle & South ? 0 : 1][1] : NaN;
            let newX0 = resizeX ? Math.max(x0, Math.min(x, startX)) : snapshot[0][0];
            let newX1 = resizeX ? Math.min(Math.max(x, startX), x1) : snapshot[1][0];
            let newY0 = resizeY ? Math.max(y0, Math.min(y, startY)) : snapshot[0][1];
            let newY1 = resizeY ? Math.min(Math.max(y, startY), y1) : snapshot[1][1];
            let new0 = [
                newX0,
                newY0
            ];
            let new1 = [
                newX1,
                newY1
            ];
            selection = [
                new0,
                new1
            ];
        }
    }
    function up(x, y) {
        state = "idle";
    }
    function cursor(x, y) {
        let handle = selection != null ? alignment(x, y, selection, allowsX, allowsY, constraints) : x0 < x && x < x1 && y0 < y && y < y1 ? Outside : Outbound;
        if (handle === North + West || handle === South + East) return "nwse-resize";
        if (handle === North + East || handle === South + West) return "nesw-resize";
        if (handle === North || handle === South) return "ns-resize";
        if (handle === East || handle === West) return "ew-resize";
        if (handle === Inside) return "move";
        if (handle === Outbound) return "auto";
        return "crosshair";
    }
    function get() {
        return selection;
    }
    function idle() {
        return state === "idle";
    }
    return {
        extent,
        down,
        move,
        up,
        cursor,
        get,
        idle
    };
}
const threshold = 3;
function alignment(xa, ya, [[x0, y0], [x1, y1]], allowsX, allowsY, constraints) {
    let inboundX = constraints[0][0] < xa && xa < constraints[1][0];
    let inboundY = constraints[0][1] < ya && ya < constraints[1][1];
    if (!inboundX || !inboundY) return Outbound;
    let insideX = x0 < xa && xa < x1;
    let insideY = y0 < ya && ya < y1;
    let alignedW = allowsX && Math.abs(xa - x0) < threshold;
    let alignedE = allowsX && Math.abs(xa - x1) < threshold;
    let alignedN = allowsY && Math.abs(ya - y0) < threshold;
    let alignedS = allowsY && Math.abs(ya - y1) < threshold;
    if (alignedN && alignedW) return North + West;
    if (alignedS && alignedE) return South + East;
    if (alignedN && alignedE) return North + East;
    if (alignedS && alignedW) return South + West;
    if (alignedN && insideX) return North;
    if (alignedS && insideX) return South;
    if (alignedW && insideY) return West;
    if (alignedE && insideY) return East;
    if (insideX && insideY) return Inside;
    return Outside;
}
function zoom(translateExtent, scaleExtent) {
    let [[x0, y0], [x1, y1]] = translateExtent;
    let [k0, k1] = scaleExtent;
    let state = [
        1,
        0,
        0
    ];
    let snapshot = null;
    let startX, startY;
    function down(x, y) {
        startX = x;
        startY = y;
        snapshot = state;
    }
    function move(x, y) {
        let [_k, _x, _y] = snapshot;
        state = [
            _k,
            _x + _k * (x - startX),
            _y + _k * (y - startY)
        ];
    }
    function up(x, y) {
        snapshot = null;
    }
    function scale(k) {
        let [_k, _x, _y] = state;
        state = [
            _k * k,
            _x,
            _y
        ];
    }
    function get() {
        return state;
    }
    return {
        down,
        move,
        up,
        scale,
        get
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cHCrs":[function(require,module,exports) {
/**
 * Provides set of sequential, diverging, and categorical color schemes and
 * corresponding interpolation functions.
 *
 * Each color scheme is encoded as an array of all unique values in particular
 * order. For sets of 3-9 colors, a mask is applied to pick certain subset from
 * the array.
 *
 * Base 2 and base 16 numbers syntax is used for clarity, the values are
 * converted to base 10 in build time.
 *
 * Colormap schemes interpolator use polynomial approximation. Coefficients take
 * a lot less space than full color list and computations are arguably trivial.
 * Polynomial order and float precision parameters are selected empirically, by
 * comparing color distance between original colors and approximated.
 *
 * All interpolating functions have their computations streamlined to improve
 * performance of generating large amount of colors during data viz rendering.
 *
 * @link https://colorbrewer2.org/
 * @link https://github.com/BIDS/colormap
 * @link https://kwstat.github.io/pals/
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "interpolateViridis", ()=>interpolateViridis);
parcelHelpers.export(exports, "interpolateInferno", ()=>interpolateInferno);
parcelHelpers.export(exports, "interpolateMagma", ()=>interpolateMagma);
parcelHelpers.export(exports, "interpolatePlasma", ()=>interpolatePlasma);
parcelHelpers.export(exports, "interpolateCividis", ()=>interpolateCividis);
parcelHelpers.export(exports, "interpolateCubicYF", ()=>interpolateCubicYF);
parcelHelpers.export(exports, "interpolateCubicL", ()=>interpolateCubicL);
parcelHelpers.export(exports, "interpolateParula", ()=>interpolateParula);
parcelHelpers.export(exports, "interpolateBlues", ()=>interpolateBlues);
parcelHelpers.export(exports, "schemeBlues", ()=>schemeBlues);
parcelHelpers.export(exports, "interpolateGreens", ()=>interpolateGreens);
parcelHelpers.export(exports, "schemeGreens", ()=>schemeGreens);
parcelHelpers.export(exports, "interpolateGreys", ()=>interpolateGreys);
parcelHelpers.export(exports, "schemeGreys", ()=>schemeGreys);
parcelHelpers.export(exports, "interpolateOranges", ()=>interpolateOranges);
parcelHelpers.export(exports, "schemeOranges", ()=>schemeOranges);
parcelHelpers.export(exports, "interpolatePurples", ()=>interpolatePurples);
parcelHelpers.export(exports, "schemePurples", ()=>schemePurples);
parcelHelpers.export(exports, "interpolateReds", ()=>interpolateReds);
parcelHelpers.export(exports, "schemeReds", ()=>schemeReds);
parcelHelpers.export(exports, "interpolateBuGn", ()=>interpolateBuGn);
parcelHelpers.export(exports, "schemeBuGn", ()=>schemeBuGn);
parcelHelpers.export(exports, "interpolateBuPu", ()=>interpolateBuPu);
parcelHelpers.export(exports, "schemeBuPu", ()=>schemeBuPu);
parcelHelpers.export(exports, "interpolateGnBu", ()=>interpolateGnBu);
parcelHelpers.export(exports, "schemeGnBu", ()=>schemeGnBu);
parcelHelpers.export(exports, "interpolateOrRd", ()=>interpolateOrRd);
parcelHelpers.export(exports, "schemeOrRd", ()=>schemeOrRd);
parcelHelpers.export(exports, "interpolatePuBu", ()=>interpolatePuBu);
parcelHelpers.export(exports, "schemePuBu", ()=>schemePuBu);
parcelHelpers.export(exports, "interpolatePuBuGn", ()=>interpolatePuBuGn);
parcelHelpers.export(exports, "schemePuBuGn", ()=>schemePuBuGn);
parcelHelpers.export(exports, "interpolatePuRd", ()=>interpolatePuRd);
parcelHelpers.export(exports, "schemePuRd", ()=>schemePuRd);
parcelHelpers.export(exports, "interpolateRdPu", ()=>interpolateRdPu);
parcelHelpers.export(exports, "schemeRdPu", ()=>schemeRdPu);
parcelHelpers.export(exports, "interpolateYlGn", ()=>interpolateYlGn);
parcelHelpers.export(exports, "schemeYlGn", ()=>schemeYlGn);
parcelHelpers.export(exports, "interpolateYlGnBu", ()=>interpolateYlGnBu);
parcelHelpers.export(exports, "schemeYlGnBu", ()=>schemeYlGnBu);
parcelHelpers.export(exports, "interpolateYlOrBr", ()=>interpolateYlOrBr);
parcelHelpers.export(exports, "schemeYlOrBr", ()=>schemeYlOrBr);
parcelHelpers.export(exports, "interpolateYlOrRd", ()=>interpolateYlOrRd);
parcelHelpers.export(exports, "schemeYlOrRd", ()=>schemeYlOrRd);
parcelHelpers.export(exports, "interpolateBrBG", ()=>interpolateBrBG);
parcelHelpers.export(exports, "schemeBrBG", ()=>schemeBrBG);
parcelHelpers.export(exports, "interpolatePiYG", ()=>interpolatePiYG);
parcelHelpers.export(exports, "schemePiYG", ()=>schemePiYG);
parcelHelpers.export(exports, "interpolatePRGn", ()=>interpolatePRGn);
parcelHelpers.export(exports, "schemePRGn", ()=>schemePRGn);
parcelHelpers.export(exports, "interpolatePuOr", ()=>interpolatePuOr);
parcelHelpers.export(exports, "schemePuOr", ()=>schemePuOr);
parcelHelpers.export(exports, "interpolateRdBu", ()=>interpolateRdBu);
parcelHelpers.export(exports, "schemeRdBu", ()=>schemeRdBu);
parcelHelpers.export(exports, "interpolateRdGy", ()=>interpolateRdGy);
parcelHelpers.export(exports, "schemeRdGy", ()=>schemeRdGy);
parcelHelpers.export(exports, "interpolateRdYlBu", ()=>interpolateRdYlBu);
parcelHelpers.export(exports, "schemeRdYlBu", ()=>schemeRdYlBu);
parcelHelpers.export(exports, "interpolateRdYlGn", ()=>interpolateRdYlGn);
parcelHelpers.export(exports, "schemeRdYlGn", ()=>schemeRdYlGn);
parcelHelpers.export(exports, "interpolateSpectral", ()=>interpolateSpectral);
parcelHelpers.export(exports, "schemeSpectral", ()=>schemeSpectral);
/** Categorical */ parcelHelpers.export(exports, "schemeObservable10", ()=>schemeObservable10);
/** Categorical */ parcelHelpers.export(exports, "schemeTableau10", ()=>schemeTableau10);
let interpolateViridis = /*#__PURE__*/ polynomial(// Original colors: https://github.com/BIDS/colormap
// Parameters: order=7, precision=2
// Red
[
    16957.39,
    -60736.03,
    83337.5,
    -55355.41,
    19460.21,
    -3771.31,
    296.25,
    65.44
], // Green
[
    1724.54,
    -4852.29,
    4845.96,
    -2181.18,
    630.01,
    -320.27,
    383.44,
    1.01
], // Blue
[
    9258.26,
    -25704.51,
    28181.52,
    -16638.84,
    6345.73,
    -1990.01,
    500.38,
    82.35
]);
let interpolateInferno = /*#__PURE__*/ polynomial(// Original colors: https://github.com/BIDS/colormap
// Parameters: order=7, precision=2
// Red
[
    -71.24,
    6647.96,
    -18523.38,
    19914.36,
    -10722.55,
    2977.86,
    25.87,
    0.07
], // Green
[
    12230.15,
    -45922.17,
    67532.69,
    -49585.83,
    19332.96,
    -3666.46,
    338.28,
    -2.86
], // Blue
[
    -53493.91,
    181334.18,
    -240309.72,
    158640.3,
    -53705.14,
    7488.14,
    202.15,
    4.88
]);
let interpolateMagma = /*#__PURE__*/ polynomial(// Original colors: https://github.com/BIDS/colormap
// Parameters: order=7, precision=2
// Red
[
    -13521.4,
    52084.29,
    -78428.52,
    58703.97,
    -23507.48,
    5068.81,
    -150.45,
    3.1
], // Green
[
    23630.62,
    -85637.14,
    121853.49,
    -86469.78,
    32387.71,
    -6056.13,
    551.65,
    -6.51
], // Blue
[
    -20464.29,
    70204.47,
    -98021.14,
    71997.07,
    -28380.16,
    4534.44,
    311.92,
    3.05
]);
let interpolatePlasma = /*#__PURE__*/ polynomial(// Original colors: https://github.com/BIDS/colormap
// Parameters: order=7, precision=2
// Red
[
    6471.17,
    -23573.18,
    33883.87,
    -24549.69,
    9428.06,
    -2083.92,
    648.9,
    14.6
], // Green
[
    8986.05,
    -37294.34,
    61729.18,
    -51246.62,
    21722.58,
    -3856.85,
    204.85,
    3.92
], // Blue
[
    -3179.13,
    15766.27,
    -29171.99,
    25998.34,
    -11133.67,
    1484.03,
    139.06,
    137.25
]);
let interpolateCividis = /*#__PURE__*/ polynomial(// Parameters: order=7, precision=2
// Red
[
    -17070.75,
    67998.61,
    -110138.35,
    92449.42,
    -42132.31,
    9815.83,
    -673.76,
    8.46
], // Green
[
    227.62,
    -660.71,
    627.11,
    -124.51,
    -101.01,
    64.65,
    168.28,
    32.56
], // Blue
[
    8224.75,
    -35536.65,
    62558.78,
    -57224.69,
    28412.19,
    -7315.71,
    873.65,
    72.15
]);
/**
 * Create color interpolator using polynomial equations for RGB color channels.
 *
 * @param {number[]} r
 * @param {number[]} g
 * @param {number[]} b
 * @returns {(t: number) => string}
 */ function polynomial(r, g, b) {
    /* In order to create an interpolator for RGB colors, this function receives
  coefficients for RGB channels and generate an equation for each of them. */ return new Function("t", `return \`rgb(\${${eq(r)}},\${${eq(g)}},\${${eq(b)}})\``);
}
/** @param {number[]} coefficients */ function eq(coefficients) {
    return `Math.max(0,Math.min(${coefficients.reduce((eq, coeff, index)=>{
        return index == 0 ? coeff : `(${eq})*t+${coeff}`;
    })},255))`;
}
let interpolateCubicYF = /*#__PURE__*/ polynomial(// Original colors: https://kwstat.github.io/pals/
// Parameters: order=7, precision=3
// Red
[
    -15890.208,
    54233.182,
    -73123.505,
    48310.946,
    -14896.485,
    1532.012,
    -98.946,
    133.229
], // Green
[
    7059.036,
    -25395.384,
    36237.157,
    -26058.931,
    9910.958,
    -2159.478,
    633.237,
    9.724
], // Blue
[
    -24095.262,
    79705.687,
    -105665.816,
    71792.702,
    -24840.466,
    2577.129,
    436.488,
    170.954
]);
let interpolateCubicL = /*#__PURE__*/ polynomial(// Original colors: https://kwstat.github.io/pals/
// Parameters: order=8, precision=3
// Red
[
    -8221.834,
    39379.625,
    -68167.58,
    54080.007,
    -22463.754,
    8089.739,
    -2892.462,
    329.36,
    117.994
], // Green
[
    55242.794,
    -228988.012,
    395122.356,
    -368687.14,
    201277.545,
    -64530.68,
    10974.981,
    -263.316,
    2.527
], // Blue
[
    20312.788,
    -63703.552,
    87157.261,
    -81632.914,
    59694.364,
    -25426.31,
    2942.119,
    619.139,
    132.898
]);
let interpolateParula = /*#__PURE__*/ polynomial(// Original colors: https://kwstat.github.io/pals/
// Parameters: order=9, precision=3
// Red
[
    925236.406,
    -4272669.556,
    8266083.013,
    -8669981.892,
    5325703.379,
    -1931522.36,
    396943.916,
    -40968.211,
    1388.926,
    43.345
], // Green
[
    -93274.209,
    415093.675,
    -786992.03,
    827096.091,
    -521433.393,
    198282.756,
    -43249.824,
    4421.72,
    261.786,
    41.701
], // Blue
[
    -488959.997,
    2249229.641,
    -4310238.101,
    4448116.698,
    -2664852.122,
    927315.193,
    -173929.655,
    12682.222,
    511.514,
    135.402
]);
/**
 * Each color scheme has the number of unique colors and uses the same rule for
 * picking colors for 3-9 color subsets. Thus, the same bitsets can be applied.
 */ let setSequential = [
    292,
    594,
    1362,
    1386,
    2794,
    2797,
    5869
];
let setDiverging = [
    1168,
    4644,
    4772,
    9554,
    9682,
    11114,
    11242,
    27499,
    27627
];
let colorBlues = [
    0xf7fbff,
    0xeff3ff,
    0xdeebf7,
    0xc6dbef,
    0xbdd7e7,
    0x9ecae1,
    0x6baed6,
    0x4292c6,
    0x3182bd,
    0x2171b5,
    0x08519c,
    0x084594,
    0x08306b
];
let interpolateBlues = /*#__PURE__*/ spline(colorBlues, setSequential, 3, 9);
let schemeBlues = /*#__PURE__*/ scheme(colorBlues, setSequential, 3, 9);
let colorGreens = [
    0xf7fcf5,
    0xedf8e9,
    0xe5f5e0,
    0xc7e9c0,
    0xbae4b3,
    0xa1d99b,
    0x74c476,
    0x41ab5d,
    0x31a354,
    0x238b45,
    0x006d2c,
    0x005a32,
    0x00441b
];
let interpolateGreens = /*#__PURE__*/ spline(colorGreens, setSequential, 3, 9);
let schemeGreens = /*#__PURE__*/ scheme(colorGreens, setSequential, 3, 9);
let colorGreys = [
    0xffffff,
    0xf7f7f7,
    0xf0f0f0,
    0xd9d9d9,
    0xcccccc,
    0xbdbdbd,
    0x969696,
    0x737373,
    0x636363,
    0x525252,
    0x252525,
    0x252525,
    0x000000
];
let interpolateGreys = /*#__PURE__*/ spline(colorGreys, setSequential, 3, 9);
let schemeGreys = /*#__PURE__*/ scheme(colorGreys, setSequential, 3, 9);
let colorOranges = [
    0xfff5eb,
    0xfeedde,
    0xfee6ce,
    0xfdd0a2,
    0xfdbe85,
    0xfdae6b,
    0xfd8d3c,
    0xf16913,
    0xe6550d,
    0xd94801,
    0xa63603,
    0x8c2d04,
    0x7f2704
];
let interpolateOranges = /*#__PURE__*/ spline(colorOranges, setSequential, 3, 9);
let schemeOranges = /*#__PURE__*/ scheme(colorOranges, setSequential, 3, 9);
let colorPurples = [
    0xfcfbfd,
    0xf2f0f7,
    0xefedf5,
    0xdadaeb,
    0xcbc9e2,
    0xbcbddc,
    0x9e9ac8,
    0x807dba,
    0x756bb1,
    0x6a51a3,
    0x54278f,
    0x4a1486,
    0x3f007d
];
let interpolatePurples = /*#__PURE__*/ spline(colorPurples, setSequential, 3, 9);
let schemePurples = /*#__PURE__*/ scheme(colorPurples, setSequential, 3, 9);
let colorReds = [
    0xfff5f0,
    0xfee5d9,
    0xfee0d2,
    0xfcbba1,
    0xfcae91,
    0xfc9272,
    0xfb6a4a,
    0xef3b2c,
    0xde2d26,
    0xcb181d,
    0xa50f15,
    0x99000d,
    0x67000d
];
let interpolateReds = /*#__PURE__*/ spline(colorReds, setSequential, 3, 9);
let schemeReds = /*#__PURE__*/ scheme(colorReds, setSequential, 3, 9);
let colorBuGn = [
    0xf7fcfd,
    0xedf8fb,
    0xe5f5f9,
    0xccece6,
    0xb2e2e2,
    0x99d8c9,
    0x66c2a4,
    0x41ae76,
    0x2ca25f,
    0x238b45,
    0x006d2c,
    0x005824,
    0x00441b
];
let interpolateBuGn = /*#__PURE__*/ spline(colorBuGn, setSequential, 3, 9);
let schemeBuGn = /*#__PURE__*/ scheme(colorBuGn, setSequential, 3, 9);
let colorBuPu = [
    0xf7fcfd,
    0xedf8fb,
    0xe0ecf4,
    0xbfd3e6,
    0xb3cde3,
    0x9ebcda,
    0x8c96c6,
    0x8c6bb1,
    0x8856a7,
    0x88419d,
    0x810f7c,
    0x6e016b,
    0x4d004b
];
let interpolateBuPu = /*#__PURE__*/ spline(colorBuPu, setSequential, 3, 9);
let schemeBuPu = /*#__PURE__*/ scheme(colorBuPu, setSequential, 3, 9);
let colorGnBu = [
    0xf7fcf0,
    0xf0f9e8,
    0xe0f3db,
    0xccebc5,
    0xbae4bc,
    0xa8ddb5,
    0x7bccc4,
    0x4eb3d3,
    0x43a2ca,
    0x2b8cbe,
    0x0868ac,
    0x08589e,
    0x084081
];
let interpolateGnBu = /*#__PURE__*/ spline(colorGnBu, setSequential, 3, 9);
let schemeGnBu = /*#__PURE__*/ scheme(colorGnBu, setSequential, 3, 9);
let colorOrRd = [
    0xfff7ec,
    0xfef0d9,
    0xfee8c8,
    0xfdd49e,
    0xfdcc8a,
    0xfdbb84,
    0xfc8d59,
    0xef6548,
    0xe34a33,
    0xd7301f,
    0xb30000,
    0x990000,
    0x7f0000
];
let interpolateOrRd = /*#__PURE__*/ spline(colorOrRd, setSequential, 3, 9);
let schemeOrRd = /*#__PURE__*/ scheme(colorOrRd, setSequential, 3, 9);
let colorPuBu = [
    0xfff7fb,
    0xf1eef6,
    0xece7f2,
    0xd0d1e6,
    0xbdc9e1,
    0xa6bddb,
    0x74a9cf,
    0x3690c0,
    0x2b8cbe,
    0x0570b0,
    0x045a8d,
    0x034e7b,
    0x023858
];
let interpolatePuBu = /*#__PURE__*/ spline(colorPuBu, setSequential, 3, 9);
let schemePuBu = /*#__PURE__*/ scheme(colorPuBu, setSequential, 3, 9);
let colorPuBuGn = [
    0xfff7fb,
    0xf6eff7,
    0xece2f0,
    0xd0d1e6,
    0xbdc9e1,
    0xa6bddb,
    0x67a9cf,
    0x3690c0,
    0x1c9099,
    0x02818a,
    0x016c59,
    0x016450,
    0x014636
];
let interpolatePuBuGn = /*#__PURE__*/ spline(colorPuBuGn, setSequential, 3, 9);
let schemePuBuGn = /*#__PURE__*/ scheme(colorPuBuGn, setSequential, 3, 9);
let colorPuRd = [
    0xf7f4f9,
    0xf1eef6,
    0xe7e1ef,
    0xd4b9da,
    0xd7b5d8,
    0xc994c7,
    0xdf65b0,
    0xe7298a,
    0xdd1c77,
    0xce1256,
    0x980043,
    0x91003f,
    0x67001f
];
let interpolatePuRd = /*#__PURE__*/ spline(colorPuRd, setSequential, 3, 9);
let schemePuRd = /*#__PURE__*/ scheme(colorPuRd, setSequential, 3, 9);
let colorRdPu = [
    0xfff7f3,
    0xfeebe2,
    0xfde0dd,
    0xfcc5c0,
    0xfbb4b9,
    0xfa9fb5,
    0xf768a1,
    0xdd3497,
    0xc51b8a,
    0xae017e,
    0x7a0177,
    0x7a0177,
    0x49006a
];
let interpolateRdPu = /*#__PURE__*/ spline(colorRdPu, setSequential, 3, 9);
let schemeRdPu = /*#__PURE__*/ scheme(colorRdPu, setSequential, 3, 9);
let colorYlGn = [
    0xffffe5,
    0xffffcc,
    0xf7fcb9,
    0xd9f0a3,
    0xc2e699,
    0xaddd8e,
    0x78c679,
    0x41ab5d,
    0x31a354,
    0x238443,
    0x006837,
    0x005a32,
    0x004529
];
let interpolateYlGn = /*#__PURE__*/ spline(colorYlGn, setSequential, 3, 9);
let schemeYlGn = /*#__PURE__*/ scheme(colorYlGn, setSequential, 3, 9);
let colorYlGnBu = [
    0xffffd9,
    0xffffcc,
    0xedf8b1,
    0xc7e9b4,
    0xa1dab4,
    0x7fcdbb,
    0x41b6c4,
    0x1d91c0,
    0x2c7fb8,
    0x225ea8,
    0x253494,
    0x0c2c84,
    0x081d58
];
let interpolateYlGnBu = /*#__PURE__*/ spline(colorYlGnBu, setSequential, 3, 9);
let schemeYlGnBu = /*#__PURE__*/ scheme(colorYlGnBu, setSequential, 3, 9);
let colorYlOrBr = [
    0xffffe5,
    0xffffd4,
    0xfff7bc,
    0xfee391,
    0xfed98e,
    0xfec44f,
    0xfe9929,
    0xec7014,
    0xd95f0e,
    0xcc4c02,
    0x993404,
    0x8c2d04,
    0x662506
];
let interpolateYlOrBr = /*#__PURE__*/ spline(colorYlOrBr, setSequential, 3, 9);
let schemeYlOrBr = /*#__PURE__*/ scheme(colorYlOrBr, setSequential, 3, 9);
let colorYlOrRd = [
    0xffffcc,
    0xffffb2,
    0xffeda0,
    0xfed976,
    0xfecc5c,
    0xfeb24c,
    0xfd8d3c,
    0xfc4e2a,
    0xf03b20,
    0xe31a1c,
    0xbd0026,
    0xb10026,
    0x800026
];
let interpolateYlOrRd = /*#__PURE__*/ spline(colorYlOrRd, setSequential, 3, 9);
let schemeYlOrRd = /*#__PURE__*/ scheme(colorYlOrRd, setSequential, 3, 9);
let colorBrBG = [
    0x543005,
    0x8c510a,
    0xa6611a,
    0xbf812d,
    0xd8b365,
    0xdfc27d,
    0xf6e8c3,
    0xf5f5f5,
    0xc7eae5,
    0x80cdc1,
    0x5ab4ac,
    0x35978f,
    0x018571,
    0x01665e,
    0x003c30
];
let interpolateBrBG = /*#__PURE__*/ spline(colorBrBG, setDiverging, 3, 11);
let schemeBrBG = /*#__PURE__*/ scheme(colorBrBG, setDiverging, 3, 11);
let colorPiYG = [
    0x8e0152,
    0xc51b7d,
    0xd01c8b,
    0xde77ae,
    0xe9a3c9,
    0xf1b6da,
    0xfde0ef,
    0xf7f7f7,
    0xe6f5d0,
    0xb8e186,
    0xa1d76a,
    0x7fbc41,
    0x4dac26,
    0x4d9221,
    0x276419
];
let interpolatePiYG = /*#__PURE__*/ spline(colorPiYG, setDiverging, 3, 11);
let schemePiYG = /*#__PURE__*/ scheme(colorPiYG, setDiverging, 3, 11);
let colorPRGn = [
    0x40004b,
    0x762a83,
    0x7b3294,
    0x9970ab,
    0xaf8dc3,
    0xc2a5cf,
    0xe7d4e8,
    0xf7f7f7,
    0xd9f0d3,
    0xa6dba0,
    0x7fbf7b,
    0x5aae61,
    0x008837,
    0x1b7837,
    0x00441b
];
let interpolatePRGn = /*#__PURE__*/ spline(colorPRGn, setDiverging, 3, 11);
let schemePRGn = /*#__PURE__*/ scheme(colorPRGn, setDiverging, 3, 11);
let colorPuOr = [
    0x7f3b08,
    0xb35806,
    0xe66101,
    0xe08214,
    0xf1a340,
    0xfdb863,
    0xfee0b6,
    0xf7f7f7,
    0xd8daeb,
    0xb2abd2,
    0x998ec3,
    0x8073ac,
    0x5e3c99,
    0x542788,
    0x2d004b
];
let interpolatePuOr = /*#__PURE__*/ spline(colorPuOr, setDiverging, 3, 11);
let schemePuOr = /*#__PURE__*/ scheme(colorPuOr, setDiverging, 3, 11);
let colorRdBu = [
    0x67001f,
    0xb2182b,
    0xca0020,
    0xd6604d,
    0xef8a62,
    0xf4a582,
    0xfddbc7,
    0xf7f7f7,
    0xd1e5f0,
    0x92c5de,
    0x67a9cf,
    0x4393c3,
    0x0571b0,
    0x2166ac,
    0x053061
];
let interpolateRdBu = /*#__PURE__*/ spline(colorRdBu, setDiverging, 3, 11);
let schemeRdBu = /*#__PURE__*/ scheme(colorRdBu, setDiverging, 3, 11);
let colorRdGy = [
    0x67001f,
    0xb2182b,
    0xca0020,
    0xd6604d,
    0xef8a62,
    0xf4a582,
    0xfddbc7,
    0xffffff,
    0xe0e0e0,
    0xbababa,
    0x999999,
    0x878787,
    0x404040,
    0x4d4d4d,
    0x1a1a1a
];
let interpolateRdGy = /*#__PURE__*/ spline(colorRdGy, setDiverging, 3, 11);
let schemeRdGy = /*#__PURE__*/ scheme(colorRdGy, setDiverging, 3, 11);
let colorRdYlBu = [
    0xa50026,
    0xd73027,
    0xd7191c,
    0xf46d43,
    0xfc8d59,
    0xfdae61,
    0xfee090,
    0xffffbf,
    0xe0f3f8,
    0xabd9e9,
    0x91bfdb,
    0x74add1,
    0x2c7bb6,
    0x4575b4,
    0x313695
];
let interpolateRdYlBu = /*#__PURE__*/ spline(colorRdYlBu, setDiverging, 3, 11);
let schemeRdYlBu = /*#__PURE__*/ scheme(colorRdYlBu, setDiverging, 3, 11);
let colorRdYlGn = [
    0xa50026,
    0xd73027,
    0xd7191c,
    0xf46d43,
    0xfc8d59,
    0xfdae61,
    0xfee08b,
    0xffffbf,
    0xd9ef8b,
    0xa6d96a,
    0x91cf60,
    0x66bd63,
    0x1a9641,
    0x1a9850,
    0x006837
];
let interpolateRdYlGn = /*#__PURE__*/ spline(colorRdYlGn, setDiverging, 3, 11);
let schemeRdYlGn = /*#__PURE__*/ scheme(colorRdYlGn, setDiverging, 3, 11);
let colorSpectral = [
    0x9e0142,
    0xd53e4f,
    0xd7191c,
    0xf46d43,
    0xfc8d59,
    0xfdae61,
    0xfee08b,
    0xffffbf,
    0xe6f598,
    0xabdda4,
    0x99d594,
    0x66c2a5,
    0x2b83ba,
    0x3288bd,
    0x5e4fa2
];
let interpolateSpectral = /*#__PURE__*/ spline(colorSpectral, setDiverging, 3, 11);
let schemeSpectral = /*#__PURE__*/ scheme(colorSpectral, setDiverging, 3, 11);
let colorObservable10 = [
    0x4269d0,
    0xefb118,
    0xff725c,
    0x6cc5b0,
    0x3ca951,
    0xff8ab7,
    0xa463f2,
    0x97bbf5,
    0x9c6b4e,
    0x9498a0
];
function schemeObservable10() {
    return colorObservable10.map((hex)=>"#" + hex.toString(16).padStart(6, "0"));
}
let colorTableau10 = [
    0x4e79a7,
    0xf28e2c,
    0xe15759,
    0x76b7b2,
    0x59a14f,
    0xedc949,
    0xaf7aa1,
    0xff9da7,
    0x9c755f,
    0xbab0ab
];
function schemeTableau10() {
    return colorTableau10.map((hex)=>"#" + hex.toString(16).padStart(6, "0"));
}
function scheme(palette, sets, min, max) {
    /** @param {number} n */ return (n)=>{
        if (n < min || n > max) throw new Error(`Number of colors in scheme must be between ${min} and ${max}`);
        let bits = sets[n - min];
        let colors = [];
        for(let counter = 0; bits > 0; counter++, bits >>= 1)if (bits % 2 !== 0) colors.push("#" + palette[counter].toString(16).padStart(6, "0"));
        return colors;
    };
}
function spline(palette, sets, min, max) {
    /* Interpolator function is built using `max` piece color scheme. */ let bits = sets[max - min];
    let colors = new Uint32Array(max);
    for(let counter = 0, cursor = 0; bits > 0; counter++, bits >>= 1)if (bits % 2 !== 0) colors[cursor++] = palette[counter];
    /** @param {number} t */ return (t)=>"#" + interpolateHex(colors, t).toString(16).padStart(6, "0");
}
/**
 * Uniform B-spline with coefficients suitable for colors with 9 control points.
 * Adopted from d3-interpolate and d3-scale-chromatic ISC License, Mike Bostock
 *
 * @param {number[]} values Set of colors represented in hex
 * @param {number} t Normalized [0..1] value
 * @returns {number} Interpolated color in hex format
 */ function interpolateHex(values, t) {
    /* Array of values must contain hex representation of colors. The result of
  the function is hex as well. Besides uniform B-spline implementation, key
  elements are following:

    1. `(value >> shift) & 255` decodes a channel (R/G/B) value out of hex.
       Shift is 16 for Red, 8 for Green, 0 for Blue
    2. `max(0, min(round(value), 255))` ensures the interpolated value is an
       8 bit integer that represents color channel.
    3. Each interpolated channel is shifted back in their position in hex
       format, and the result is composed as `r | g | b` expression.
  */ let result = 0; // rgb: new Float32Array(3)
    let n = values.length - 1;
    let i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n);
    for(let shift = 0; shift <= 16; shift += 8){
        let v1 = values[i] >> shift & 255;
        let v2 = values[i + 1] >> shift & 255;
        let v0 = i > 0 ? values[i - 1] >> shift & 255 : 2 * v1 - v2;
        let v3 = i < n - 1 ? values[i + 2] >> shift & 255 : 2 * v2 - v1;
        let t1 = (t - i / n) * n;
        let t2 = t1 * t1;
        let t3 = t2 * t1;
        // prettier-ignore
        let channel = ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
        result |= Math.max(0, Math.min(Math.round(channel), 255)) << shift;
    }
    return result;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["hK5U4"], null, "parcelRequire3801")

//# sourceMappingURL=colors.7856946e.js.map

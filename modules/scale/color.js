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
 * @link https://colorbrewer2.org/
 */

/**
 * Each color scheme has the number of unique colors and uses the same rule for
 * picking colors for 3-9 color subsets. Thus, the same bitsets can be applied.
 */
let setSequential = [
  0b0000100100100, 0b0001001010010, 0b0010101010010, 0b0010101101010, 0b0101011101010,
  0b0101011101101, 0b1011011101101,
];

let setDiverging = [
  0b000010010010000, 0b001001000100100, 0b001001010100100, 0b010010101010010, 0b010010111010010,
  0b010101101101010, 0b010101111101010, 0b110101101101011, 0b110101111101011,
];

let colorBlues = [
  0xf7fbff, 0xeff3ff, 0xdeebf7, 0xc6dbef, 0xbdd7e7, 0x9ecae1, 0x6baed6, 0x4292c6, 0x3182bd,
  0x2171b5, 0x08519c, 0x084594, 0x08306b,
];
/** Sequential */
export let interpolateBlues = /*#__PURE__*/ spline(colorBlues, setSequential, 3, 9);
/** Sequential */
export let schemeBlues = /*#__PURE__*/ scheme(colorBlues, setSequential, 3, 9);

let colorGreens = [
  0xf7fcf5, 0xedf8e9, 0xe5f5e0, 0xc7e9c0, 0xbae4b3, 0xa1d99b, 0x74c476, 0x41ab5d, 0x31a354,
  0x238b45, 0x006d2c, 0x005a32, 0x00441b,
];
/** Sequential */
export let interpolateGreens = /*#__PURE__*/ spline(colorGreens, setSequential, 3, 9);
/** Sequential */
export let schemeGreens = /*#__PURE__*/ scheme(colorGreens, setSequential, 3, 9);

let colorGreys = [
  0xffffff, 0xf7f7f7, 0xf0f0f0, 0xd9d9d9, 0xcccccc, 0xbdbdbd, 0x969696, 0x737373, 0x636363,
  0x525252, 0x252525, 0x252525, 0x000000,
];
/** Sequential */
export let interpolateGreys = /*#__PURE__*/ spline(colorGreys, setSequential, 3, 9);
/** Sequential */
export let schemeGreys = /*#__PURE__*/ scheme(colorGreys, setSequential, 3, 9);

let colorOranges = [
  0xfff5eb, 0xfeedde, 0xfee6ce, 0xfdd0a2, 0xfdbe85, 0xfdae6b, 0xfd8d3c, 0xf16913, 0xe6550d,
  0xd94801, 0xa63603, 0x8c2d04, 0x7f2704,
];
/** Sequential */
export let interpolateOranges = /*#__PURE__*/ spline(colorOranges, setSequential, 3, 9);
/** Sequential */
export let schemeOranges = /*#__PURE__*/ scheme(colorOranges, setSequential, 3, 9);

let colorPurples = [
  0xfcfbfd, 0xf2f0f7, 0xefedf5, 0xdadaeb, 0xcbc9e2, 0xbcbddc, 0x9e9ac8, 0x807dba, 0x756bb1,
  0x6a51a3, 0x54278f, 0x4a1486, 0x3f007d,
];
/** Sequential */
export let interpolatePurples = /*#__PURE__*/ spline(colorPurples, setSequential, 3, 9);
/** Sequential */
export let schemePurples = /*#__PURE__*/ scheme(colorPurples, setSequential, 3, 9);

let colorReds = [
  0xfff5f0, 0xfee5d9, 0xfee0d2, 0xfcbba1, 0xfcae91, 0xfc9272, 0xfb6a4a, 0xef3b2c, 0xde2d26,
  0xcb181d, 0xa50f15, 0x99000d, 0x67000d,
];
/** Sequential */
export let interpolateReds = /*#__PURE__*/ spline(colorReds, setSequential, 3, 9);
/** Sequential */
export let schemeReds = /*#__PURE__*/ scheme(colorReds, setSequential, 3, 9);

let colorBuGn = [
  0xf7fcfd, 0xedf8fb, 0xe5f5f9, 0xccece6, 0xb2e2e2, 0x99d8c9, 0x66c2a4, 0x41ae76, 0x2ca25f,
  0x238b45, 0x006d2c, 0x005824, 0x00441b,
];
/** Sequential */
export let interpolateBuGn = /*#__PURE__*/ spline(colorBuGn, setSequential, 3, 9);
/** Sequential */
export let schemeBuGn = /*#__PURE__*/ scheme(colorBuGn, setSequential, 3, 9);

let colorBuPu = [
  0xf7fcfd, 0xedf8fb, 0xe0ecf4, 0xbfd3e6, 0xb3cde3, 0x9ebcda, 0x8c96c6, 0x8c6bb1, 0x8856a7,
  0x88419d, 0x810f7c, 0x6e016b, 0x4d004b,
];
/** Sequential */
export let interpolateBuPu = /*#__PURE__*/ spline(colorBuPu, setSequential, 3, 9);
/** Sequential */
export let schemeBuPu = /*#__PURE__*/ scheme(colorBuPu, setSequential, 3, 9);

let colorGnBu = [
  0xf7fcf0, 0xf0f9e8, 0xe0f3db, 0xccebc5, 0xbae4bc, 0xa8ddb5, 0x7bccc4, 0x4eb3d3, 0x43a2ca,
  0x2b8cbe, 0x0868ac, 0x08589e, 0x084081,
];
/** Sequential */
export let interpolateGnBu = /*#__PURE__*/ spline(colorGnBu, setSequential, 3, 9);
/** Sequential */
export let schemeGnBu = /*#__PURE__*/ scheme(colorGnBu, setSequential, 3, 9);

let colorOrRd = [
  0xfff7ec, 0xfef0d9, 0xfee8c8, 0xfdd49e, 0xfdcc8a, 0xfdbb84, 0xfc8d59, 0xef6548, 0xe34a33,
  0xd7301f, 0xb30000, 0x990000, 0x7f0000,
];
/** Sequential */
export let interpolateOrRd = /*#__PURE__*/ spline(colorOrRd, setSequential, 3, 9);
/** Sequential */
export let schemeOrRd = /*#__PURE__*/ scheme(colorOrRd, setSequential, 3, 9);

let colorPuBu = [
  0xfff7fb, 0xf1eef6, 0xece7f2, 0xd0d1e6, 0xbdc9e1, 0xa6bddb, 0x74a9cf, 0x3690c0, 0x2b8cbe,
  0x0570b0, 0x045a8d, 0x034e7b, 0x023858,
];
/** Sequential */
export let interpolatePuBu = /*#__PURE__*/ spline(colorPuBu, setSequential, 3, 9);
/** Sequential */
export let schemePuBu = /*#__PURE__*/ scheme(colorPuBu, setSequential, 3, 9);

let colorPuBuGn = [
  0xfff7fb, 0xf6eff7, 0xece2f0, 0xd0d1e6, 0xbdc9e1, 0xa6bddb, 0x67a9cf, 0x3690c0, 0x1c9099,
  0x02818a, 0x016c59, 0x016450, 0x014636,
];
/** Sequential */
export let interpolatePuBuGn = /*#__PURE__*/ spline(colorPuBuGn, setSequential, 3, 9);
/** Sequential */
export let schemePuBuGn = /*#__PURE__*/ scheme(colorPuBuGn, setSequential, 3, 9);

let colorPuRd = [
  0xf7f4f9, 0xf1eef6, 0xe7e1ef, 0xd4b9da, 0xd7b5d8, 0xc994c7, 0xdf65b0, 0xe7298a, 0xdd1c77,
  0xce1256, 0x980043, 0x91003f, 0x67001f,
];
/** Sequential */
export let interpolatePuRd = /*#__PURE__*/ spline(colorPuRd, setSequential, 3, 9);
/** Sequential */
export let schemePuRd = /*#__PURE__*/ scheme(colorPuRd, setSequential, 3, 9);

let colorRdPu = [
  0xfff7f3, 0xfeebe2, 0xfde0dd, 0xfcc5c0, 0xfbb4b9, 0xfa9fb5, 0xf768a1, 0xdd3497, 0xc51b8a,
  0xae017e, 0x7a0177, 0x7a0177, 0x49006a,
];
/** Sequential */
export let interpolateRdPu = /*#__PURE__*/ spline(colorRdPu, setSequential, 3, 9);
/** Sequential */
export let schemeRdPu = /*#__PURE__*/ scheme(colorRdPu, setSequential, 3, 9);

let colorYlGn = [
  0xffffe5, 0xffffcc, 0xf7fcb9, 0xd9f0a3, 0xc2e699, 0xaddd8e, 0x78c679, 0x41ab5d, 0x31a354,
  0x238443, 0x006837, 0x005a32, 0x004529,
];
/** Sequential */
export let interpolateYlGn = /*#__PURE__*/ spline(colorYlGn, setSequential, 3, 9);
/** Sequential */
export let schemeYlGn = /*#__PURE__*/ scheme(colorYlGn, setSequential, 3, 9);

let colorYlGnBu = [
  0xffffd9, 0xffffcc, 0xedf8b1, 0xc7e9b4, 0xa1dab4, 0x7fcdbb, 0x41b6c4, 0x1d91c0, 0x2c7fb8,
  0x225ea8, 0x253494, 0x0c2c84, 0x081d58,
];
/** Sequential */
export let interpolateYlGnBu = /*#__PURE__*/ spline(colorYlGnBu, setSequential, 3, 9);
/** Sequential */
export let schemeYlGnBu = /*#__PURE__*/ scheme(colorYlGnBu, setSequential, 3, 9);

let colorYlOrBr = [
  0xffffe5, 0xffffd4, 0xfff7bc, 0xfee391, 0xfed98e, 0xfec44f, 0xfe9929, 0xec7014, 0xd95f0e,
  0xcc4c02, 0x993404, 0x8c2d04, 0x662506,
];
/** Sequential */
export let interpolateYlOrBr = /*#__PURE__*/ spline(colorYlOrBr, setSequential, 3, 9);
/** Sequential */
export let schemeYlOrBr = /*#__PURE__*/ scheme(colorYlOrBr, setSequential, 3, 9);

let colorYlOrRd = [
  0xffffcc, 0xffffb2, 0xffeda0, 0xfed976, 0xfecc5c, 0xfeb24c, 0xfd8d3c, 0xfc4e2a, 0xf03b20,
  0xe31a1c, 0xbd0026, 0xb10026, 0x800026,
];
/** Sequential */
export let interpolateYlOrRd = /*#__PURE__*/ spline(colorYlOrRd, setSequential, 3, 9);
/** Sequential */
export let schemeYlOrRd = /*#__PURE__*/ scheme(colorYlOrRd, setSequential, 3, 9);

let colorBrBG = [
  0x543005, 0x8c510a, 0xa6611a, 0xbf812d, 0xd8b365, 0xdfc27d, 0xf6e8c3, 0xf5f5f5, 0xc7eae5,
  0x80cdc1, 0x5ab4ac, 0x35978f, 0x018571, 0x01665e, 0x003c30,
];
/** Diverging */
export let interpolateBrBG = /*#__PURE__*/ spline(colorBrBG, setDiverging, 3, 11);
/** Diverging */
export let schemeBrBG = /*#__PURE__*/ scheme(colorBrBG, setDiverging, 3, 11);

let colorPiYG = [
  0x8e0152, 0xc51b7d, 0xd01c8b, 0xde77ae, 0xe9a3c9, 0xf1b6da, 0xfde0ef, 0xf7f7f7, 0xe6f5d0,
  0xb8e186, 0xa1d76a, 0x7fbc41, 0x4dac26, 0x4d9221, 0x276419,
];
/** Diverging */
export let interpolatePiYG = /*#__PURE__*/ spline(colorPiYG, setDiverging, 3, 11);
/** Diverging */
export let schemePiYG = /*#__PURE__*/ scheme(colorPiYG, setDiverging, 3, 11);

let colorPRGn = [
  0x40004b, 0x762a83, 0x7b3294, 0x9970ab, 0xaf8dc3, 0xc2a5cf, 0xe7d4e8, 0xf7f7f7, 0xd9f0d3,
  0xa6dba0, 0x7fbf7b, 0x5aae61, 0x008837, 0x1b7837, 0x00441b,
];
/** Diverging */
export let interpolatePRGn = /*#__PURE__*/ spline(colorPRGn, setDiverging, 3, 11);
/** Diverging */
export let schemePRGn = /*#__PURE__*/ scheme(colorPRGn, setDiverging, 3, 11);

let colorPuOr = [
  0x7f3b08, 0xb35806, 0xe66101, 0xe08214, 0xf1a340, 0xfdb863, 0xfee0b6, 0xf7f7f7, 0xd8daeb,
  0xb2abd2, 0x998ec3, 0x8073ac, 0x5e3c99, 0x542788, 0x2d004b,
];
/** Diverging */
export let interpolatePuOr = /*#__PURE__*/ spline(colorPuOr, setDiverging, 3, 11);
/** Diverging */
export let schemePuOr = /*#__PURE__*/ scheme(colorPuOr, setDiverging, 3, 11);

let colorRdBu = [
  0x67001f, 0xb2182b, 0xca0020, 0xd6604d, 0xef8a62, 0xf4a582, 0xfddbc7, 0xf7f7f7, 0xd1e5f0,
  0x92c5de, 0x67a9cf, 0x4393c3, 0x0571b0, 0x2166ac, 0x053061,
];
/** Diverging */
export let interpolateRdBu = /*#__PURE__*/ spline(colorRdBu, setDiverging, 3, 11);
/** Diverging */
export let schemeRdBu = /*#__PURE__*/ scheme(colorRdBu, setDiverging, 3, 11);

let colorRdGy = [
  0x67001f, 0xb2182b, 0xca0020, 0xd6604d, 0xef8a62, 0xf4a582, 0xfddbc7, 0xffffff, 0xe0e0e0,
  0xbababa, 0x999999, 0x878787, 0x404040, 0x4d4d4d, 0x1a1a1a,
];
/** Diverging */
export let interpolateRdGy = /*#__PURE__*/ spline(colorRdGy, setDiverging, 3, 11);
/** Diverging */
export let schemeRdGy = /*#__PURE__*/ scheme(colorRdGy, setDiverging, 3, 11);

let colorRdYlBu = [
  0xa50026, 0xd73027, 0xd7191c, 0xf46d43, 0xfc8d59, 0xfdae61, 0xfee090, 0xffffbf, 0xe0f3f8,
  0xabd9e9, 0x91bfdb, 0x74add1, 0x2c7bb6, 0x4575b4, 0x313695,
];
/** Diverging */
export let interpolateRdYlBu = /*#__PURE__*/ spline(colorRdYlBu, setDiverging, 3, 11);
/** Diverging */
export let schemeRdYlBu = /*#__PURE__*/ scheme(colorRdYlBu, setDiverging, 3, 11);

let colorRdYlGn = [
  0xa50026, 0xd73027, 0xd7191c, 0xf46d43, 0xfc8d59, 0xfdae61, 0xfee08b, 0xffffbf, 0xd9ef8b,
  0xa6d96a, 0x91cf60, 0x66bd63, 0x1a9641, 0x1a9850, 0x006837,
];
/** Diverging */
export let interpolateRdYlGn = /*#__PURE__*/ spline(colorRdYlGn, setDiverging, 3, 11);
/** Diverging */
export let schemeRdYlGn = /*#__PURE__*/ scheme(colorRdYlGn, setDiverging, 3, 11);

let colorSpectral = [
  0x9e0142, 0xd53e4f, 0xd7191c, 0xf46d43, 0xfc8d59, 0xfdae61, 0xfee08b, 0xffffbf, 0xe6f598,
  0xabdda4, 0x99d594, 0x66c2a5, 0x2b83ba, 0x3288bd, 0x5e4fa2,
];
/** Diverging */
export let interpolateSpectral = /*#__PURE__*/ spline(colorSpectral, setDiverging, 3, 11);
/** Diverging */
export let schemeSpectral = /*#__PURE__*/ scheme(colorSpectral, setDiverging, 3, 11);

let colorObservable10 = [
  0x4269d0, 0xefb118, 0xff725c, 0x6cc5b0, 0x3ca951, 0xff8ab7, 0xa463f2, 0x97bbf5, 0x9c6b4e,
  0x9498a0,
];
/** Categorical */
export function schemeObservable10() {
  return colorObservable10.map((hex) => "#" + hex.toString(16).padStart(6, "0"));
}

let colorTableau10 = [
  0x4e79a7, 0xf28e2c, 0xe15759, 0x76b7b2, 0x59a14f, 0xedc949, 0xaf7aa1, 0xff9da7, 0x9c755f,
  0xbab0ab,
];
/** Categorical */
export function schemeTableau10() {
  return colorTableau10.map((hex) => "#" + hex.toString(16).padStart(6, "0"));
}

function scheme(palette, sets, min, max) {
  /** @param {number} n */
  return (n) => {
    if (n < min || n > max) {
      throw new Error(`Number of colors in scheme must be between ${min} and ${max}`);
    }

    let bits = sets[n - min];
    let colors = [];
    for (let counter = 0; bits > 0; counter++, bits >>= 1) {
      if (bits % 2 !== 0) colors.push("#" + palette[counter].toString(16).padStart(6, "0"));
    }
    return colors;
  };
}

function spline(palette, sets, min, max) {
  /* Interpolator function is built using 9 piece color scheme. */
  let bits = sets[max - min];
  let colors = new Uint32Array(max);
  for (let counter = 0, cursor = 0; bits > 0; counter++, bits >>= 1) {
    if (bits % 2 !== 0) colors[cursor++] = palette[counter];
  }

  /** @param {number} t */
  return (t) => "#" + interpolateHex(colors, t).toString(16).padStart(6, "0");
}

/**
 * Uniform B-spline with coefficients suitable for colors with 9 control points.
 * Adopted from d3-interpolate and d3-scale-chromatic ISC License, Mike Bostock
 *
 * @param {number[]} values Set of colors represented in hex
 * @param {number} t Normalized [0..1] value
 * @returns {number} Interpolated color in hex format
 */
function interpolateHex(values, t) {
  /* Array of values must contain hex representation of colors. The result of
  the function is hex as well. Besides uniform B-spline implementation, key
  elements are following:

    1. `(value >> shift) & 255` decodes a channel (R/G/B) value out of hex.
       Shift is 16 for Red, 8 for Green, 0 for Blue
    2. `max(0, min(round(value), 255))` ensures the interpolated value is an
       8 bit integer that represents color channel. 
    3. Each interpolated channel is shifted back in their position in hex 
       format, and the result is composed as `r | g | b` expression.
  */
  let result = 0;
  let n = values.length - 1;
  let i = t <= 0 ? (t = 0) : t >= 1 ? ((t = 1), n - 1) : Math.floor(t * n);
  for (let shift = 0; shift <= 16; shift += 8) {
    let v1 = (values[i] >> shift) & 255;
    let v2 = (values[i + 1] >> shift) & 255;
    let v0 = i > 0 ? (values[i - 1] >> shift) & 255 : 2 * v1 - v2;
    let v3 = i < n - 1 ? (values[i + 2] >> shift) & 255 : 2 * v2 - v1;
    let t1 = (t - i / n) * n;
    let t2 = t1 * t1;
    let t3 = t2 * t1;
    // prettier-ignore
    let channel = ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
    result |= Math.max(0, Math.min(Math.round(channel), 255)) << shift;
  }
  return result;
}

<div align="center">
<h1>Vepr</h1>
<a href="https://emojipedia.org/boar/">
<img height="80" width="80" alt="boar" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/boar_1f417.png" />
</a>
<p>Vepr is a JavaScript library for exploratory data visualization.</p>
</div>

Vepr implements special protocol that allows declaring complex data visualizations in a scheme with
small footprint and being able to transfer the visualization to different environment (e.g. server →
browser, web worker → main thread).

## Installing

Vepr can be installed using NPM

```sh
npm install vepr
```

And used as a node module

```js
import { render, blueprint, dot } from "vepr";
```

Or accessed via CDNs like unpkg.com right in the browser environment

```html
<script type="module">
  import { render, blueprint, dot } from "https://unpkg.com/vepr@0.0.0";
</script>
```

Out of the box Vepr includes typing declarations for TypeScript (or TS Language Server, thus can be
leveraged in JS-only environment as well).

## Prior Art

Vepr is a research project that explores multidisciplinary nature of visual data exploration. We
explore how the tech can be put to the context to gain maximum performance and fluid interactivity.
Vepr is intended to be dependency-free to avoid accidental abstraction complexity. Derived code is
annotated with sources wherever possible.

As a research project, Vepr is not intended to fully replace existing and established solutions.
Vepr is inspired by findings and experience of many developers involved in creating these tools.

**[Vega](https://github.com/vega/vega)** introduces declarative format for interactive
visualizations. Being a plain JSON schema, the visualization declaration can be generated in variety
of environments and then visualized in the browser. Many different data viz libraries are built on
top of Vega grammars and are used a lot in Python notebooks. In comparison, Vepr implements a format
that does not expose underlying data so all data-related computations (aggregations, filtering,
sorting) can be done outside of browser environment (for performance purpose) thus significantly
reducing the declaration size while keeping the resulting visualization interactive and adaptive.

**[Plot](https://github.com/observablehq/plot)** is an exploratory visualization library optimized
for incremental progress. It is very ergonomic and has great defaults that provide faster feedback
cycle. Resulting visualization can be also well describe by the code generating it, which is used
efficiently in notebook environment. In comparison, Vepr is created with software engineers in mind
that don't necessarily know the nature of the data they work with (e.g. when creating a universal
dashboard for customers). Vepr may not be as expressive or may require explicit definitions for
things that would otherwise be inferred.

While Vepr is in active development phase, please consider using stable and well known solutions.

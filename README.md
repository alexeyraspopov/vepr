<div align="center">
<h1>Vepr</h1>
<a href="https://emojipedia.org/boar/">
<img height="80" width="80" alt="boar" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/boar_1f417.png" />
</a>
<p>Vepr is a JavaScript library for exploratory data visualization.</p>
</div>

Vepr implements special protocol that allows declaring complex data visualization while keeping
small declaration size and being able to transfer the visualization to different environment (e.g.
server → browser, web worker → main thread).

## Installing

Vepr can be installed using NPM

```
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

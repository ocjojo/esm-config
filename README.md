# ESM Config

Transform es module configs to cjs using rollup.
Use es modules syntax to write your configs.

Uses a modified version of rollups internal [loadConfigFile](loadconfig) function.

```js
const esmConfig = require("esm-config")

const config = esmConfig("/abs/path/to/config.js")
```

## Background 
Rollup configs can be written using es modules syntax, because rollup transforms them to CJS before using them.

[loadconfig]: https://github.com/rollup/rollup/blob/def3ae2b4d2e5fde0f28d5ff1bf92ab9a2899e28/bin/src/run/loadConfigFile.ts

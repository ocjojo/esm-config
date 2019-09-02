# ESM Config

Transform ES module configs to cjs using rollup.

## Why?

Since ES6 `import` and `export` are standard, yet there is still ~~no support~~ only experimental support in NodeJS.

Most of the time that is not a problem, since projects have a build step (webpack/rollup/babel) transforming the syntax. So people expect **import/export** to just work.

This module allows you to use ES modules syntax to write your configuration. Build a project or framework that allows more advanced configuration than toml, yaml or json would.
Like `rollup.config.js`, `webpack.config.js`, or `postcss.config.js`. (Only rollup allows import/export out of the box).

## Usage
Within your project let `esm-config` import your configuration file.

```js
const esmConfig = require("esm-config")

// /example/config.js may contain import/export syntax
const config = esmConfig("/example/config.js")

// you can provide a default configuration
// it is used, if the config file does not exist
// it is passed, if the config file exports a function
const defaultConfiguration = {
	name: "defaultName"
}
const config = esmConfig("/example/config.js", defaultConfiguration)
```

---

The configuration can then be written as either ESM or CJS module.

```js
// example ESM config
export default {
	name: "hello world"
}

// example exporting a function
// is passed the default configuration
export default function(defaultConfiguration) {
	const { name } = defaultConfiguration
	return {
		name,
		otherConfig: false
	}
}

// example CJS config
// this would work in nodejs without esm-config
module.exports = {
	name: "hello world"
}
```

## Background 
This uses a modified version of rollups internal [loadConfigFile](loadconfig) function.

Rollup configs can be written using ES modules syntax, because rollup transforms them to CJS before using them.

[loadconfig]: https://github.com/rollup/rollup/blob/def3ae2b4d2e5fde0f28d5ff1bf92ab9a2899e28/bin/src/run/loadConfigFile.ts

## License

MIT

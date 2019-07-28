const assert = require("assert").strict
const path = require("path")
const esmConfig = require("..")
const file = path.join(__dirname, "../rollup.config.js")

const referenceConfig = [
	{
		input: "src/index.js",
		output: [
			{ file: "dist/esm-config.cjs.js", format: "cjs" },
			{ file: "dist/esm-config.esm.js", format: "es" }
		],
		external: [],
		plugins: [{ name: "babel" }, { name: "terser" }]
	}
]

esmConfig(file)
	.then(config => {
		assert.strictEqual(Array.isArray(config), true)
		assert.strictEqual(Array.isArray(config[0].external), true)
		const strippedConfig = JSON.parse(JSON.stringify(config))
		assert.deepStrictEqual(strippedConfig[0].input, referenceConfig[0].input)
		assert.deepStrictEqual(strippedConfig[0].output, referenceConfig[0].output)
		assert.deepStrictEqual(
			strippedConfig[0].plugins,
			referenceConfig[0].plugins
		)
	})
	.catch(console.error)

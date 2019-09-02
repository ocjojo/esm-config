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
		assert.equal(Array.isArray(config), true)
		assert.equal(Array.isArray(config[0].external), true)
		const strippedConfig = JSON.parse(JSON.stringify(config))
		assert.deepEqual(strippedConfig[0].input, referenceConfig[0].input)
		assert.deepEqual(strippedConfig[0].output, referenceConfig[0].output)
		assert.deepEqual(
			strippedConfig[0].plugins,
			referenceConfig[0].plugins
		)
	})
	.catch(console.error)

esmConfig('non-existing-file.js').then(config => {
	assert.ok(config)
	assert.equal(Object.keys(config).length, 0)
}).catch(console.error)

esmConfig('non-existing-file-with-default.js', {
	name: "defaultName",
	check: true
}).then(config => {
	assert.ok(config)
	assert.equal(config.name, "defaultName")
	assert.equal(config.check, true)
}).catch(console.error)

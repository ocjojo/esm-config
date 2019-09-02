const rollup = require("rollup")
const path = require("path")

// adapted from https://github.com/rollup/rollup/blob/def3ae2b4d2e5fde0f28d5ff1bf92ab9a2899e28/bin/src/run/loadConfigFile.ts
export default async function esmConfig(configFile, defaultConfig = {}) {
	const bundle = await rollup.rollup({
		external: id =>
			(id[0] !== "." && !path.isAbsolute(id)) ||
			id.slice(-5, id.length) === ".json",
		input: configFile,
		treeshake: false
	}).catch(() => {})

	if(!bundle) return defaultConfig

	const {
		output: [{ code }]
	} = await bundle.generate({
		exports: "named",
		format: "cjs"
	})

	// temporarily override require
	const defaultLoader = require.extensions[".js"]
	require.extensions[".js"] = (module, filename) => {
		if (filename === configFile) {
			module._compile(code, filename)
		} else {
			defaultLoader(module, filename)
		}
	}
	delete require.cache[configFile]

	let configFileContent = require(configFile)
	if (configFileContent.default) configFileContent = configFileContent.default

	let configs = configFileContent
	if (typeof configFileContent === "function") {
		configs = await configFileContent(defaultConfig)
	}
	require.extensions[".js"] = defaultLoader

	return configs
}

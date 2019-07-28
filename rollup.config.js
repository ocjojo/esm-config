import { terser } from "rollup-plugin-terser"
import babel from "rollup-plugin-babel"
import pkg from "./package.json"

const production = !process.env.ROLLUP_WATCH

export default [
	{
		input: "src/index.js",
		output: [
			{ file: pkg.main, format: "cjs" },
			{ file: pkg.module, format: "es" }
		],
		external: Object.keys(pkg.dependencies).concat(
			require("module").builtinModules ||
				Object.keys(process.binding("natives"))
		),
		plugins: [
			babel({
				exclude: ["node_modules/**"]
			}),
			production && terser()
		]
	}
]

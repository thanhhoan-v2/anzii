import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import Next.js ESLint config directly (Next.js 16+ provides flat config as array)
const { default: nextConfig } = await import("eslint-config-next");

const eslintConfig = [
	// Ignore patterns
	{
		ignores: [
			".next/**",
			"node_modules/**",
			"dist/**",
			"build/**",
			"drizzle/**",
			"next-env.d.ts",
		],
	},

	// Next.js config (already an array)
	...nextConfig,

	// Custom rules
	{
		rules: {
			// Disable rules that were disabled in Biome config
			"react/no-array-index-key": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/no-unused-vars": "off",

			"prefer-const": "off",
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"react-hooks/exhaustive-deps": "warn",

			// Disable strict React hooks rules from Next.js 16 for compatibility
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/refs": "off",
			"react-hooks/purity": "off",

			// Formatting-related rules (handled by Prettier)
			indent: "off",
			quotes: "off",
			semi: "off",
			"comma-dangle": "off",
			"max-len": "off",

			// Allow anonymous default exports
			"import/no-anonymous-default-export": "off",
		},
	},

	// Override for seed file
	{
		files: ["src/db/seed.ts"],
		rules: {
			"no-console": "off",
		},
	},
];

export default eslintConfig;

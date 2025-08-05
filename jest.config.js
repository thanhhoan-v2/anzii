import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jsdom",
	testPathIgnorePatterns: [
		"<rootDir>/.next/",
		"<rootDir>/node_modules/",
		"<rootDir>/tests/e2e/",
	],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/index.ts",
		"!src/app/**/layout.tsx",
		"!src/app/**/loading.tsx",
	],
	coverageReporters: ["text", "lcov", "html"],
	coverageDirectory: "coverage",
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
		"<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}",
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
		resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(mp4|webm|mov|avi)$/,
			type: "asset/resource",
		});
		return config;
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	devIndicators: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
				pathname: "/**",
			},
		],
	},
	// Next.js 15.5 features
	experimental: {
		// Enable typed routes for type safety
		typedRoutes: true,
		// Enable Turbopack for production builds (optional)
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
};

export default nextConfig;

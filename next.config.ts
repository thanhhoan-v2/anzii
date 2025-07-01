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
};

export default nextConfig;

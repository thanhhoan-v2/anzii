import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildEslintCommand = (filenames) =>
	`eslint --fix ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(" ")}`;

export default {
	"*.{js,jsx,ts,tsx}": [buildEslintCommand],
};

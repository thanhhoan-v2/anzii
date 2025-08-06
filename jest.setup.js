import "@testing-library/jest-dom";

// Polyfill for TransformStream (needed for AI SDK)
if (typeof globalThis.TransformStream === "undefined") {
	globalThis.TransformStream = class TransformStream {
		constructor() {
			this.readable = {
				getReader: () => ({
					read: () => Promise.resolve({ done: true, value: undefined }),
					releaseLock: () => {},
				}),
			};
			this.writable = {
				getWriter: () => ({
					write: () => Promise.resolve(),
					close: () => Promise.resolve(),
					releaseLock: () => {},
				}),
			};
		}
	};
}

// Polyfill for fetch (needed for AI SDK)
if (typeof globalThis.fetch === "undefined") {
	globalThis.fetch = jest.fn();
}

// Mock next/router
jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "/",
			pathname: "/",
			query: "",
			asPath: "/",
			push: jest.fn(),
			pop: jest.fn(),
			reload: jest.fn(),
			back: jest.fn(),
			prefetch: jest.fn().mockResolvedValue(undefined),
			beforePopState: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
				emit: jest.fn(),
			},
			isFallback: false,
		};
	},
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
			refresh: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
	usePathname() {
		return "";
	},
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
	__esModule: true,
	default: (props) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img {...props} alt={props.alt} />;
	},
}));

// Setup window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
	Check: ({ className, ...props }) => (
		<svg className={className} {...props} data-testid="check-icon">
			<path d="M20 6L9 17l-5-5" />
		</svg>
	),
	Palette: ({ className, ...props }) => (
		<svg className={className} {...props} data-testid="palette-icon">
			<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
		</svg>
	),
}));

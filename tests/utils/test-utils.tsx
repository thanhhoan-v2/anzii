import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ReactElement } from "react";

// Custom render function that includes common providers
const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		);
	}

	return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };

// Common test helpers
export const mockConsoleError = () => {
	const originalError = console.error;
	beforeAll(() => {
		console.error = jest.fn();
	});
	afterAll(() => {
		console.error = originalError;
	});
};

export const mockConsoleWarn = () => {
	const originalWarn = console.warn;
	beforeAll(() => {
		console.warn = jest.fn();
	});
	afterAll(() => {
		console.warn = originalWarn;
	});
};

// Mock local storage
export const mockLocalStorage = () => {
	const localStorageMock = {
		getItem: jest.fn(),
		setItem: jest.fn(),
		removeItem: jest.fn(),
		clear: jest.fn(),
	};

	beforeAll(() => {
		Object.defineProperty(window, "localStorage", {
			value: localStorageMock,
		});
	});

	afterAll(() => {
		localStorageMock.getItem.mockRestore?.();
		localStorageMock.setItem.mockRestore?.();
		localStorageMock.removeItem.mockRestore?.();
		localStorageMock.clear.mockRestore?.();
	});

	return localStorageMock;
};

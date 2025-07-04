/// <reference types="jest" />

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
			toHaveClass(...classNames: string[]): R;
			toHaveTextContent(text: string | RegExp): R;
			toHaveAttribute(attr: string, value?: string): R;
		}
	}
}

export {};

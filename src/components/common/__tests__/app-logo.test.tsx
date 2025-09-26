import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

import { AppLogo } from "../app-logo";

// Mock the SVG component
jest.mock("@/components/svgs/app-logo.svg", () => {
	return function MockAppLogoSVG({ className }: { className?: string }) {
		return <div data-testid="app-logo-svg" className={className} />;
	};
});

describe("AppLogo", () => {
	it("renders the logo SVG", () => {
		render(<AppLogo />);
		const logoSvg = screen.getByTestId("app-logo-svg");
		expect(logoSvg).toBeInTheDocument();
		expect(logoSvg).toHaveClass("h-10", "w-10", "text-primary");
	});

	it("renders the text by default", () => {
		render(<AppLogo />);
		const text = screen.getByRole("heading", { level: 1 });
		expect(text).toBeInTheDocument();
		expect(text).toHaveTextContent("Anzii");
	});

	it("does not render text when showText is false", () => {
		render(<AppLogo showText={false} />);
		const text = screen.queryByRole("heading", { level: 1 });
		expect(text).not.toBeInTheDocument();
	});

	it("applies custom text className", () => {
		const customClassName = "text-blue-500";
		render(<AppLogo textClassName={customClassName} />);
		const text = screen.getByRole("heading", { level: 1 });
		expect(text).toHaveClass(customClassName);
	});

	it("renders as a link to home page", () => {
		render(<AppLogo />);
		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/");
	});

	it("has correct CSS classes for layout", () => {
		render(<AppLogo />);
		const link = screen.getByRole("link");
		expect(link).toHaveClass("flex", "items-start", "gap-2");
	});
});

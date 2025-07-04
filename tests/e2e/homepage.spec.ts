import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("should load the homepage successfully", async ({ page }) => {
		await page.goto("/");

		// Check that the page loads
		await expect(page).toHaveTitle(/Anzii/);

		// Check that the main heading is visible
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

		// Check that the logo is present
		await expect(page.locator('[data-testid="app-logo-svg"]')).toBeVisible();
	});

	test("should navigate to sign in page", async ({ page }) => {
		await page.goto("/");

		// Look for a sign in link/button and click it
		const signInLink = page.getByRole("link", { name: /sign in/i });
		if (await signInLink.isVisible()) {
			await signInLink.click();
			await expect(page).toHaveURL(/sign-in/);
		}
	});

	test("should navigate to features page", async ({ page }) => {
		await page.goto("/");

		// Look for a features link and click it
		const featuresLink = page.getByRole("link", { name: /features/i });
		if (await featuresLink.isVisible()) {
			await featuresLink.click();
			await expect(page).toHaveURL(/features/);
		}
	});

	test("should be responsive on mobile", async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		// Check that the page still loads and displays content
		await expect(page).toHaveTitle(/Anzii/);
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	});

	test("should have proper meta tags", async ({ page }) => {
		await page.goto("/");

		// Check for essential meta tags
		const viewport = page.locator('meta[name="viewport"]');
		await expect(viewport).toHaveAttribute("content", /width=device-width/);

		// Check for description meta tag (if it exists)
		const description = page.locator('meta[name="description"]');
		if ((await description.count()) > 0) {
			await expect(description).toHaveAttribute("content", /.+/);
		}
	});
});

import { expect, test } from "@playwright/test";

test.describe("Like System", () => {
	test("should provide instant UI feedback when liking a deck", async ({
		page,
	}) => {
		// Navigate to decks page
		await page.goto("/decks");

		// Wait for decks to load
		await page.waitForSelector('[data-testid="deck-card"]', { timeout: 10000 });

		// Find the first like button
		const likeButton = page.locator('[data-testid="like-button"]').first();

		// Check initial state
		const initialLikeCount = await likeButton.textContent();

		// Click like button
		await likeButton.click();

		// Verify immediate UI feedback (should happen instantly)
		await expect(likeButton).toHaveClass(/text-red-500/);

		// Verify like count increased immediately
		const newLikeCount = await likeButton.textContent();
		expect(newLikeCount).not.toBe(initialLikeCount);
	});

	test("should persist like state after page refresh", async ({ page }) => {
		// Navigate to decks page
		await page.goto("/decks");

		// Wait for decks to load
		await page.waitForSelector('[data-testid="deck-card"]', { timeout: 10000 });

		// Find the first like button
		const likeButton = page.locator('[data-testid="like-button"]').first();

		// Click like button
		await likeButton.click();

		// Verify like is active
		await expect(likeButton).toHaveClass(/text-red-500/);

		// Refresh the page immediately (simulating user refresh)
		await page.reload();

		// Wait for decks to load again
		await page.waitForSelector('[data-testid="deck-card"]', { timeout: 10000 });

		// Verify like state is still persisted
		const likeButtonAfterRefresh = page
			.locator('[data-testid="like-button"]')
			.first();
		await expect(likeButtonAfterRefresh).toHaveClass(/text-red-500/);
	});

	test("should handle rapid clicks gracefully", async ({ page }) => {
		// Navigate to decks page
		await page.goto("/decks");

		// Wait for decks to load
		await page.waitForSelector('[data-testid="deck-card"]', { timeout: 10000 });

		// Find the first like button
		const likeButton = page.locator('[data-testid="like-button"]').first();

		// Rapidly click the like button multiple times
		for (let i = 0; i < 5; i++) {
			await likeButton.click();
			// Small delay to simulate rapid clicking
			await page.waitForTimeout(50);
		}

		// Verify the button is not in a broken state
		await expect(likeButton).toBeVisible();

		// Verify no error toast appears
		const errorToast = page
			.locator('[data-testid="toast"]')
			.filter({ hasText: "Error" });
		await expect(errorToast).not.toBeVisible();
	});

	test("should show authentication prompt for unauthenticated users", async ({
		page,
	}) => {
		// Navigate to decks page without authentication
		await page.goto("/decks");

		// Wait for decks to load
		await page.waitForSelector('[data-testid="deck-card"]', { timeout: 10000 });

		// Find the first like button
		const likeButton = page.locator('[data-testid="like-button"]').first();

		// Click like button
		await likeButton.click();

		// Verify authentication toast appears
		const authToast = page
			.locator('[data-testid="toast"]')
			.filter({ hasText: "Sign in required" });
		await expect(authToast).toBeVisible();
	});

	test("should handle network errors gracefully", async ({ page }) => {
		// Navigate to decks page
		await page.goto("/decks");

		// Wait for decks to load
		await page.waitForSelector('[data-testid="deck-card"]', { timeout: 10000 });

		// Find the first like button
		const likeButton = page.locator('[data-testid="like-button"]').first();

		// Intercept the API call and make it fail
		await page.route("/api/decks/*/like", async (route) => {
			await route.fulfill({
				status: 500,
				body: JSON.stringify({ error: "Network error" }),
			});
		});

		// Click like button
		await likeButton.click();

		// Verify optimistic update happened
		await expect(likeButton).toHaveClass(/text-red-500/);

		// Wait for error to be handled
		await page.waitForTimeout(1000);

		// Verify error toast appears
		const errorToast = page
			.locator('[data-testid="toast"]')
			.filter({ hasText: "Error" });
		await expect(errorToast).toBeVisible();

		// Verify optimistic update was rolled back
		await expect(likeButton).not.toHaveClass(/text-red-500/);
	});
});

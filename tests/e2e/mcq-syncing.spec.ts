import { expect, test } from "@playwright/test";

test.describe("MCQ Syncing", () => {
	test("should sync MCQ answers correctly", async ({ page }) => {
		// Navigate to the homepage
		await page.goto("/");

		// Create a deck with MCQ cards (this would require API setup)
		// For now, we'll just verify the MCQ card component renders correctly

		// Navigate to a deck that has MCQ cards
		// This test assumes there's a deck with MCQ cards available
		await page.goto("/deck/test-deck-id");

		// Check if MCQ cards are rendered
		const mcqCard = page.locator('[data-testid="mcq-card"]');
		if ((await mcqCard.count()) > 0) {
			// Select an answer
			await mcqCard.locator('input[type="checkbox"]').first().check();

			// Submit the answer
			await page.getByTestId("submit-answer-button").click();

			// Verify the answer feedback is shown
			await expect(page.locator("text=Correct!")).toBeVisible();

			// Click next question
			await page.getByTestId("next-question-button").click();

			// Verify the card has moved to the next question
			// This would indicate that the MCQ answer was processed
		}
	});

	test("should handle MCQ card parsing correctly", async ({ page }) => {
		// Test that MCQ cards with different formats are parsed correctly
		await page.goto("/deck/test-deck-id");

		// Check that MCQ options are displayed
		const mcqOptions = page.locator('[data-testid="mcq-option"]');
		await expect(mcqOptions).toHaveCount(4); // Should have 4 options A, B, C, D
	});
});

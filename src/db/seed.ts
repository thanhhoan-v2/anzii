import "dotenv/config";
import { getDb } from "./index";
import { cards, decks } from "./schema";

// Sample data for different subjects
const sampleDecks = [
	{
		name: "JavaScript Fundamentals",
		cards: [
			{
				question:
					"What is the difference between `let`, `const`, and `var` in JavaScript?",
				answer:
					"`var` is function-scoped and can be hoisted, `let` is block-scoped and can be reassigned, `const` is block-scoped and cannot be reassigned after declaration.",
			},
			{
				question: "What is a closure in JavaScript?",
				answer:
					"A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
			},
			{
				question: "What is the difference between `==` and `===`?",
				answer:
					"`==` performs type coercion before comparison, while `===` performs strict equality comparison without type coercion.",
			},
			{
				question: "What is the event loop in JavaScript?",
				answer:
					"The event loop is the mechanism that handles asynchronous operations in JavaScript by continuously checking the call stack and callback queue.",
			},
			{
				question: "What is hoisting in JavaScript?",
				answer:
					"Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during compilation.",
			},
		],
	},
	{
		name: "React Concepts",
		cards: [
			{
				question: "What is JSX?",
				answer:
					"JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components.",
			},
			{
				question: "What is the Virtual DOM?",
				answer:
					"The Virtual DOM is a lightweight representation of the real DOM in memory that React uses to optimize rendering performance.",
			},
			{
				question: "What are React Hooks?",
				answer:
					"Hooks are functions that let you use state and other React features in functional components.",
			},
			{
				question: "What is the difference between state and props?",
				answer:
					"State is internal data that belongs to a component and can change, while props are external data passed from parent components and are read-only.",
			},
			{
				question: "What is useEffect used for?",
				answer:
					"useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manual DOM changes.",
			},
		],
	},
	{
		name: "Database Design",
		cards: [
			{
				question: "What is normalization in database design?",
				answer:
					"Normalization is the process of organizing data to reduce redundancy and improve data integrity by dividing large tables into smaller, related tables.",
			},
			{
				question: "What is a foreign key?",
				answer:
					"A foreign key is a field in one table that uniquely identifies a row in another table, creating a link between the two tables.",
			},
			{
				question: "What is the difference between SQL and NoSQL databases?",
				answer:
					"SQL databases are relational with structured schemas and ACID properties, while NoSQL databases are non-relational with flexible schemas and horizontal scaling.",
			},
			{
				question: "What is an index in a database?",
				answer:
					"An index is a data structure that improves query performance by creating a sorted reference to specific columns in a table.",
			},
		],
	},
	{
		name: "Python Basics",
		cards: [
			{
				question:
					"What is the difference between a list and a tuple in Python?",
				answer:
					"Lists are mutable (can be changed) and use square brackets [], while tuples are immutable (cannot be changed) and use parentheses ().",
			},
			{
				question: "What is a dictionary in Python?",
				answer:
					"A dictionary is a collection of key-value pairs that is unordered, changeable, and indexed by keys.",
			},
			{
				question: "What is list comprehension?",
				answer:
					"List comprehension is a concise way to create lists by applying an expression to each item in an iterable.",
			},
			{
				question: "What is the difference between `is` and `==` in Python?",
				answer:
					"`is` checks if two variables refer to the same object in memory, while `==` checks if the values are equal.",
			},
		],
	},
];

// Helper function to generate random dates within the last 30 days
function getRandomPastDate(daysAgo = 30): Date {
	const now = new Date();
	const randomDays = Math.floor(Math.random() * daysAgo);
	const randomDate = new Date(now);
	randomDate.setDate(now.getDate() - randomDays);
	return randomDate;
}

// Helper function to generate random due dates (some overdue, some future)
function getRandomDueDate(): Date {
	const now = new Date();
	const randomDays = Math.floor(Math.random() * 20) - 10; // -10 to +10 days
	const randomDate = new Date(now);
	randomDate.setDate(now.getDate() + randomDays);
	return randomDate;
}

// Helper function to generate realistic SRS values
function getRandomSRSValues() {
	const intervals = [0, 1, 3, 7, 14, 30, 60]; // Common intervals in days
	const easeFactors = [1.8, 2.0, 2.2, 2.5, 2.8, 3.0]; // Common ease factors

	return {
		interval: intervals[Math.floor(Math.random() * intervals.length)],
		easeFactor: easeFactors[Math.floor(Math.random() * easeFactors.length)],
	};
}

async function seed() {
	const db = getDb();

	console.log("🌱 Starting database seed...");

	try {
		// Clear existing data (optional - comment out if you want to keep existing data)
		console.log("🧹 Clearing existing data...");
		await db.delete(cards);
		await db.delete(decks);

		console.log("📚 Creating decks and cards...");

		for (const deckData of sampleDecks) {
			// Insert deck
			const [deck] = await db
				.insert(decks)
				.values({
					name: deckData.name,
					createdAt: getRandomPastDate(),
				})
				.returning();

			console.log(`✅ Created deck: ${deck.name}`);

			// Insert cards for this deck
			const cardsToInsert = deckData.cards.map((cardData) => {
				const srsValues = getRandomSRSValues();
				return {
					deckId: deck.id,
					question: cardData.question,
					answer: cardData.answer,
					interval: srsValues.interval,
					easeFactor: srsValues.easeFactor,
					dueDate: getRandomDueDate(),
					createdAt: getRandomPastDate(),
				};
			});

			await db.insert(cards).values(cardsToInsert);
			console.log(`   📝 Added ${cardsToInsert.length} cards`);
		}

		// Get final counts
		const deckCount = await db.select().from(decks);
		const cardCount = await db.select().from(cards);

		console.log("\n🎉 Seed completed successfully!");
		console.log(`📊 Total decks created: ${deckCount.length}`);
		console.log(`📊 Total cards created: ${cardCount.length}`);
	} catch (error) {
		console.error("❌ Error during seed:", error);
		throw error;
	}
}

// Run the seed function if this file is executed directly
if (require.main === module) {
	seed()
		.then(() => {
			console.log("✨ Seed process finished");
			process.exit(0);
		})
		.catch((error) => {
			console.error("💥 Seed process failed:", error);
			process.exit(1);
		});
}

export { seed };

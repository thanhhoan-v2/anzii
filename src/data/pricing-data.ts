// Centralized pricing data and types for lazy-loaded components

export interface Plan {
	name: string;
	price: number;
	period: string;
	features: string[];
	popular: boolean;
}

export interface FAQItem {
	question: string;
	answer: string;
}

export const pricingPlans: Plan[] = [
	{
		name: "Basic Plan",
		price: 0,
		period: "/month",
		features: [
			"50 AI flashcards per month",
			"Basic spaced repetition",
			"Text import only",
			"Web access",
			"Community support",
			"Basic progress tracking",
		],
		popular: false,
	},
	{
		name: "Pro Plan",
		price: 12,
		period: "/month",
		features: [
			"Includes all from the Basic Plan",
			"Unlimited AI flashcards",
			"PDF and image import",
			"Offline access",
			"Advanced analytics",
			"Priority support",
			"Custom study schedules",
		],
		popular: true,
	},
	{
		name: "Team Plan",
		price: 25,
		period: "/month",
		features: [
			"Includes all from the Pro Plan",
			"Team collaboration",
			"Shared deck libraries",
			"Admin dashboard",
			"API access",
			"Advanced team analytics",
			"Dedicated support",
		],
		popular: false,
	},
];

export const pricingFAQ: FAQItem[] = [
	{
		question: "Are there any additional fees or charges that may apply?",
		answer:
			"Our pricing plans include a comprehensive range of AI-powered learning features, including flashcard generation, spaced repetition algorithms, progress analytics, and more. We also offer custom packages that can be tailored to meet the specific needs of your learning goals.",
	},
	{
		question: "Can I change or cancel my plan at any time?",
		answer:
			"Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately and you'll only be charged for what you use.",
	},
	{
		question: "Do you offer a free trial or consultation?",
		answer:
			"Yes, we offer a 7-day free trial for Pro plans. No credit card required to start your trial. We also provide consultation calls for team plans.",
	},
	{
		question: "How do you handle billing and invoicing?",
		answer:
			"We accept all major credit cards and PayPal. Billing is automatic and you'll receive invoices via email. Annual plans can also be paid via bank transfer.",
	},
	{
		question: "Are your services guaranteed to improve learning results?",
		answer:
			"Our AI-powered spaced repetition system is based on scientifically proven learning techniques. Most users see significant improvement in retention within the first week of use.",
	},
];

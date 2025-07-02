import {
	BarChart3,
	Brain,
	Clock,
	FileText,
	Smartphone,
	Target,
} from "lucide-react";

export const featuresData = [
	{
		title: "AI-Powered Flashcards",
		description:
			"Transform any content into optimized flashcards using advanced natural language processing.",
		icon: Brain,
		details: [
			"Automatic generation",
			"Context-aware analysis",
			"Multiple question types",
		],
	},
	{
		title: "Spaced Repetition",
		description:
			"Scientifically-proven algorithm that optimizes review timing for maximum retention.",
		icon: Clock,
		details: [
			"Personalized intervals",
			"Performance-based scheduling",
			"Forgetting curve optimization",
		],
	},
	{
		title: "Smart Analytics",
		description:
			"Comprehensive insights into your learning progress with detailed statistics.",
		icon: BarChart3,
		details: [
			"Real-time tracking",
			"Performance heat maps",
			"Retention predictions",
		],
	},
	{
		title: "Multi-Format Import",
		description:
			"Support for various content types including text, PDFs, images, and web articles.",
		icon: FileText,
		details: ["PDF extraction", "Image OCR", "Web article parsing"],
	},
	{
		title: "Cross-Platform Sync",
		description:
			"Seamless access across all your devices with real-time sync and offline capabilities.",
		icon: Smartphone,
		details: ["Real-time sync", "Offline mode", "Progressive web app"],
	},
	{
		title: "Adaptive Learning",
		description:
			"Personalized study recommendations based on your learning patterns.",
		icon: Target,
		details: [
			"Personalized plans",
			"Weakness identification",
			"Goal-based paths",
		],
	},
];

export const demoSteps = [
	{
		title: "Upload Your Content",
		description:
			"Simply upload PDFs, paste text, or import from various sources. Our system automatically processes and structures your content.",
		step: "Content Import",
		demo: "📄 Processing document... ✓ Content extracted successfully",
	},
	{
		title: "AI Creates Flashcards",
		description:
			"Advanced AI analyzes your content and generates intelligent flashcards with questions optimized for learning and retention.",
		step: "AI Processing",
		demo: "🤖 Generating flashcards... ✓ 25 cards created with 98% accuracy",
	},
	{
		title: "Spaced Repetition",
		description:
			"Study with scientifically-proven spaced repetition that adapts to your performance and schedules reviews at optimal intervals.",
		step: "Smart Review",
		demo: "📅 Next review in 2 days... ⏰ Optimal learning interval calculated",
	},
	{
		title: "Track Your Progress",
		description:
			"Monitor your learning journey with detailed analytics, progress tracking, and personalized insights to optimize your study time.",
		step: "Progress Tracking",
		demo: "📊 Retention rate: 87% ↗️ Performance trending upward",
	},
];

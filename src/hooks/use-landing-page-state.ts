import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLandingPageState() {
	const [activeProcess, setActiveProcess] = useState(0);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [contactType, setContactType] = useState("demo");
	const router = useRouter();

	const handleGetStarted = () => {
		router.push("/decks");
	};

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement email signup logic
		router.push("/decks");
	};

	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement contact form submission logic
		router.push("/decks");
	};

	return {
		// State
		activeProcess,
		email,
		name,
		message,
		contactType,

		// Actions
		setActiveProcess,
		setEmail,
		setName,
		setMessage,
		setContactType,

		// Handlers
		handleGetStarted,
		handleEmailSubmit,
		handleContactSubmit,
	};
}

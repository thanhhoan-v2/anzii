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
		router.push("/dashboard");
	};

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Email signup:", email);
		router.push("/dashboard");
	};

	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Contact form:", { name, email, message, contactType });
		router.push("/dashboard");
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

import AppHeader from "@/components/layout/app-header";

const ContactPage = () => {
	return (
		<div className="min-h-screen bg-black">
			<AppHeader />
			<main className="container mx-auto px-4 py-12 md:px-24 md:py-20">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-bold text-gray-100 md:text-6xl">
							Contact Us
						</h1>
						<p className="mt-4 text-lg text-gray-400">
							Get in touch with our team
						</p>
					</div>
					<div
						className="prose prose-lg prose-invert mx-auto max-w-none"
						style={
							{
								"--tw-prose-body": "rgb(156 163 175)",
								"--tw-prose-headings": "rgb(243 244 246)",
								"--tw-prose-links": "rgb(163 230 53)",
								"--tw-prose-strong": "rgb(243 244 246)",
								"--tw-prose-ul-bullets": "rgb(163 230 53)",
								"--tw-prose-ol-counters": "rgb(163 230 53)",
							} as React.CSSProperties
						}
					>
						<h2>Get in Touch</h2>
						<p>
							We would love to hear from you! Whether you have questions,
							feedback, or need support, our team is here to help you make the
							most of your learning experience with Anzii.
						</p>

						<h3>Support & Questions</h3>
						<p>
							For technical support, account issues, or general questions about
							Anzii:
						</p>
						<ul>
							<li>
								Email: <a href="mailto:support@anzii.com">support@anzii.com</a>
							</li>
							<li>Response time: Within 24 hours</li>
						</ul>

						<h3>Business Inquiries</h3>
						<p>
							For partnerships, enterprise solutions, or business-related
							inquiries:
						</p>
						<ul>
							<li>
								Email:{" "}
								<a href="mailto:business@anzii.com">business@anzii.com</a>
							</li>
						</ul>

						<h3>Privacy & Legal</h3>
						<p>Questions about our privacy practices or terms of service:</p>
						<ul>
							<li>
								Email: <a href="mailto:legal@anzii.com">legal@anzii.com</a>
							</li>
							<li>
								View our <a href="/privacy-policy">Privacy Policy</a>
							</li>
							<li>
								View our <a href="/terms-of-service">Terms of Service</a>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ContactPage;

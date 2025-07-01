import { AppLogo } from "@/components/common/app-logo";

const ContactPage = () => {
	return (
		<div className="mx-auto max-w-3xl p-4 md:p-6">
			<div className="flex items-center justify-between">
				<AppLogo />
			</div>
			<div className="prose prose-lg mx-auto mt-8">
				<h1>Contact Us</h1>
				<p>
					If you have any questions about this Privacy Policy, please contact
					us:
				</p>
				<ul>
					<li>By email: support@anzii.com</li>
				</ul>
			</div>
		</div>
	);
};

export default ContactPage;

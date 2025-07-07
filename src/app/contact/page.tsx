import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { ContactForm, ContactHero } from "@/components/sections/contact";

export default function Page() {
	return (
		<div className="bg-black min-h-screen">
			<AppHeader />
			<ContactHero />
			<ContactForm />
			<AppFooter />
		</div>
	);
}

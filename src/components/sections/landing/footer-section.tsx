import Heading from "@/components/common/heading";
import AppLogo from "@/components/layout/app-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { contactInfo, footerLinks } from "@/data/landing-data";
import { Linkedin } from "lucide-react";

export default function FooterSection() {
	return (
		<footer className="px-4 md:px-24 py-8 md:py-16">
			<Card className="bg-black border border-zinc-800 rounded-t-[25px] md:rounded-t-[45px] overflow-hidden">
				<CardContent className="space-y-8 md:space-y-12 p-8 md:p-16">
					<div className="flex lg:flex-row flex-col gap-8 md:gap-12">
						<div className="flex-1 space-y-6 md:space-y-8">
							<div className="flex md:flex-row flex-col items-start md:items-center gap-6 md:gap-8">
								<div className="text-white">
									<AppLogo />
								</div>
								<div className="flex flex-wrap gap-4 md:gap-8 text-gray-400 text-sm md:text-base">
									{footerLinks.map((link, index) => (
										<a
											key={index}
											href={link.href}
											className="hover:text-lime-400 transition-colors"
										>
											{link.label}
										</a>
									))}
								</div>
								<div className="flex gap-4">
									<div className="flex justify-center items-center bg-lime-400 rounded-full w-6 md:w-8 h-6 md:h-8">
										<Linkedin className="w-3 md:w-4 h-3 md:h-4 text-black" />
									</div>
								</div>
							</div>
						</div>
						<div className="flex-1 space-y-4 md:space-y-6">
							<div className="space-y-3 md:space-y-4">
								<Heading size="lg">Contact us:</Heading>
								<div className="space-y-2 text-gray-400 text-sm md:text-base">
									<p>Email: {contactInfo.email}</p>
									<p>Phone: {contactInfo.phone}</p>
									<p>
										Address: {contactInfo.address.street}
										<br />
										{contactInfo.address.city}
									</p>
								</div>
							</div>
							<div className="flex sm:flex-row flex-col gap-3 md:gap-4 bg-zinc-950 p-4 md:p-6 border border-zinc-800 rounded-xl">
								<Input
									type="email"
									placeholder="Email"
									className="flex-1 bg-transparent border-zinc-800 focus:border-lime-400 rounded-xl focus:ring-lime-400 text-gray-100 placeholder:text-gray-500"
								/>
								<Button className="bg-lime-400 hover:bg-lime-500 px-4 md:px-6 rounded-xl font-semibold text-black text-sm md:text-base">
									Subscribe to newsletter
								</Button>
							</div>
						</div>
					</div>
					<div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-6 md:pt-8 border-zinc-800 border-t">
						<p className="text-gray-500 text-sm md:text-base">
							© 2024 Anzii. All Rights Reserved.
						</p>
						<p className="text-gray-500 hover:text-lime-400 text-sm md:text-base transition-colors cursor-pointer">
							Privacy Policy
						</p>
					</div>
				</CardContent>
			</Card>
		</footer>
	);
}

import { Metadata } from "next";

import Heading from "@/components/common/heading";
import AppFooter from "@/components/layout/app-footer";
import AppHeader from "@/components/layout/app-header";
import { APP_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
	title: "Privacy Policy - Anzii",
	description:
		"Privacy Policy for Anzii - How we collect, use, and protect your personal information when using our AI-powered flashcard learning platform.",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Privacy Policy - Anzii",
		description:
			"Privacy Policy for Anzii - How we collect, use, and protect your personal information when using our AI-powered flashcard learning platform.",
		url: "https://anzii.space/privacy-policy",
		type: "website",
	},
	twitter: {
		title: "Privacy Policy - Anzii",
		description:
			"Privacy Policy for Anzii - How we collect, use, and protect your personal information when using our AI-powered flashcard learning platform.",
	},
};

const PrivacyPolicyPage = () => {
	return (
		<div className="min-h-screen bg-black">
			<AppHeader />
			<main className="container mx-auto px-4 py-12 md:px-24 md:py-20">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-bold text-gray-100 md:text-6xl">
							Privacy Policy
						</h1>
						<p className="mt-4 text-lg text-gray-400">
							How we handle your information
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
						<p>
							This Privacy Policy describes how {APP_NAME} (&quot;we&quot;,
							&quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses
							your information when you use our website (the
							&quot;Service&quot;) and the choices you have associated with that
							data.
						</p>
						<Heading title="Information Collection and Use" />
						<p>
							We collect several different types of information for various
							purposes to provide and improve our Service to you.
						</p>
						<h3>Types of Data Collected</h3>
						<h4>Personal Data</h4>
						<p>
							While using our Service, we may ask you to provide us with certain
							personally identifiable information that can be used to contact or
							identify you (&quot;Personal Data&quot;). Personally identifiable
							information may include, but is not limited to:
						</p>
						<ul>
							<li>Email address</li>
							<li>First name and last name</li>
							<li>Cookies and Usage Data</li>
						</ul>
						<h4>Usage Data</h4>
						<p>
							We may also collect information how the Service is accessed and
							used (&quot;Usage Data&quot;). This Usage Data may include
							information such as your computer&apos;s Internet Protocol address
							(e.g. IP address), browser type, browser version, the pages of our
							Service that you visit, the time and date of your visit, the time
							spent on those pages, unique device identifiers and other
							diagnostic data.
						</p>
						<h4>Tracking &amp; Cookies Data</h4>
						<p>
							We use cookies and similar tracking technologies to track the
							activity on our Service and hold certain information.
						</p>
						<p>
							Cookies are files with small amount of data which may include an
							anonymous unique identifier. Cookies are sent to your browser from
							a website and stored on your device. Tracking technologies also
							used are beacons, tags, and scripts to collect and track
							information and to improve and analyze our Service.
						</p>
						<p>
							You can instruct your browser to refuse all cookies or to indicate
							when a cookie is being sent. However, if you do not accept
							cookies, you may not be able to use some portions of our Service.
						</p>
						<Heading title="Use of Data" />
						<p>{APP_NAME} uses the collected data for various purposes:</p>
						<ul>
							<li>To provide and maintain the Service</li>
							<li>To notify you about changes to our Service</li>
							<li>
								To allow you to participate in interactive features of our
								Service when you choose to do so
							</li>
							<li>To provide customer care and support</li>
							<li>
								To provide analysis or valuable information so that we can
								improve the Service
							</li>
							<li>To monitor the usage of the Service</li>
							<li>To detect, prevent and address technical issues</li>
						</ul>
						<Heading title="Transfer Of Data" />
						<p>
							Your information, including Personal Data, may be transferred to —
							and maintained on — computers located outside of your state,
							province, country or other governmental jurisdiction where the
							data protection laws may differ than those from your jurisdiction.
						</p>
						<p>
							If you are located outside United States and choose to provide
							information to us, please note that we transfer the data,
							including Personal Data, to United States and process it there.
						</p>
						<p>
							Your consent to this Privacy Policy followed by your submission of
							such information represents your agreement to that transfer.
						</p>
						<p>
							{APP_NAME} will take all steps reasonably necessary to ensure that
							your data is treated securely and in accordance with this Privacy
							Policy and no transfer of your Personal Data will take place to an
							organization or a country unless there are adequate controls in
							place including the security of your data and other personal
							information.
						</p>
						<Heading title="Disclosure Of Data" />
						<h3>Legal Requirements</h3>
						<p>
							{APP_NAME} may disclose your Personal Data in the good faith
							belief that such action is necessary to:
						</p>
						<ul>
							<li>To comply with a legal obligation</li>
							<li>
								To protect and defend the rights or property of {APP_NAME}
							</li>
							<li>
								To prevent or investigate possible wrongdoing in connection with
								the Service
							</li>
							<li>
								To protect the personal safety of users of the Service or the
								public
							</li>
							<li>To protect against legal liability</li>
						</ul>
						<Heading title="Security Of Data" />
						<p>
							The security of your data is important to us, but remember that no
							method of transmission over the Internet, or method of electronic
							storage is 100% secure. While we strive to use commercially
							acceptable means to protect your Personal Data, we cannot
							guarantee its absolute security.
						</p>
						<Heading title="Service Providers" />
						<p>
							We may employ third party companies and individuals to facilitate
							our Service (&quot;Service Providers&quot;), to provide the
							Service on our behalf, to perform Service-related services or to
							assist us in analyzing how our Service is used.
						</p>
						<p>
							These third parties have access to your Personal Data only to
							perform these tasks on our behalf and are obligated not to
							disclose or use it for any other purpose.
						</p>
						<Heading title="Links To Other Sites" />
						<p>
							Our Service may contain links to other sites that are not operated
							by us. If you click on a third party link, you will be directed to
							that third party&apos;s site. We strongly advise you to review the
							Privacy Policy of every site you visit.
						</p>
						<p>
							We have no control over and assume no responsibility for the
							content, privacy policies or practices of any third party sites or
							services.
						</p>
						<Heading title="Children's Privacy" />
						<p>
							Our Service does not address anyone under the age of 18
							(&quot;Children&quot;).
						</p>
						<p>
							We do not knowingly collect personally identifiable information
							from anyone under the age of 18. If you are a parent or guardian
							and you are aware that your children have provided us with
							Personal Data, please contact us. If we become aware that we have
							collected Personal Data from children without verification of
							parental consent, we take steps to remove that information from
							our servers.
						</p>
						<Heading title="Changes to This Privacy Policy" />
						<p>
							We may update our Privacy Policy from time to time. We will notify
							you of any changes by posting the new Privacy Policy on this page.
						</p>
						<p>
							We will let you know via email and/or a prominent notice on our
							Service, prior to the change becoming effective and update the
							&quot;effective date&quot; at the top of this Privacy Policy.
						</p>
						<p>
							You are advised to review this Privacy Policy periodically for any
							changes. Changes to this Privacy Policy are effective when they
							are posted on this page.
						</p>
						<Heading title="Contact Us" />
						<p>
							If you have any questions about this Privacy Policy, please
							contact us:
						</p>
						<ul>
							<li>
								Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
							</li>
							<li>
								Website: <a href="https://anzii.space">https://anzii.space</a>
							</li>
						</ul>
						<p>
							<strong>Data Protection Officer:</strong> For questions
							specifically related to data protection and privacy, please email
							us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
						</p>
						<p className="text-sm text-gray-500">
							Last updated: January 1, 2025
						</p>
					</div>
				</div>
			</main>
			<AppFooter />
		</div>
	);
};

export default PrivacyPolicyPage;

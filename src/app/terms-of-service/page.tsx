"use client";

import Heading from "@/components/common/heading";
import AppHeader from "@/components/layout/app-header";
import { APP_NAME, APP_URL } from "@/lib/constants";

const TermsOfServicePage = () => {
	return (
		<div className="min-h-screen bg-black">
			<AppHeader />
			<main className="container mx-auto px-4 py-12 md:px-24 md:py-20">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-bold text-gray-100 md:text-6xl">
							Terms of Service
						</h1>
						<p className="mt-4 text-lg text-gray-400">
							Our terms and conditions of use
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
						<p>Last updated: 2025-07-01</p>
						<p>
							Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms
							of Service&quot;) carefully before using the {APP_URL} website
							(the &quot;Service&quot;) operated by {APP_NAME} (&quot;us&quot;,
							&quot;we&quot;, or &quot;our&quot;).
						</p>
						<p>
							Your access to and use of the Service is conditioned on your
							acceptance of and compliance with these Terms. These Terms apply
							to all visitors, users and others who access or use the Service.
						</p>
						<p>
							By accessing or using the Service you agree to be bound by these
							Terms. If you disagree with any part of the terms then you may not
							access the Service.
						</p>
						<Heading title="Accounts" />
						<p>
							When you create an account with us, you must provide us
							information that is accurate, complete, and current at all times.
							Failure to do so constitutes a breach of the Terms, which may
							result in immediate termination of your account on our Service.
						</p>
						<p>
							You are responsible for safeguarding the password that you use to
							access the Service and for any activities or actions under your
							password, whether your password is with our Service or a
							third-party service.
						</p>
						<p>
							You agree not to disclose your password to any third party. You
							must notify us immediately upon becoming aware of any breach of
							security or unauthorized use of your account.
						</p>
						<Heading title="Intellectual Property" />
						<p>
							The Service and its original content, features and functionality
							are and will remain the exclusive property of {APP_NAME} and its
							licensors. The Service is protected by copyright, trademark, and
							other laws of both the United States and foreign countries. Our
							trademarks and trade dress may not be used in connection with any
							product or service without the prior written consent of {APP_NAME}
							.
						</p>
						<Heading title="Links To Other Web Sites" />
						<p>
							Our Service may contain links to third-party web sites or services
							that are not owned or controlled by {APP_NAME}.
						</p>
						<p>
							{APP_NAME} has no control over, and assumes no responsibility for,
							the content, privacy policies, or practices of any third party web
							sites or services. You further acknowledge and agree that{" "}
							{APP_NAME}
							shall not be responsible or liable, directly or indirectly, for
							any damage or loss caused or alleged to be caused by or in
							connection with use of or reliance on any such content, goods or
							services available on or through any such web sites or services.
						</p>
						<p>
							We strongly advise you to read the terms and conditions and
							privacy policies of any third-party web sites or services that you
							visit.
						</p>
						<Heading title="Termination" />
						<p>
							We may terminate or suspend your account immediately, without
							prior notice or liability, for any reason whatsoever, including
							without limitation if you breach the Terms.
						</p>
						<p>
							Upon termination, your right to use the Service will immediately
							cease. If you wish to terminate your account, you may simply
							discontinue using the Service.
						</p>
						<Heading title="Limitation Of Liability" />
						<p>
							In no event shall {APP_NAME}, nor its directors, employees,
							partners, agents, suppliers, or affiliates, be liable for any
							indirect, incidental, special, consequential or punitive damages,
							including without limitation, loss of profits, data, use,
							goodwill, or other intangible losses, resulting from (i) your
							access to or use of or inability to access or use the Service;
							(ii) any conduct or content of any third party on the Service;
							(iii) any content obtained from the Service; and (iv) unauthorized
							access, use or alteration of your transmissions or content,
							whether based on warranty, contract, tort (including negligence)
							or any other legal theory, whether or not we have been informed of
							the possibility of such damage, and even if a remedy set forth
							herein is found to have failed of its essential purpose.
						</p>
						<Heading title="Disclaimer" />
						<p>
							Your use of the Service is at your sole risk. The Service is
							provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
							basis. The Service is provided without warranties of any kind,
							whether express or implied, including, but not limited to, implied
							warranties of merchantability, fitness for a particular purpose,
							non-infringement or course of performance.
						</p>
						<p>
							{APP_NAME} its subsidiaries, affiliates, and its licensors do not
							warrant that a) the Service will function uninterrupted, secure or
							available at any particular time or location; b) any errors or
							defects will be corrected; c) the Service is free of viruses or
							other harmful components; or d) the results of using the Service
							will meet your requirements.
						</p>
						<Heading title="Governing Law" />
						<p>
							These Terms shall be governed and construed in accordance with the
							laws of United States, without regard to its conflict of law
							provisions.
						</p>
						<p>
							Our failure to enforce any right or provision of these Terms will
							not be considered a waiver of those rights. If any provision of
							these Terms is held to be invalid or unenforceable by a court, the
							remaining provisions of these Terms will remain in effect. These
							Terms constitute the entire agreement between us regarding our
							Service, and supersede and replace any prior agreements we might
							have between us regarding the Service.
						</p>
						<Heading title="Changes" />
						<p>
							We reserve the right, at our sole discretion, to modify or replace
							these Terms at any time. If a revision is material we will try to
							provide at least 30 days notice prior to any new terms taking
							effect. What constitutes a material change will be determined at
							our sole discretion.
						</p>
						<p>
							By continuing to access or use our Service after those revisions
							become effective, you agree to be bound by the revised terms. If
							you do not agree to the new terms, please stop using the Service.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default TermsOfServicePage;

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, subject, message } = body;

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 }
			);
		}

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: ["thanhhoanphandinh@gmail.com"],
			subject: `Contact Form: ${subject}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #84cc16;">New Contact Form Submission</h2>
					<div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Subject:</strong> ${subject}</p>
					</div>
					<div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
						<h3 style="color: #333;">Message:</h3>
						<p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, "<br>")}</p>
					</div>
					<hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;">
					<p style="color: #888; font-size: 12px;">
						This email was sent from the Anzii contact form.<br>
						Reply directly to this email to respond to ${name} at ${email}
					</p>
				</div>
			`,
			replyTo: email, // This allows you to reply directly to the sender
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Email sent successfully", id: data?.id },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "benabiju18@gmail.com",
            subject: subject || `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject || "No subject provided"}
Message: ${message}
      `,
            html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject || "No subject provided"}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { message: "Failed to send email" },
            { status: 500 }
        );
    }
} 
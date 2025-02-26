// app/auth/actions/sendEmail.ts
"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default async function sendEmail(msg: {
  subject: string;
  name: string;
  email: string;
  template: string;
  code?: string;
}) {
  const website = "Creative Parts"; // Define the website name
  const transporter = nodemailer.createTransport({
    service: "gmail", // Change to your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const filePath = path.join(
    process.cwd(),
    "app",
    "auth",
    "templates",
    msg.template
  );

  let emailTemplate = fs.readFileSync(filePath, "utf-8");

  // Function to get logo source
  // Function to get logo source
  const getLogoSrc = (): string => {
    const faviconPath = path.join(process.cwd(), "public", "favicon.png");

    // Check if the favicon exists
    if (fs.existsSync(faviconPath)) {
      // Construct the base URL based on the environment
      const baseUrl = `${process.env.DOMAIN_URL}`;

      return `${baseUrl}/favicon.png`; // Return the full URL to the favicon
    }

    // Return default envelope SVG if favicon doesn't exist
    return "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath d='M12 13l4-4H8l4 4zm0 2l-4 4h8l-4-4zm0-2l4-4H8l4 4zm-8-2h16l-8-8-8 8z'/%3E%3C/svg%3E";
  };

  const logoSrc = getLogoSrc();

  // Replace placeholders with actual data
  emailTemplate = emailTemplate
    .replace(/{{website}}/g, website) // Replace all occurrences
    .replace(/{{name}}/g, msg.name) // Replace all occurrences
    .replace(/{{email}}/g, msg.email) // Replace all occurrences
    .replace(/{{logosrc}}/g, logoSrc) // Replace all occurrences
    .replace(/{{code}}/g, msg.code || "") // Replace all occurrences
    .replace(/{{year}}/g, new Date().getFullYear().toString()); // Replace all occurrences
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: msg.email,
    subject: `${msg.subject} ${website}`, // Corrected string concatenation
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", msg.email);
    return { success: true, message: "Email sent!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send email." };
  }
}

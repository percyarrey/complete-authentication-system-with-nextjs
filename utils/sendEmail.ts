// app/auth/actions/sendEmail.ts
"use server";

import nodemailer from "nodemailer";
async function loadTemplate(templatePath: string): Promise<string> {
  try {
    const templateModule = await import(
      `../app/auth/templates/${templatePath}`
    );
    return templateModule.default; // Assuming the template exports a default string
  } catch (error) {
    console.error(`Failed to load template at ${templatePath}:`, error);
    throw new Error("Template file not found.");
  }
}
export default async function sendEmail(msg: {
  subject: string;
  name: string;
  email: string;
  template: string;
  code?: string;
}) {
  const website = "GiftApex"; // Define the website name
  const transporter = nodemailer.createTransport({
    service: "gmail", // Change to your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const baseUrl = `${process.env.DOMAIN_URL}`;

  let emailTemplate: string;
  try {
    emailTemplate = await loadTemplate(msg.template);
  } catch (error) {
    return { success: false, message: "Template file not found." };
  }

  // Replace placeholders with actual data
  emailTemplate = emailTemplate
    .replace(/{{website}}/g, website) // Replace all occurrences
    .replace(/{{name}}/g, msg.name) // Replace all occurrences
    .replace(/{{email}}/g, msg.email) // Replace all occurrences
    .replace(/{{logosrc}}/g, `${baseUrl}/favicon.png`) // Replace all occurrences
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

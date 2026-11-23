"use server";

import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message ||
      name.length > 200 || email.length > 254 || subject.length > 200 || message.length > 10000 ||
      /[\r\n]/.test(name + email + subject) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact form email is not configured.");
      return { success: false };
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "BEA Polimi Website <noreply@beapolimi.it>",
      to: ["communication@beapolimi.it"],
      replyTo: email,
      subject: `Website contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });
    if (error) {
      console.error("Contact form email provider rejected the message:", error.name);
      return { success: false };
    }
    return { success: true };
  } catch {
    console.error("Contact form email could not be sent.");
    return { success: false };
  }
}

import { Resend } from "resend";
import { siteConfig } from "@/config/site";

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Le service e-mail n'est pas configuré sur le serveur.",
    };
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_EMAIL ?? siteConfig.email;
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `[Portfolio] Message de ${payload.name}`,
    html: `
      <h2>Nouveau message depuis le portfolio</h2>
      <p><strong>Nom :</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>E-mail :</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      success: false,
      error: "L'envoi a échoué. Veuillez réessayer ou m'écrire directement par e-mail.",
    };
  }

  return { success: true };
}

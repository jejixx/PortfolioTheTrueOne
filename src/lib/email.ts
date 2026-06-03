export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

/**
 * Envoie un e-mail de contact.
 * TODO: configure email provider (Resend, Nodemailer, etc.)
 */
export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<SendEmailResult> {
  // TODO: configure email provider
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from, to, subject, html });

  console.info("[contact] Message reçu (stub):", {
    from: payload.email,
    name: payload.name,
    preview: payload.message.slice(0, 80),
  });

  await new Promise((resolve) => setTimeout(resolve, 400));

  return { success: true };
}

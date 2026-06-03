"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100),
  email: z.string().email("Adresse e-mail invalide."),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères.")
    .max(5000),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Veuillez corriger les erreurs du formulaire.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await sendContactEmail(parsed.data);

  if (!result.success) {
    return {
      success: false,
      message:
        result.error ??
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
    };
  }

  return {
    success: true,
    message: "Votre message a bien été envoyé. Je vous répondrai rapidement.",
  };
}

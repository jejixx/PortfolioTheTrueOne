"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      <FormField
        id="name"
        label="Nom"
        error={state.fieldErrors?.name?.[0]}
        required
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClass(state.fieldErrors?.name)}
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
        />
      </FormField>

      <FormField
        id="email"
        label="E-mail"
        error={state.fieldErrors?.email?.[0]}
        required
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass(state.fieldErrors?.email)}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={
            state.fieldErrors?.email ? "email-error" : undefined
          }
        />
      </FormField>

      <FormField
        id="message"
        label="Message"
        error={state.fieldErrors?.message?.[0]}
        required
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={cn(inputClass(state.fieldErrors?.message), "resize-y")}
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
        />
      </FormField>

      {state.message && (
        <p
          role="status"
          className={cn(
            "rounded-[var(--radius)] px-4 py-3 text-sm",
            state.success
              ? "bg-accent-muted text-accent"
              : "bg-red-50 text-danger dark:bg-red-950/40",
          )}
        >
          {state.message}
        </p>
      )}

      <SubmitButton isPending={isPending} />
    </form>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={isPending || pending}>
      {isPending || pending ? "Envoi en cours…" : "Envoyer le message"}
    </Button>
  );
}

function FormField({
  id,
  label,
  children,
  error,
  required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError?: string[]) {
  return cn(
    "w-full rounded-[var(--radius)] border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted",
    hasError?.length
      ? "border-danger focus-visible:ring-danger"
      : "border-card-border focus-visible:ring-ring",
  );
}

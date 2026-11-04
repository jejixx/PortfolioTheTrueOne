"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Identifiant
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="h-11 w-full rounded-[var(--radius)] border border-card-border bg-background px-3 text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 w-full rounded-[var(--radius)] border border-card-border bg-background px-3 text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-ring"
        />
      </div>
      {state.error ? (
        <p className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-[var(--radius)] bg-accent px-5 font-medium text-white transition-colors hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-60"
      >
        {isPending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

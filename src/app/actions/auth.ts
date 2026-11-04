"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE,
  createSessionToken,
  getConfiguredCredentials,
  sessionCookieOptions,
} from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = formData.get("username");
  const password = formData.get("password");
  const config = getConfiguredCredentials();

  if (!config) {
    return {
      error:
        "La connexion n’est pas configurée. Définissez AUTH_USERNAME, AUTH_PASSWORD et AUTH_SECRET.",
    };
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== config.username ||
    password !== config.password
  ) {
    return { error: "Identifiant ou mot de passe incorrect." };
  }

  const token = await createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, sessionCookieOptions);

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/login");
}

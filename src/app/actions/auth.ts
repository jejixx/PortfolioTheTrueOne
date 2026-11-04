"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { recordLoginAttempt } from "@/lib/login-log";
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
  const requestHeaders = await headers();
  const forwardedIp = requestHeaders.get("x-forwarded-for")?.split(",")[0];
  const ip = forwardedIp?.trim() || requestHeaders.get("x-real-ip") || "inconnue";
  const userAgent = requestHeaders.get("user-agent") || "inconnu";

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
    await recordLoginAttempt({
      username: typeof username === "string" ? username : "inconnu",
      ip,
      userAgent,
      success: false,
      createdAt: new Date().toISOString(),
    });
    return { error: "Identifiant ou mot de passe incorrect." };
  }

  await recordLoginAttempt({
    username,
    ip,
    userAgent,
    success: true,
    createdAt: new Date().toISOString(),
  });
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

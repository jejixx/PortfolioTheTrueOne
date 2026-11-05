"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { recordLoginAttempt } from "@/lib/login-log";
import {
  registerSession,
  revokeSession,
  updateSessionActivity,
} from "@/lib/session-store";
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
  const { token, sessionId } = await createSessionToken(username);
  await registerSession(sessionId, username);
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, sessionCookieOptions);

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (token) {
    const config = getConfiguredCredentials();

    if (config) {
      const { jwtVerify } = await import("jose");

      try {
        const { payload } = await jwtVerify(token, config.secret);

        if (typeof payload.jti === "string") {
          await revokeSession(payload.jti);
        }
      } catch {
        // The cookie is deleted even when its token is already invalid.
      }
    }
  }

  cookieStore.delete(AUTH_COOKIE);
  redirect("/login");
}

export async function refreshSessionActivity() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  const config = getConfiguredCredentials();

  if (!token || !config) {
    return;
  }

  try {
    const { jwtVerify } = await import("jose");
    const { payload } = await jwtVerify(token, config.secret);

    if (typeof payload.jti === "string") {
      await updateSessionActivity(payload.jti);
    }
  } catch {
    // An expired or invalid session will be rejected by the proxy.
  }
}

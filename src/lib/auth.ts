import { jwtVerify, SignJWT } from "jose";

export const AUTH_COOKIE = "portfolio_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  return secret ? new TextEncoder().encode(secret) : null;
}

export function getConfiguredCredentials() {
  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;
  const secret = getSecret();

  if (!username || !password || !secret) {
    return null;
  }

  return { username, password, secret };
}

export async function createSessionToken(username: string) {
  const config = getConfiguredCredentials();

  if (!config) {
    throw new Error("Authentication is not configured.");
  }

  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(config.secret);
}

export async function isValidSession(token: string | undefined) {
  const secret = getSecret();

  if (!token || !secret) {
    return false;
  }

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};

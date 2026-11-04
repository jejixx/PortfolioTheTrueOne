import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export interface LoginAttempt {
  id: string;
  username: string;
  ip: string;
  userAgent: string;
  success: boolean;
  createdAt: string;
}

const LOG_DIRECTORY = path.join(process.cwd(), "data");
const LOG_FILE = path.join(LOG_DIRECTORY, "login-attempts.jsonl");
const MAX_ATTEMPTS = 500;

export async function recordLoginAttempt(attempt: Omit<LoginAttempt, "id">) {
  await mkdir(LOG_DIRECTORY, { recursive: true });
  await appendFile(
    LOG_FILE,
    `${JSON.stringify({
      ...attempt,
      id: crypto.randomUUID(),
    })}\n`,
    "utf8",
  );
}

export async function getLoginAttempts() {
  try {
    const content = await readFile(LOG_FILE, "utf8");
    const attempts = content
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as LoginAttempt)
      .reverse();

    return attempts.slice(0, MAX_ATTEMPTS);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

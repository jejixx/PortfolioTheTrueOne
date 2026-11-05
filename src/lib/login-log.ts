import postgres from "postgres";

export interface LoginAttempt {
  id: string;
  username: string;
  ip: string;
  userAgent: string;
  success: boolean;
  createdAt: string;
}

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

const sql = connectionString
  ? postgres(connectionString, {
      max: 1,
      prepare: false,
    })
  : null;

export async function recordLoginAttempt(attempt: Omit<LoginAttempt, "id">) {
  if (!sql) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL or POSTGRES_URL.",
    );
  }

  await sql`
    INSERT INTO login_attempts (
      id, username, ip, user_agent, success, created_at
    )
    VALUES (
      ${crypto.randomUUID()},
      ${attempt.username},
      ${attempt.ip},
      ${attempt.userAgent},
      ${attempt.success},
      ${attempt.createdAt}
    )
  `;
}

export async function getLoginAttempts() {
  if (!sql) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL or POSTGRES_URL.",
    );
  }

  const rows = await sql<
    Array<{
      id: string;
      username: string;
      ip: string;
      user_agent: string;
      success: boolean;
      created_at: Date;
    }>
  >`
    SELECT id, username, ip, user_agent, success, created_at
    FROM login_attempts
    ORDER BY created_at DESC
    LIMIT 500
  `;

  return rows.map((row) => ({
    id: row.id,
    username: row.username,
    ip: row.ip,
    userAgent: row.user_agent,
    success: row.success,
    createdAt: row.created_at.toISOString(),
  }));
}

import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

const sql = connectionString
  ? postgres(connectionString, { max: 1, prepare: false })
  : null;

function requireDatabase() {
  if (!sql) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL or POSTGRES_URL.",
    );
  }

  return sql;
}

export async function registerSession(sessionId: string, username: string) {
  const database = requireDatabase();

  await database`
    INSERT INTO auth_sessions (id, username)
    VALUES (${sessionId}, ${username})
  `;
}

export async function isSessionActive(sessionId: string) {
  const database = requireDatabase();
  const rows = await database`
    SELECT id
    FROM auth_sessions
    WHERE id = ${sessionId} AND revoked_at IS NULL
    LIMIT 1
  `;

  return rows.length > 0;
}

export async function revokeSession(sessionId: string) {
  const database = requireDatabase();

  await database`
    UPDATE auth_sessions
    SET revoked_at = NOW()
    WHERE id = ${sessionId} AND revoked_at IS NULL
  `;
}

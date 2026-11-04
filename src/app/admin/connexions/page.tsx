import type { Metadata } from "next";
import { getLoginAttempts } from "@/lib/login-log";

export const metadata: Metadata = {
  title: "Connexions",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "medium",
});

export default async function ConnectionsAdminPage() {
  const attempts = await getLoginAttempts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Administration
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Historique des connexions
        </h1>
        <p className="mt-3 text-muted">
          Les 500 dernières tentatives de connexion sont conservées sur ce
          serveur.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-card-border bg-card shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <caption className="sr-only">
            Historique des tentatives de connexion
          </caption>
          <thead className="border-b border-card-border bg-muted-bg text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Date
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Identifiant
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Adresse IP
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Résultat
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Navigateur
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {attempts.map((attempt) => (
              <tr key={attempt.id}>
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {dateFormatter.format(new Date(attempt.createdAt))}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {attempt.username}
                </td>
                <td className="px-4 py-3 font-mono text-foreground">
                  {attempt.ip}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      attempt.success ? "text-success" : "text-danger"
                    }
                  >
                    {attempt.success ? "Réussie" : "Refusée"}
                  </span>
                </td>
                <td
                  className="max-w-sm truncate px-4 py-3 text-muted"
                  title={attempt.userAgent}
                >
                  {attempt.userAgent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {attempts.length === 0 ? (
          <p className="px-4 py-8 text-center text-muted">
            Aucune tentative enregistrée.
          </p>
        ) : null}
      </div>
    </section>
  );
}

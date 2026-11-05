import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { SessionActivity } from "@/components/layout/SessionActivity";
import { siteConfig } from "@/config/site";
import { AUTH_COOKIE, isValidSession } from "@/lib/auth";
import { parseTheme, THEME_COOKIE } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Espace privé",
    template: `%s | Espace privé`,
  },
  description: "Espace privé. Connexion requise.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = parseTheme(cookieStore.get(THEME_COOKIE)?.value);
  const authenticated = await isValidSession(
    cookieStore.get(AUTH_COOKIE)?.value,
  );

  return (
    <html
      lang="fr"
      className={theme === "dark" ? "dark" : ""}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        {authenticated ? <SkipToContent /> : null}
        {authenticated ? <SessionActivity /> : null}
        {authenticated ? <Navbar theme={theme} /> : null}
        <main id="main-content">{children}</main>
        {authenticated ? <Footer /> : null}
      </body>
    </html>
  );
}

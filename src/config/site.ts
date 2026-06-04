import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Matthias Colin",
  firstName: "Matthias",
  lastName: "Colin",
  title: "Étudiant BTS SIO",
  option: "SLAM",
  tagline:
    "Développeur motivé en 1re année de BTS SIO, titulaire d'un bac général Maths-SI, passionné par les nouvelles technologies.",
  description:
    "Portfolio BTS SIO de Matthias Colin — projets, expériences et compétences. Option SLAM au Lycée Le Castel (Dijon).",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "contactcolinmatthias9@gmail.com",
  phone: "06 44 35 38 67",
  location: "Manziat, France",
  cvPath: "/cv.pdf",
  social: {
    github: "https://github.com/jejixx",
    linkedin: "https://www.linkedin.com/in/matthias-colin-644785390/",
    gitea: "https://gitea.lyc-lecastel.fr/matthias.colin",
  },
};

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/stages", label: "Stages" },
  { href: "/projets", label: "Projets" },
  { href: "/competences", label: "Compétences" },
  { href: "/contact", label: "Contact" },
] as const;

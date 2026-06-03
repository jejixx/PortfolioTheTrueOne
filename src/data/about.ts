import type {
  EducationItem,
  Language,
  ProfessionalExperience,
  VeilleItem,
} from "@/types";

export const bioLong = `Développeur motivé en 1re année de BTS SIO (option SLAM) au Lycée Le Castel à Dijon, je suis titulaire d'un bac général spécialité Maths-SI et d'une année de Licence Informatique à l'Université Jean Monnet (Saint-Étienne).

Passionné par les nouvelles technologies, je recherche à intégrer une équipe dynamique pour contribuer à des projets innovants et continuer à développer mes compétences techniques. Mon parcours alterne formation académique, projets en équipe (applications métier, CTF cyberdéfense) et expériences professionnelles qui m'ont appris la rigueur, l'autonomie et le sens du contact.`;

export const softSkills = [
  "Esprit d'analyse",
  "Travail en équipe",
  "Autonomie",
  "Rigueur",
  "Communication",
  "Résolution de problèmes",
];

export const interests = [
  "Développement web",
  "Escalade & sports",
  "E-sport",
  "Musique",
  "Veille technologique",
];

export const languages: Language[] = [
  { name: "Français", level: "Natif" },
  { name: "Anglais", level: "B2" },
  { name: "Espagnol", level: "Intermédiaire" },
];

export const education: EducationItem[] = [
  {
    period: "2025 — 2027",
    title: "BTS SIO — Option SLAM",
    institution: "Lycée Le Castel — Dijon",
    description:
      "Création d'un site portfolio, analyse des besoins utilisateurs, conception de solutions logicielles et projets Agile en équipe.",
  },
  {
    period: "2024 — 2025",
    title: "Licence Informatique",
    institution: "Université Jean Monnet — Saint-Étienne",
    description:
      "Algorithmique, programmation orientée objet, bases de données et méthodes Agile.",
  },
  {
    period: "2024",
    title: "Bac Général — Spécialité Maths-SI",
    institution: "Manziat, France",
    description:
      "Mathématiques et Sciences de l'Ingénieur — bases solides en logique, modélisation et sciences numériques.",
  },
];

export const professionalExperiences: ProfessionalExperience[] = [
  {
    period: "Depuis 2024",
    title: "Agent d'accueil événementiel",
    company: "SPOT",
    location: "Mâcon",
    description:
      "Gestion de flux importants, rigueur et responsabilité. Communication efficace et résolution rapide de problèmes.",
  },
  {
    period: "Depuis 2024",
    title: "Ouvrier agricole",
    company: "SCEA des Champs",
    location: "Feillens",
    description:
      "Autonomie, organisation et respect rigoureux des délais en environnement exigeant.",
  },
];

export const veilleItems: VeilleItem[] = [
  {
    title: "Développement web & bonnes pratiques",
    source: "MDN Web Docs, freeCodeCamp, blogs dev",
    url: "https://developer.mozilla.org",
    description:
      "Suivi des standards HTML/CSS/JavaScript, accessibilité et intégration de contenus dynamiques.",
  },
  {
    title: "Écosystème Java & Node.js",
    source: "Documentation officielle, GitHub, tutoriels",
    description:
      "Approfondissement POO, debugging et respect des bonnes pratiques de code.",
  },
  {
    title: "Méthodes Agile & gestion de projet",
    source: "Retours de cours BTS, ressources Éduscol",
    description:
      "Application des méthodologies Agile vues en formation et lors des projets en équipe.",
  },
  {
    title: "Actualités BTS SIO & référentiel",
    source: "Éduscol, documentation RNCP, enseignants",
    url: "https://eduscol.education.fr",
    description:
      "Alignement des projets et futurs stages sur les compétences attendues à l'examen.",
  },
];

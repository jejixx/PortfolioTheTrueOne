import type { Project } from "@/types";

const giteaBase = "https://gitea.lyc-lecastel.fr/matthias.colin";

export const projects: Project[] = [
  {
    slug: "easy2drive",
    title: "Easy2Drive",
    category: "bts",
    shortDescription:
      "Application web PHP de gestion pour auto-école — élèves, moniteurs et planning des leçons.",
    description:
      "Easy2Drive est une application métier développée en BTS SIO pour digitaliser la gestion d'une auto-école : suivi des élèves, organisation des cours de conduite et tâches administratives.",
    context:
      "Projet BTS au Lycée Le Castel visant à répondre aux besoins concrets d'une auto-école en remplaçant des processus manuels par une solution web centralisée.",
    problem:
      "Faciliter la gestion des inscriptions, des leçons de conduite et du suivi pédagogique pour l'école de conduite et ses utilisateurs.",
    solution:
      "Application PHP avec interface web, base de données relationnelle et versionnement sur le Gitea du lycée. Architecture en couches séparant présentation, logique métier et accès aux données.",
    stack: ["PHP", "HTML", "CSS", "MySQL"],
    technologies: ["PHP", "HTML", "CSS", "MySQL", "SQL", "Git", "Gitea"],
    competences: [
      "B2.1 — Concevoir et développer des composants d'interface",
      "B2.2 — Concevoir et développer la persistance des données",
      "B2.3 — Concevoir et développer une application multicouche",
      "B1.4 — Travailler en mode projet",
    ],
    learnings: [
      "Modélisation des données métier (élèves, moniteurs, créneaux)",
      "Développement PHP structuré et requêtes SQL",
      "Gestion de projet avec Git sur Gitea institutionnel",
    ],
    giteaUrl: `${giteaBase}/Easy2Drive`,
    image: "/images/projects/easy2drive.png",
    imageAlt: "Illustration auto-école — application Easy2Drive",
    featured: true,
    year: 2026,
  },
  {
    slug: "easytwodrive",
    title: "EasyTwoDrive",
    category: "bts",
    shortDescription:
      "Évolution d'Easy2Drive — seconde version de l'application de gestion pour auto-école.",
    description:
      "EasyTwoDrive reprend et fait évoluer le projet Easy2Drive : même domaine métier (auto-école), avec itérations sur les fonctionnalités, la structure du code et l'expérience utilisateur.",
    context:
      "Continuité du projet auto-école en BTS SIO — amélioration de la première version sur un dépôt Gitea dédié.",
    problem:
      "Corriger les limites de la v1 et enrichir l'application de gestion (planning, suivi élèves, interface plus claire).",
    solution:
      "Refonte et extensions en PHP, historique Git séparé sur Gitea pour tracer les évolutions entre les deux versions du projet.",
    stack: ["PHP", "HTML", "CSS", "MySQL"],
    technologies: ["PHP", "HTML", "CSS", "MySQL", "Git", "Gitea"],
    competences: [
      "B2.3 — Concevoir et développer une application multicouche",
      "B2.2 — Concevoir et développer la persistance des données",
      "B1.4 — Travailler en mode projet",
    ],
    learnings: [
      "Itération sur un projet existant et gestion des versions",
      "Amélioration continue d'une application métier",
      "Comparaison v1 / v2 dans un contexte scolaire",
    ],
    giteaUrl: `${giteaBase}/EasyTwoDrive`,
    image: "/images/projects/easytwodrive.png",
    imageAlt: "Illustration auto-école — application EasyTwoDrive",
    featured: false,
    year: 2026,
  },
  {
    slug: "portfolio-bts-sio",
    title: "Portfolio BTS SIO",
    category: "bts",
    shortDescription:
      "Site de présentation portfolio — gestion de projet complète pour le BTS SIO au Lycée Le Castel.",
    description:
      "Projet phare de ma 1re année de BTS SIO : conception et développement d'un portfolio documentant mon parcours, mes compétences et mes réalisations pour l'épreuve E5/E6.",
    context:
      "Besoin d'un support structuré pour présenter le référentiel BTS SIO, mes projets et mon parcours devant un jury ou un recruteur.",
    problem:
      "Centraliser projets, stages et compétences dans un format professionnel, accessible et conforme aux attentes de l'examen.",
    solution:
      "Application Next.js avec couche de données typée, pages dynamiques, filtres accessibles, SEO et schémas JSON-LD. Architecture App Router avec Server Components.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Git",
      "GitHub",
    ],
    competences: [
      "B2.1 — Concevoir et développer des composants d'interface",
      "B2.3 — Concevoir et développer une application multicouche",
      "B1.4 — Travailler en mode projet",
      "B1.6 — Mettre à disposition des utilisateurs un service informatique",
    ],
    learnings: [
      "Analyse des besoins utilisateurs et structuration du contenu",
      "Architecture App Router et bonnes pratiques TypeScript",
      "Accessibilité web, SEO et présentation devant jury",
    ],
    githubUrl: "https://github.com/jejixx/PortfolioTheTrueOne",
    image: "/images/projects/portfolio.png",
    imageAlt: "Portfolio BTS SIO — Matthias Colin",
    featured: true,
    year: 2026,
  },
  {
    slug: "droben",
    title: "Droben",
    category: "personal",
    shortDescription:
      "Bot Discord de gestion de serveur — nom inspiré de Draven (League of Legends).",
    description:
      "Droben est un bot Discord personnel écrit en JavaScript pour automatiser la gestion d'un serveur : modération, commandes utilitaires et administration communautaire. Le nom est un hommage au champion Draven de League of Legends.",
    context:
      "Projet personnel né d'une passion pour le gaming et l'administration de communautés Discord — mise en pratique de Node.js hors cadre scolaire.",
    problem:
      "Centraliser des tâches répétitives de modération et de gestion sur un serveur Discord sans intervention manuelle constante.",
    solution:
      "Bot Node.js connecté à l'API Discord, commandes slash ou préfixées, logique modulaire et dépôt public sur GitHub.",
    stack: ["Node.js", "JavaScript", "Discord.js"],
    technologies: ["Node.js", "JavaScript", "Discord.js", "Git", "GitHub"],
    competences: [
      "B2.3 — Concevoir et développer une application multicouche",
      "B1.4 — Travailler en mode projet",
    ],
    learnings: [
      "Intégration de l'API Discord et gestion des événements",
      "Architecture modulaire pour un bot évolutif",
      "Documentation et maintenance d'un projet open source",
    ],
    githubUrl: "https://github.com/jejixx/Droben",
    image: "/images/projects/droben.png",
    imageAlt: "Droben — bot Discord inspiré de Draven (League of Legends)",
    featured: true,
    year: 2025,
  },
  {
    slug: "web-td00",
    title: "web_td00",
    category: "bts",
    shortDescription:
      "Site web de quiz interactif — travaux dirigés BTS SIO au Lycée Le Castel.",
    description:
      "web_td00 est un site de quiz développé dans le cadre des travaux dirigés web du BTS SIO : questions, réponses et navigation entre les épreuves via une interface HTML/CSS.",
    context:
      "Premier projet web structuré en BTS — application des bases HTML/CSS à un cas concret ludique (quiz).",
    problem:
      "Concevoir une interface claire pour présenter des questions, enregistrer les réponses et guider l'utilisateur dans le parcours du quiz.",
    solution:
      "Pages HTML sémantiques, styles CSS pour la mise en forme et structure du quiz versionnée sur Gitea du lycée.",
    stack: ["HTML", "CSS", "JavaScript"],
    technologies: ["HTML", "CSS", "JavaScript", "Git", "Gitea"],
    competences: [
      "B2.1 — Concevoir et développer des composants d'interface",
    ],
    learnings: [
      "Structuration d'un parcours utilisateur (quiz multi-étapes)",
      "Intégration web et bonnes pratiques HTML/CSS",
      "Première expérience Git en contexte scolaire",
    ],
    giteaUrl: `${giteaBase}/web_td00`,
    image: "/images/projects/web-quiz.png",
    imageAlt: "web_td00 — icône site de quiz",
    featured: false,
    year: 2025,
  },
  {
    slug: "passe-ton-hack-dabord-2026",
    title: "Passe ton hack d'abord 2026",
    category: "bts",
    shortDescription:
      "Participation au CTF « Passe ton hack d'abord » 2026 — challenge cyber COMCYBER × Éducation nationale.",
    description:
      "Participation à l'édition 2026 de « Passe ton hack d'abord », le plus grand challenge Capture The Flag de France, organisé par le Commandement de la cyberdéfense (COMCYBER) et le ministère de l'Éducation nationale. Challenge en ligne du 19 janvier au 6 février 2026, ouvert aux lycéens et étudiants BTS.",
    context:
      "Initiation aux techniques de cyberdéfense dans un cadre national — résolution de défis type CTF en équipe, à la découverte des métiers de cybercombattant.",
    problem:
      "Résoudre une série de défis cyber (cryptographie, web, forensics…) en équipe, dans un délai imparti et sans connaissances préalables avancées en sécurité offensive.",
    solution:
      "Travail collaboratif, recherche documentaire, outils de sécurité et méthodologie CTF pour progresser sur les épreuves proposées par le COMCYBER.",
    stack: ["Linux", "Python", "Outils CTF"],
    technologies: [
      "Capture The Flag",
      "Cybersécurité",
      "Python",
      "Linux",
      "Travail en équipe",
    ],
    competences: [
      "B1.4 — Travailler en mode projet",
      "B1.2 — Répondre aux incidents et demandes (notions)",
      "B2.3 — Concevoir et développer une application multicouche (défis web)",
    ],
    learnings: [
      "Découverte de la cybersécurité offensive et défensive",
      "Esprit d'équipe et résolution de problèmes sous contrainte",
      "Sensibilisation aux métiers de la cyberdéfense des armées",
    ],
    demoUrl:
      "https://www.defense.gouv.fr/comcyber/evenements/passe-ton-hack-dabord-2026",
    image: "/images/projects/pth2026.png",
    imageAlt: "Cybersécurité — Passe ton hack d'abord 2026 (COMCYBER)",
    featured: true,
    year: 2026,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllTechnologies(): string[] {
  const techs = new Set<string>();
  projects.forEach((p) => p.technologies.forEach((t) => techs.add(t)));
  return Array.from(techs).sort((a, b) => a.localeCompare(b, "fr"));
}

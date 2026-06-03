import type { SkillCategoryGroup, StatItem } from "@/types";

export const skillCategories: SkillCategoryGroup[] = [
  {
    id: "development",
    label: "Développement",
    skills: [
      { name: "HTML / CSS", level: 75, category: "development" },
      { name: "JavaScript", level: 65, category: "development" },
      { name: "PHP", level: 60, category: "development" },
      { name: "Java", level: 60, category: "development" },
      { name: "Python", level: 50, category: "development" },
      { name: "Node.js", level: 55, category: "development" },
      { name: "TypeScript / Next.js", level: 55, category: "development" },
    ],
  },
  {
    id: "systems",
    label: "Systèmes & Réseaux",
    skills: [
      { name: "Notions réseau (TCP/IP)", level: 40, category: "systems" },
      { name: "Environnement Windows", level: 55, category: "systems" },
      { name: "Ligne de commande", level: 45, category: "systems" },
    ],
  },
  {
    id: "database",
    label: "Bases de données",
    skills: [
      { name: "SQL", level: 60, category: "database" },
      { name: "Modélisation relationnelle", level: 55, category: "database" },
      { name: "Requêtes & optimisation", level: 50, category: "database" },
    ],
  },
  {
    id: "tools",
    label: "Outils",
    skills: [
      { name: "Git / GitHub", level: 70, category: "tools" },
      { name: "Gitea (Git lycée)", level: 65, category: "tools" },
      { name: "VS Code", level: 80, category: "tools" },
      { name: "NetBeans", level: 55, category: "tools" },
    ],
  },
];

export const homeStats: StatItem[] = [
  { label: "Technologies maîtrisées", value: "12+" },
  { label: "Projets réalisés", value: "6" },
  { label: "Stages & immersions", value: "1" },
];

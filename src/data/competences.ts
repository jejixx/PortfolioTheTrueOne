import type { Competence, CompetenceBloc } from "@/types";
import { siteConfig } from "@/config/site";

export const blocLabels: Record<CompetenceBloc, string> = {
  1: "Bloc 1 — Support et mise à disposition de services informatiques",
  2: "Bloc 2 — SLAM — Conception et développement d'applications",
  3: "Bloc 3 — SISR — Infrastructure et réseaux",
};

export const competences: Competence[] = [
  {
    id: "b1-1",
    bloc: 1,
    code: "B1.1",
    label: "Gérer le patrimoine informatique",
    description:
      "Inventorier, documenter et suivre le matériel et les logiciels.",
    level: 45,
    relatedSkills: ["Environnement Windows", "Documentation"],
  },
  {
    id: "b1-2",
    bloc: 1,
    code: "B1.2",
    label: "Répondre aux incidents et demandes",
    description: "Diagnostiquer, résoudre et tracer les interventions.",
    level: 40,
    relatedSkills: ["Communication", "Résolution de problèmes"],
  },
  {
    id: "b1-4",
    bloc: 1,
    code: "B1.4",
    label: "Travailler en mode projet",
    description: "Planifier, communiquer et livrer dans un cadre défini.",
    level: 70,
    relatedSkills: ["Git / GitHub", "Méthodes Agile", "Hackathon"],
  },
  {
    id: "b1-5",
    bloc: 1,
    code: "B1.5",
    label: "Assurer le support aux utilisateurs",
    description: "Accompagner, former et vulgariser les solutions.",
    level: 65,
    relatedSkills: ["Communication", "SPOT — accueil événementiel"],
  },
  {
    id: "b1-6",
    bloc: 1,
    code: "B1.6",
    label: "Mettre à disposition un service informatique",
    description: "Déployer et maintenir un service pour les utilisateurs.",
    level: 55,
    relatedSkills: ["Next.js", "Portfolio web"],
  },
  {
    id: "b2-1",
    bloc: 2,
    code: "B2.1",
    label: "Concevoir et développer des composants d'interface",
    description: "UI accessible, responsive et conforme aux maquettes.",
    level: 68,
    relatedSkills: ["HTML / CSS", "JavaScript", "Next.js"],
  },
  {
    id: "b2-2",
    bloc: 2,
    code: "B2.2",
    label: "Concevoir et développer la persistance des données",
    description: "Modéliser et implémenter l'accès aux données.",
    level: 55,
    relatedSkills: ["SQL", "Modélisation relationnelle"],
  },
  {
    id: "b2-3",
    bloc: 2,
    code: "B2.3",
    label: "Concevoir et développer une application multicouche",
    description: "Architecture en couches, API et logique métier.",
    level: 58,
    relatedSkills: ["Java", "Node.js", "TypeScript"],
  },
  {
    id: "b3-1",
    bloc: 3,
    code: "B3.1",
    label: "Installer et configurer des équipements réseau",
    description: "Notions de commutation, routage et câblage.",
    level: 30,
    relatedSkills: ["Notions réseau (TCP/IP)"],
  },
  {
    id: "b3-2",
    bloc: 3,
    code: "B3.2",
    label: "Exploiter des serveurs Windows",
    description: "Services AD, DNS, DHCP et supervision de base.",
    level: 25,
    relatedSkills: ["Environnement Windows"],
  },
];

export function getCompetencesByBloc(bloc: CompetenceBloc): Competence[] {
  return competences.filter((c) => c.bloc === bloc);
}

export function getRelevantBlocs(): CompetenceBloc[] {
  const option = siteConfig.option;
  if (option === "SLAM") return [1, 2];
  if (option === "SISR") return [1, 3];
  return [1, 2, 3];
}

/** Blocs affichés en complément (notions transverses) */
export function getSecondaryBlocs(): CompetenceBloc[] {
  const primary = getRelevantBlocs();
  const all: CompetenceBloc[] = [1, 2, 3];
  return all.filter((b) => !primary.includes(b));
}

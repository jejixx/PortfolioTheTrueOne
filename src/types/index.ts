export type BtsOption = "SISR" | "SLAM";

export type ProjectCategory = "bts" | "personal";

export type CompetenceBloc = 1 | 2 | 3;

export interface SiteConfig {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  option: BtsOption;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone?: string;
  location: string;
  cvPath: string;
  social: {
    github: string;
    linkedin: string;
    gitea: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  description: string;
  context: string;
  problem: string;
  solution: string;
  stack: string[];
  technologies: string[];
  competences: string[];
  learnings: string[];
  githubUrl?: string;
  giteaUrl?: string;
  demoUrl?: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  year: number;
}

export interface Stage {
  slug: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  technologies: string[];
  shortDescription: string;
  companyContext: string;
  missions: string[];
  competences: string[];
  bilan: string;
  deliverables?: { title: string; description: string }[];
  gallery?: { src: string; alt: string }[];
  reportUrl?: string;
  image?: string;
  imageAlt?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export type SkillCategory =
  | "development"
  | "systems"
  | "database"
  | "tools";

export interface SkillCategoryGroup {
  id: SkillCategory;
  label: string;
  skills: Skill[];
}

export interface Competence {
  id: string;
  bloc: CompetenceBloc;
  code: string;
  label: string;
  description: string;
  level: number;
  relatedSkills: string[];
}

export interface VeilleItem {
  title: string;
  source: string;
  url?: string;
  description: string;
}

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  description?: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface ProfessionalExperience {
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

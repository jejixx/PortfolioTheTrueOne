import fs from "fs";
import path from "path";
import type { Stage } from "@/types";

const img = (file: string) => `/images/stages/${file}`;

const IMAGE_SIGNATURES = [
  [0x89, 0x50, 0x4e, 0x47], // PNG
  [0xff, 0xd8, 0xff], // JPEG
  [0x52, 0x49, 0x46, 0x46], // WEBP (RIFF)
] as const;

function isValidImageFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;

  const stat = fs.statSync(filePath);
  if (stat.size < 100) return false;

  const header = fs.readFileSync(filePath).subarray(0, 4);
  if (header[0] === 0x3c && header[1] === 0x21) return false; // HTML "<!"

  return IMAGE_SIGNATURES.some((sig) =>
    sig.every((byte, index) => header[index] === byte),
  );
}

function publicImagePath(src: string): string {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

export const stages: Stage[] = [
  {
    slug: "stage-3e-up-kalidea",
    company: "Up | Kalidea",
    position: "Stage d'observation — 3ème D",
    location: "Joinville-le-Pont (94)",
    startDate: "2019-06-10",
    endDate: "2019-06-14",
    duration: "1 semaine",
    technologies: ["HTML", "CSS", "JavaScript", "Git"],
    shortDescription:
      "Stage d'observation en 3ème D chez Up | Kalidea (Groupe UP) — découverte du numérique éducatif et du développement web.",
    companyContext:
      "Up | Kalidea est une entité du Groupe UP, acteur de l'éducation et du numérique scolaire. J'ai effectué mon stage d'observation au sein de cette structure afin de découvrir le fonctionnement d'une entreprise du secteur informatique et les métiers liés au développement. Mon rapport complet (Groupe UP, Kalidea, déroulement de la semaine) est publié sur Google Sites avec toutes les illustrations.",
    missions: [
      "Découverte du Groupe UP : historique, organisation et objectifs du groupe",
      "Immersion chez Up | Kalidea : présentation de l'activité et des équipes",
      "Initiation au développement web et aux bonnes pratiques de code",
      "Participation à des exercices d'intégration et de découverte des outils numériques",
      "Collaboration en équipe avec communication à distance",
      "Rédaction d'un compte rendu de stage (Google Sites) avec illustrations",
    ],
    competences: [
      "B1.4 — Travailler en mode projet",
      "B2.1 — Concevoir et développer des composants d'interface (initiation)",
      "B1.5 — Assurer le support aux utilisateurs (notions)",
    ],
    bilan:
      "Ce stage d'observation en 3ème D m'a permis de confirmer mon intérêt pour l'informatique. J'ai découvert le monde professionnel du numérique éducatif, le travail en équipe à distance et les bases du développement web. Les ressentis et le déroulé détaillé de ma semaine sont consignés dans mon rapport Google Sites — une expérience formatrice que je mets aujourd'hui en perspective dans ma formation BTS SIO.",
    deliverables: [
      {
        title: "Rapport de stage (Google Sites)",
        description:
          "Site de présentation structuré en trois parties : Groupe UP, Up | Kalidea et Mon Stage — avec illustrations et bilan personnel.",
      },
      {
        title: "Exercices web",
        description:
          "Travaux d'initiation HTML/CSS et découverte des bonnes pratiques de code en binôme.",
      },
    ],
    reportUrl: "https://sites.google.com/view/stagematthias/accueil",
    image: img("kalidea-logo.svg"),
    imageAlt: "Logo Up | Kalidea — stage d'observation Matthias Colin, 3ème D",
  },
];

export function getStageBySlug(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}

/** Galerie : uniquement les fichiers image valides présents dans public/ */
export function getAvailableGallery(
  stage: Stage,
): NonNullable<Stage["gallery"]> {
  if (!stage.gallery) return [];

  return stage.gallery.filter((item) =>
    isValidImageFile(publicImagePath(item.src)),
  );
}

export function getStageHeroImage(stage: Stage): string {
  const candidates = [
    stage.image,
    ...(stage.gallery?.map((g) => g.src) ?? []),
    img("kalidea-logo.svg"),
  ].filter((src): src is string => Boolean(src));

  for (const src of candidates) {
    const filePath = publicImagePath(src);
    if (src.endsWith(".svg") && fs.existsSync(filePath)) return src;
    if (isValidImageFile(filePath)) return src;
  }

  return img("kalidea-logo.svg");
}

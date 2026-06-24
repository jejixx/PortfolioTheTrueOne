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
  {
    slug: "stage-idconseil",
    company: "ID Conseils",
    position: "Stagiaire développeur — BTS SIO SLAM",
    location: "55 Rue de l'Église, 01570 Feillens",
    startDate: "2026-06-01",
    endDate: "2026-07-03",
    duration: "5 semaines",
    technologies: ["C#", "WPF", ".NET 6", "Syncfusion", "Microsoft 365"],
    shortDescription:
      "Stage BTS SIO en cours chez ID Conseils (Feillens) — application desktop WPF de gestion des abonnements Microsoft 365 (revente de licences).",
    companyContext:
      "ID Conseils (SARL) est une entreprise de services informatiques basée au 55 Rue de l'Église, 01570 Feillens, qui accompagne ses clients depuis 2004 pour la maintenance et l'évolution de leurs systèmes informatiques. Dans le cadre de mon stage BTS SIO (option SLAM), je développe une application desktop WPF (.NET 6, Syncfusion) pour la gestion des abonnements Microsoft 365 : tableau de bord, clients, abonnements, facturation et rapprochement fournisseur/client. Une maquette mock de l'ensemble des écrans à produire guide le développement.",
    missions: [
      "Semaine 1 — Prise en main WPF/C#, Syncfusion, tableau de bord (UserControls, KPI, graphiques)",
      "Semaine 2 — Back-end : événements, services, DTO ; écran Clients presque terminé (SfDataGrid, CRUD)",
      "Finalisation page Clients : redirection vers le détail avec les bonnes données, mise en forme",
      "Développement des écrans restants (détail client, abonnements, facturation, rapprochement)",
      "Documentation du travail réalisé (captures d'écran, fiches récap hebdomadaires)",
    ],
    competences: [
      "B1.4 — Travailler en mode projet",
      "B2.1 — Concevoir et développer des composants d'interface (WPF / Syncfusion)",
      "B2.2 — Concevoir et développer des composants métier (C#)",
      "B2.3 — Concevoir et mettre en place une solution logicielle",
    ],
    bilan:
      "Stage en cours (juin–juillet 2026) chez ID Conseils. Semaine 1 : tableau de bord WPF (Syncfusion, mock). Semaine 2 : mise en place du back-end (événements, services, DTO) et développement de l'écran Clients, presque terminé — reste la redirection vers le détail et la mise en forme. Consolidation du pattern MVVM sur un cas métier réel.",
    deliverables: [
      {
        title: "Maquette WPF — écrans à produire (mock)",
        description:
          "Cahier des écrans : tableau de bord, clients, détail client, abonnements, facturation, rapprochement (.NET 6, Syncfusion).",
      },
      {
        title: "Tableau de bord WPF — semaine 1",
        description:
          "Premier écran fonctionnel : menu latéral, cartes KPI, graphiques Syncfusion (données mock v1.0.0).",
      },
      {
        title: "Page Clients — semaine 2 (en cours)",
        description:
          "Liste SfDataGrid, services et DTO ; finalisation redirection et mise en forme en cours.",
      },
      {
        title: "Fiches récapitulatives hebdomadaires",
        description:
          "Comptes rendus semaine 1 et 2 (docs/rapport-semaine-1-idconseils.md, docs/rapport-semaine-2-idconseils.md).",
      },
    ],
    gallery: [
      {
        src: img("idconseil/00-maquette-ecrans-mock.png"),
        alt: "Maquette WPF — gestion des abonnements Microsoft 365 (mock) — 6 écrans à produire",
      },
      {
        src: img("idconseil/01-tableau-de-bord-semaine1.png"),
        alt: "Tableau de bord WPF — semaine 1, première implémentation (ID Conseils)",
      },
    ],
    image: img("idconseil-logo.jpg"),
    imageAlt:
      "Logo ID Conseils — stage BTS SIO, application WPF de gestion d'abonnements Microsoft 365",
  },
];

export function getStageBySlug(slug: string): Stage | undefined {
  return stages.find((s) => s.slug === slug);
}

export type StageGalleryItem = {
  src: string;
  alt: string;
  available: boolean;
};

/** Galerie : tous les slots déclarés, avec indicateur de fichier disponible */
export function getStageGalleryItems(stage: Stage): StageGalleryItem[] {
  if (!stage.gallery) return [];

  return stage.gallery.map((item) => ({
    ...item,
    available: isValidImageFile(publicImagePath(item.src)),
  }));
}

/** Galerie : uniquement les fichiers image valides présents dans public/ */
export function getAvailableGallery(
  stage: Stage,
): NonNullable<Stage["gallery"]> {
  return getStageGalleryItems(stage)
    .filter((item) => item.available)
    .map(({ src, alt }) => ({ src, alt }));
}

export function getStageHeroImage(stage: Stage): string {
  const candidates = [
    stage.image,
    ...(stage.gallery?.map((g) => g.src) ?? []),
    img("stage-placeholder.svg"),
  ].filter((src): src is string => Boolean(src));

  for (const src of candidates) {
    const filePath = publicImagePath(src);
    if (src.endsWith(".svg") && fs.existsSync(filePath)) return src;
    if (isValidImageFile(filePath)) return src;
  }

  return img("stage-placeholder.svg");
}

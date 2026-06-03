# Portfolio BTS SIO

Site portfolio pour étudiant·e BTS SIO (Services Informatiques aux Organisations) — vitrine professionnelle et support de présentation pour les épreuves E5/E6.

## Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens CSS)
- **Framer Motion** (animations, `prefers-reduced-motion`)
- **lucide-react** (icônes)
- Données locales typées (`src/data/*.ts`) — pas de base de données

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Variables d'environnement (optionnel) : copiez `.env.example` vers `.env.local` et définissez `NEXT_PUBLIC_SITE_URL`.

## Personnalisation du contenu

### Configuration globale

Éditez **`src/config/site.ts`** : nom, option (`SLAM` ou `SISR`), e-mail, liens sociaux, chemin du CV.

### Projets

1. Ouvrez **`src/data/projects.ts`**
2. Dupliquez un objet existant dans le tableau `projects`
3. Ajoutez une image dans `public/images/projects/`
4. Le slug définit l’URL : `/projets/[slug]`

Champs importants : `category` (`bts` | `personal`), `technologies` (pour les filtres), `competences` (référentiel), `featured` (page d’accueil).

### Stages

1. Éditez **`src/data/stages.ts`**
2. URL : `/stages/[slug]`

### Compétences & référentiel

- **`src/data/skills.ts`** — barres de compétences par catégorie
- **`src/data/competences.ts`** — blocs BTS SIO (1, 2, 3)
- L’option dans `site.ts` détermine les blocs mis en avant (SLAM → blocs 1+2, SISR → blocs 1+3)

### À propos

**`src/data/about.ts`** — bio, formation, veille, centres d’intérêt.

### CV

Remplacez **`public/cv.pdf`** par votre fichier PDF.

## Formulaire de contact

La validation est active (Zod + Server Action). L’envoi e-mail est **stub** dans `src/lib/email.ts`.

Pour brancher un fournisseur (ex. Resend) :

1. Ajoutez la clé API dans `.env.local`
2. Implémentez l’envoi dans `sendContactEmail()`

## Scripts

| Commande        | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Serveur de développement |
| `npm run build` | Build de production      |
| `npm run start` | Serveur production       |
| `npm run lint`  | ESLint                   |
| `npm run format`| Prettier                 |

## Déploiement (Vercel)

1. Poussez le dépôt sur GitHub
2. Importez le projet sur [vercel.com](https://vercel.com)
3. Framework : **Next.js** (détection automatique)
4. Variable d’environnement : `NEXT_PUBLIC_SITE_URL=https://votre-domaine.vercel.app`
5. Déployez

Le site est statique-friendly (SSG sur les pages dynamiques via `generateStaticParams`).

## Structure des dossiers

```
src/
├── app/              # Pages App Router
├── components/       # UI, layout, cartes, features
├── config/site.ts    # Configuration unique
├── data/             # Contenu éditable
├── lib/              # Utilitaires, SEO, e-mail, thème
└── types/            # Types TypeScript
public/
├── cv.pdf
└── images/
```

## Licence

Projet template — personnalisez et utilisez librement pour votre portfolio BTS.

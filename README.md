# Portfolio BTS SIO

Site portfolio pour étudiant·e BTS SIO (Services Informatiques aux Organisations) — vitrine professionnelle et support de présentation pour les épreuves E5/E6.

**Dépôt GitHub :** [github.com/jejixx/PortfolioTheTrueOne](https://github.com/jejixx/PortfolioTheTrueOne)

## Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens CSS)
- **Framer Motion** (animations, `prefers-reduced-motion`)
- **lucide-react** (icônes)
- **Resend** (formulaire de contact)
- Données locales typées (`src/data/*.ts`) — pas de base de données

## Prérequis

- **Node.js 20+** (recommandé : 22 LTS)
- **npm** 10+
- **Git**

---

## Démarrage en local (développement)

```bash
git clone https://github.com/jejixx/PortfolioTheTrueOne.git
cd PortfolioTheTrueOne
npm install
cp .env.example .env.local
```

Éditez `.env.local` (voir [Variables d'environnement](#variables-denvironnement)), puis :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

---

## Variables d'environnement

Copiez `.env.example` vers `.env.local` (ne jamais committer `.env.local`).

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (SEO, sitemap, Open Graph) |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) pour le formulaire de contact |
| `CONTACT_EMAIL` | Adresse qui reçoit les messages du formulaire |
| `RESEND_FROM` | Expéditeur (par défaut `Portfolio <onboarding@resend.dev>`) |

**Mode test Resend :** avec `onboarding@resend.dev`, les e-mails ne peuvent être envoyés **qu’à l’adresse du compte Resend** (souvent la même que `CONTACT_EMAIL`). Pour envoyer vers d’autres adresses, vérifiez un domaine sur [resend.com/domains](https://resend.com/domains).

---

## Déploiement sur serveur Ubuntu (SSH)

Procédure pour héberger le site sur une machine Linux (VM, Raspberry Pi, VPS local, etc.). L’accès reste en général **limité au réseau local** sauf configuration réseau avancée (box, domaine).

### 1. Connexion SSH

```bash
ssh utilisateur@IP_DU_SERVEUR
# Exemple : ssh matthias@192.168.1.38
```

### 2. Installer les outils (une seule fois)

```bash
sudo apt update
sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node -v
npm -v
```

### 3. Cloner le projet

```bash
cd ~
git clone https://github.com/jejixx/PortfolioTheTrueOne.git
cd PortfolioTheTrueOne
```

> Ne copiez **jamais** le dossier `node_modules` depuis Windows : faites toujours `npm install` sur Linux.

### 4. Configurer l'environnement

```bash
cp .env.example .env.local
nano .env.local
```

Exemple pour un serveur en `192.168.1.38` :

```env
NEXT_PUBLIC_SITE_URL=http://192.168.1.38:3000
RESEND_API_KEY=re_votre_cle
CONTACT_EMAIL=colinmatthias9@gmail.com
RESEND_FROM=Portfolio <onboarding@resend.dev>
```

### 5. Installer les dépendances et builder

**Toujours** dans le dossier qui contient `package.json` :

```bash
cd ~/PortfolioTheTrueOne
npm install
npm run build
```

En cas d’erreur `ENOTEMPTY` sur `npm install` :

```bash
rm -rf node_modules
npm cache clean --force
npm install
```

### 6. Lancer en production avec PM2

```bash
pm2 delete portfolio 2>/dev/null
pm2 start npm --name portfolio --cwd ~/PortfolioTheTrueOne -- start
pm2 save
pm2 startup
```

Exécutez la commande `sudo` affichée par `pm2 startup`, puis :

```bash
pm2 save
pm2 status
```

Le statut doit être **online**.

### 7. Tester

- Navigateur (même réseau Wi‑Fi) : `http://IP_DU_SERVEUR:3000`
- Sur le serveur : `curl -I http://localhost:3000`

### 8. Commandes utiles

| Action | Commande |
|--------|----------|
| État des processus | `pm2 status` |
| Logs / erreurs | `pm2 logs portfolio` |
| Redémarrer | `pm2 restart portfolio` |
| Arrêter | `pm2 stop portfolio` |

### 9. Mettre à jour le site

```bash
cd ~/PortfolioTheTrueOne
git pull
npm install
npm run build
pm2 restart portfolio
```

### Dépannage serveur

| Erreur | Solution |
|--------|----------|
| `Could not read package.json` | `cd` dans `PortfolioTheTrueOne`, pas le dossier parent |
| `Could not find a production build` | `npm run build` avant `pm2 start` |
| PM2 `errored` (redémarrages en boucle) | `pm2 logs portfolio` puis `npm run build` et relancer PM2 |
| Formulaire : envoi échoué | `CONTACT_EMAIL` = e-mail du compte Resend ; voir `pm2 logs portfolio` |
| `ENOTEMPTY` sur `npm install` | `rm -rf node_modules` puis `npm install` |
| Accueil vide / contenu invisible | Supprimer `~/Documents/package-lock.json` si présent, puis `git pull`, `npm run build`, `pm2 restart portfolio` |
| Avertissement Next.js « multiple lockfiles » | Ne pas laisser de `package-lock.json` dans le dossier parent du projet |

---

## Déploiement public (Vercel)

Pour un site accessible **depuis n’importe où** (HTTPS, URL stable) :

1. Poussez le dépôt sur GitHub
2. Importez le projet sur [vercel.com](https://vercel.com) (compte GitHub)
3. Framework : **Next.js** (détection automatique)
4. Variables d’environnement (Settings → Environment Variables) :
   - `NEXT_PUBLIC_SITE_URL` = `https://votre-projet.vercel.app`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `RESEND_FROM`
5. Déployez — chaque `git push` redéploie automatiquement

---

## Personnalisation du contenu

### Configuration globale

Éditez **`src/config/site.ts`** : nom, option (`SLAM` ou `SISR`), e-mail affiché, liens sociaux, chemin du CV.

> L’e-mail affiché sur le site (`site.ts`) peut différer de `CONTACT_EMAIL` (réception des messages), sous réserve des règles Resend.

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

---

## Formulaire de contact

- Validation **Zod** + Server Action (`src/app/contact/actions.ts`)
- Envoi via **Resend** (`src/lib/email.ts`)
- Configurer `RESEND_API_KEY` et `CONTACT_EMAIL` dans `.env.local` (local, serveur) ou sur Vercel

Après modification de `.env.local` sur le serveur : `pm2 restart portfolio` (rebuild si changement de code).

---

## Scripts npm

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production (obligatoire avant `start`) |
| `npm run start` | Serveur production (port 3000) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

---

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

---

## Licence

Projet template — personnalisez et utilisez librement pour votre portfolio BTS.

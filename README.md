# AFCA Website Revamp

A modern, clean redesign of the [Australian Financial Complaints Authority](https://www.afca.org.au/) website, preserving the original colour scheme, information architecture, and page structure.

## Tech Stack

- **Next.js 16** (App Router) — React framework with static generation
- **TypeScript** — type-safe development
- **Tailwind CSS v4** — utility-first styling with AFCA brand tokens
- **Lucide React** — modern icon library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## GitHub Pages

This project is configured for static export and deploys automatically via GitHub Actions.

1. Push the repo to GitHub
2. In the repo go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. Push to `main` — the workflow builds and deploys the `out/` folder

Your site will be live at:

`https://<username>.github.io/<repo-name>/`

For example, if the repo is `afca-revamp`:

`https://<username>.github.io/afca-revamp/`

### Local static preview (with GitHub Pages base path)

```bash
NEXT_PUBLIC_BASE_PATH=/afca-revamp npm run build
npx serve out
```

Then open `http://localhost:3000/afca-revamp/`

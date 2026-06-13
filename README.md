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

This site is a static export deployed automatically on every push to `main`.

### One-time setup (required)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**
4. Set **Branch** to **`gh-pages`** and folder **`/ (root)`**, then Save

The GitHub Action builds the site and pushes the `out/` folder to the `gh-pages` branch. If you see the README instead of the website, Pages is still serving the `main` branch — switch it to `gh-pages` as above.

Your site will be live at:

**https://pyastreboff.github.io/afca-revamp/**

(Replace with your username/repo name if different.)

### Re-run deploy manually

**Actions → Deploy to GitHub Pages → Run workflow**

### Local static preview (with GitHub Pages base path)

```bash
NEXT_PUBLIC_BASE_PATH=/afca-revamp npm run build
npx serve out
```

Then open `http://localhost:3000/afca-revamp/`

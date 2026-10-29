import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages needs a different `base` depending on how the repo is served:
 *  - user/organisation site (`<owner>.github.io`) → "/"
 *  - project site (`portfolio-2026`)              → "/portfolio-2026/"
 * GitHub Actions always exposes GITHUB_REPOSITORY, so the deploy build adapts
 * automatically. Local builds fall back to "/".
 */
function resolveBase(): string {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (!repo || repo.toLowerCase().endsWith('.github.io')) {
    return '/'
  }
  return `/${repo}/`
}

function resolveSiteUrl(base: string): string {
  const owner = (process.env.GITHUB_REPOSITORY_OWNER ?? 'Rocioj433').toLowerCase()
  const explicit = process.env.SITE_URL
  if (explicit) {
    return explicit.endsWith('/') ? explicit : `${explicit}/`
  }
  if (base === '/') {
    return `https://${owner}.github.io/`
  }
  return `https://${owner}.github.io${base}`
}

/**
 * Replaces %SITE_URL% in index.html (absolute URLs for canonical/OG tags) and
 * emits a sitemap.xml + robots.txt with the real production URL at build time.
 */
function siteUrlPlugin(siteUrl: string): Plugin {
  return {
    name: 'portfolio:site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
    generateBundle() {
      if (this.meta.watchMode) {
        return
      }
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`,
      })
    },
  }
}

const base = resolveBase()
const siteUrl = resolveSiteUrl(base)

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), siteUrlPlugin(siteUrl)],
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
  },
})

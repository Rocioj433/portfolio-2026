/**
 * Resolves a file inside `public/` against the Vite base URL, so the same code
 * works on `/`, `/portfolio-2026/` (GitHub project pages) or a custom domain.
 */
export function asset(file: string): string {
  return `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`
}

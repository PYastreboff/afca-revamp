/** Base path when hosted on GitHub Pages (e.g. /afca-revamp). Empty for local dev. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  if (!basePath) return path;
  return `${basePath}${path}`;
}

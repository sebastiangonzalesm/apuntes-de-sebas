// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio final del sitio. Cuando se apunten los DNS a Cloudflare Pages,
// este valor genera correctamente el sitemap y las URLs canónicas / Open Graph.
const SITE = 'https://apuntesdesebas.blog';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
});

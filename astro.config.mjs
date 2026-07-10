// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Dominio final del sitio. Cuando se apunten los DNS a Cloudflare Pages,
// este valor genera correctamente el sitemap y las URLs canónicas / Open Graph.
const SITE = 'https://apuntesdesebas.blog';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // astro-icon: da acceso a toda la librería Tabler (~6.4k íconos) para los cursos.
  // Cada ícono usado se incrusta individualmente (no infla el sitio).
  integrations: [icon(), sitemap()],
});

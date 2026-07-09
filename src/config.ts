/**
 * Configuración central del sitio. Los valores editables (Google Form, contacto,
 * descripción) viven en src/data/ajustes.json y se editan desde el panel /admin.
 * Aquí solo se leen y se exponen al resto del sitio.
 */
import ajustes from './data/ajustes.json';

export const SITE = {
  nombre: 'Apuntes de Sebas',
  filosofia: 'Conecta · Crea · Cambia',
  descripcion: ajustes.descripcion,
  dominio: 'https://apuntesdesebas.blog',
  autor: 'Sebastián',
} as const;

/**
 * Enlace del Google Form de "Pásame la voz 🙌" (antes "TUKUTIN").
 * Se edita desde el panel /admin → Ajustes. Mientras esté vacío, el botón
 * muestra un aviso amable en vez de romperse.
 */
export const GOOGLE_FORM_PASAME_LA_VOZ = ajustes.googleForm;

/** Redes y contacto (editables desde /admin → Ajustes). */
export const CONTACTO = {
  email: ajustes.email,
  instagram: ajustes.instagram,
  linkedin: ajustes.linkedin,
} as const;

/** Navegación principal (sobria, sin emojis). */
export const NAV = [
  { label: 'Apuntes', href: '/apuntes' },
  { label: 'Consejos', href: '/consejos' },
  { label: 'Sobre mí', href: '/sobre-mi' },
] as const;

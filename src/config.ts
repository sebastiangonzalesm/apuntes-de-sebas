/**
 * Configuración central del sitio. Un solo lugar para los datos que el usuario
 * cambia sin tocar el código de las páginas. Editar aquí, no en las plantillas.
 */

export const SITE = {
  nombre: 'Apuntes de Sebas',
  filosofia: 'Conecta · Crea · Cambia',
  descripcion:
    'La biblioteca de apuntes universitarios de Sebas + un blog de consejos para estudiar sin dramas. Apuntes de clase + consejos = estudiante empoderad@.',
  dominio: 'https://apuntesdesebas.blog',
  autor: 'Sebastián',
} as const;

/**
 * Enlace del Google Form de "Pásame la voz 🙌" (antes "TUKUTIN").
 * PLACEHOLDER: el usuario creará el formulario y pegará el enlace real aquí.
 * Mientras esté vacío, el botón muestra un aviso amable en vez de romperse.
 */
export const GOOGLE_FORM_PASAME_LA_VOZ = '';

/** Redes y contacto. Reemplazar con los enlaces reales cuando estén listos. */
export const CONTACTO = {
  email: 'hola@apuntesdesebas.blog', // PLACEHOLDER
  instagram: 'https://www.instagram.com/apuntesdesebas', // PLACEHOLDER
  linkedin: '', // PLACEHOLDER (perfil de Sebas)
} as const;

/** Navegación principal (sobria, sin emojis). */
export const NAV = [
  { label: 'Apuntes', href: '/apuntes' },
  { label: 'Consejos', href: '/consejos' },
  { label: 'Sobre mí', href: '/sobre-mi' },
] as const;

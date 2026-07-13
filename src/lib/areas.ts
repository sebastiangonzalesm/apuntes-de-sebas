/**
 * ============================================================================
 *  CATÁLOGO DE ÁREAS — la única fuente de ícono + color por área.
 * ============================================================================
 *
 * - COLOR: siempre se toma de aquí (todos los cursos de un área comparten color).
 * - ÍCONO: se toma de aquí salvo que el curso elija uno propio (su campo `icono`).
 *
 * ➕ Para agregar un área nueva del MBA: agrega UNA línea al mapa `AREAS` de abajo
 *    con su ícono (slug de Tabler: https://tabler.io/icons) y su color hex.
 *    (Y para que salga en el desplegable del panel, agrega su nombre a la lista
 *    `area` en public/admin/config.yml.)
 */

export interface AreaEstilo {
  icono: string;
  color: string;
}

/** Estilo cuando el área no está en el mapa. */
export const AREA_DEFECTO: AreaEstilo = { icono: 'book', color: '#F5A623' };

/** Clave normalizada (sin tildes, minúsculas) → estilo. */
const AREAS: Record<string, AreaEstilo> = {
  derecho: { icono: 'scale', color: '#F5A623' },
  economia: { icono: 'chart-arrows-vertical', color: '#3949AB' },
  administracion: { icono: 'briefcase', color: '#D97706' },
  contabilidad: { icono: 'coin', color: '#B45309' },
  finanzas: { icono: 'chart-line', color: '#0F766E' },
  humanidades: { icono: 'books', color: '#7A3E8E' },
  'ciencias sociales y politica': { icono: 'building-bank', color: '#45688C' },
  matematica: { icono: 'math', color: '#2B2A26' },
  estrategia: { icono: 'target', color: '#9A3412' },
  marketing: { icono: 'chart-pie', color: '#BE3455' },
  tecnologia: { icono: 'bulb', color: '#0E7490' },
  innovacion: { icono: 'rocket', color: '#B02E8A' },
  logistica: { icono: 'truck', color: '#5B7A1E' },
  'supply chain': { icono: 'building-warehouse', color: '#6B4A34' },
  management: { icono: 'clipboard-check', color: '#2F6E57' },
  // Alias
  matematicas: { icono: 'math', color: '#2B2A26' },
};

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** Estilo (ícono + color) que corresponde a un área. */
export function estiloDeArea(area: string): AreaEstilo {
  return AREAS[normalizar(area ?? '')] ?? AREA_DEFECTO;
}

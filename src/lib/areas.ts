/**
 * Estilo por área: un ícono y un color por defecto para cada área.
 *
 * - COLOR: siempre se toma de aquí (todos los cursos de un área comparten color).
 * - ÍCONO: se toma de aquí solo si el curso no eligió uno propio. Si el curso
 *   define su `icono` (un nombre de Tabler), ese manda.
 *
 * Los nombres de ícono son slugs de Tabler Icons (https://tabler.io/icons).
 * Para agregar/afinar un área, edita este mapa.
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
  administracion: { icono: 'briefcase', color: '#D97706' },
  finanzas: { icono: 'chart-line', color: '#0F766E' },
  contabilidad: { icono: 'coin', color: '#B45309' },
  economia: { icono: 'world', color: '#A16207' },
  estrategia: { icono: 'target', color: '#9A3412' },
  marketing: { icono: 'chart-pie', color: '#BE3455' },
  operaciones: { icono: 'building', color: '#5B7A1E' },
  liderazgo: { icono: 'users', color: '#7A3E8E' },
  'recursos humanos': { icono: 'users', color: '#7A3E8E' },
  tecnologia: { icono: 'bulb', color: '#0E7490' },
  comunicacion: { icono: 'microphone', color: '#C2410C' },
  oratoria: { icono: 'microphone', color: '#C2410C' },
  'metodos cuantitativos': { icono: 'math', color: '#2B2A26' },
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

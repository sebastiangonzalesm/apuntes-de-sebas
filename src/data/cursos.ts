/**
 * ============================================================================
 *  EL CORAZÓN DEL SITIO — Única fuente de datos de cursos.
 * ============================================================================
 *
 *  Toda la biblioteca (/apuntes, cada página de curso, y las vistas por
 *  profesor) se genera a partir de esta lista. NUNCA se escribe un link de
 *  Drive a mano en una plantilla.
 *
 *  ➕ Para agregar un curso (p. ej. uno del MBA): copia un objeto de abajo,
 *     cambia los datos y pégalo en el arreglo `cursos`. Nada más.
 *
 *  Campos:
 *   - slug:        identificador en la URL (/apuntes/[slug]). Único, en minúsculas.
 *   - titulo:      nombre del curso.
 *   - area:        categoría amplia (Derecho, Administración, Finanzas, Estrategia…).
 *   - profesor:    nombre del profesor (genera su vista en /profesores/[slug]).
 *   - ciclo:       ciclo académico, ej. "2015-1".
 *   - universidad: casa de estudios.
 *   - tips:        3 consejos cortos para sobrevivir el curso.
 *   - icono:       nombre de un ícono disponible en src/components/Icon.astro.
 *   - color:       color de fondo de la tarjeta (hex).
 *   - drive:       enlace a la carpeta de Google Drive con los apuntes.
 */

export interface Curso {
  slug: string;
  titulo: string;
  area: string;
  profesor: string;
  ciclo: string;
  universidad: string;
  tips: string[];
  icono: string;
  color: string;
  drive: string;
}

/**
 * Cursos de ejemplo (3-4) para ver el sistema funcionando. Más adelante el
 * usuario vaciará aquí los ~36 cursos existentes + los del MBA que irán llegando.
 * Los enlaces de Drive de estos ejemplos son placeholders.
 */
export const cursos: Curso[] = [
  {
    slug: 'derecho-civil-1',
    titulo: 'Derecho Civil I',
    area: 'Derecho',
    profesor: 'Profe de ejemplo',
    ciclo: '2015-1',
    universidad: 'Universidad del Pacífico',
    tips: [
      'Lee el Código antes de cada clase: media hora te ahorra horas después.',
      'Los casos prácticos caen en el examen; no te saltes las separatas.',
      'Arma un esquema de instituciones desde la semana 1, sin dramas.',
    ],
    icono: 'scale',
    color: '#F5A623',
    drive: 'https://drive.google.com/drive/folders/PLACEHOLDER',
  },
  {
    slug: 'contabilidad-general',
    titulo: 'Contabilidad General',
    area: 'Administración',
    profesor: 'Por confirmar',
    ciclo: '2016-2',
    universidad: 'Universidad del Pacífico',
    tips: [
      'La partida doble se entiende practicando, no memorizando.',
      'Haz los ejercicios del día mismo; acumularlos es el drama clásico.',
      'Un buen resumen de asientos vale oro antes del parcial.',
    ],
    icono: 'coin',
    color: '#D97706',
    drive: 'https://drive.google.com/drive/folders/PLACEHOLDER',
  },
  {
    slug: 'finanzas-corporativas',
    titulo: 'Finanzas Corporativas',
    area: 'Finanzas',
    profesor: 'Profe de ejemplo',
    ciclo: '2017-1',
    universidad: 'Universidad del Pacífico',
    tips: [
      'Domina el valor del dinero en el tiempo: todo lo demás cuelga de ahí.',
      'Practica en Excel; el examen premia la rapidez con la calculadora financiera.',
      'Entiende el porqué del WACC, no solo la fórmula.',
    ],
    icono: 'chart-line',
    color: '#2B2A26',
    drive: 'https://drive.google.com/drive/folders/PLACEHOLDER',
  },
  {
    slug: 'estrategia-empresarial',
    titulo: 'Estrategia Empresarial',
    area: 'Estrategia',
    profesor: 'Por confirmar',
    ciclo: '2024-1',
    universidad: 'MBA',
    tips: [
      'Los frameworks (Porter, VRIO) son lentes, no recetas: aplícalos a casos reales.',
      'Lee los casos dos veces: la primera para entender, la segunda para decidir.',
      'En clase, opina; participar es parte de la nota y del aprendizaje.',
    ],
    icono: 'target',
    color: '#D97706',
    drive: 'https://drive.google.com/drive/folders/PLACEHOLDER',
  },
];

/* ------------------------------------------------------------------ *
 *  Helpers derivados. Las plantillas consumen estos, no recalculan.  *
 * ------------------------------------------------------------------ */

/** Convierte un texto en slug seguro para URLs (para profesores, áreas). */
export function aSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Lista de áreas únicas, ordenadas alfabéticamente. */
export function obtenerAreas(): string[] {
  return [...new Set(cursos.map((c) => c.area))].sort((a, b) =>
    a.localeCompare(b, 'es')
  );
}

export interface ProfesorResumen {
  nombre: string;
  slug: string;
  cursos: Curso[];
}

/** Agrupa cursos por profesor (excluye "Por confirmar"). */
export function obtenerProfesores(): ProfesorResumen[] {
  const mapa = new Map<string, Curso[]>();
  for (const curso of cursos) {
    if (!curso.profesor || /por confirmar/i.test(curso.profesor)) continue;
    const lista = mapa.get(curso.profesor) ?? [];
    lista.push(curso);
    mapa.set(curso.profesor, lista);
  }
  return [...mapa.entries()]
    .map(([nombre, cursos]) => ({ nombre, slug: aSlug(nombre), cursos }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

/** Busca un curso por su slug. */
export function obtenerCursoPorSlug(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug);
}

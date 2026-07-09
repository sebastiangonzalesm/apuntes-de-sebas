/**
 * Lógica y tipos de cursos. Los DATOS ya no viven aquí: cada curso es un archivo
 * editable en src/content/cursos/*.json (se editan desde el panel /admin).
 * Aquí quedan solo las funciones que ordenan y agrupan esos datos.
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
export function obtenerAreas(cursos: Curso[]): string[] {
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
export function obtenerProfesores(cursos: Curso[]): ProfesorResumen[] {
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

/** Ordena los cursos por título (para listados estables). */
export function ordenarCursos(cursos: Curso[]): Curso[] {
  return [...cursos].sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
}

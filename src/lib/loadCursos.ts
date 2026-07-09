import { getCollection } from 'astro:content';
import { ordenarCursos, type Curso } from './cursos';

/**
 * Carga todos los cursos desde la colección editable (src/content/cursos/*.json),
 * usando el nombre del archivo como slug de la URL. Devuelve la lista ordenada.
 */
export async function cargarCursos(): Promise<Curso[]> {
  const entries = await getCollection('cursos');
  return ordenarCursos(entries.map((e) => ({ slug: e.id, ...e.data })));
}

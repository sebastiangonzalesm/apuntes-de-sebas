import { getCollection } from 'astro:content';
import { ordenarCursos, type Curso } from './cursos';
import { estiloDeArea } from './areas';

/**
 * Carga todos los cursos desde la colección editable (src/content/cursos/*.json),
 * usando el nombre del archivo como slug de la URL, y resuelve ícono y color:
 *
 *  - color: SIEMPRE según el área (todos los cursos de un área comparten color).
 *  - icono: el que el curso eligió; si viene vacío, el del área.
 *
 * Devuelve la lista ordenada.
 */
export async function cargarCursos(): Promise<Curso[]> {
  const entries = await getCollection('cursos');
  const cursos = entries.map((e) => {
    const estilo = estiloDeArea(e.data.area);
    const iconoPropio = e.data.icono?.trim();
    return {
      slug: e.id,
      ...e.data,
      icono: iconoPropio ? iconoPropio : estilo.icono,
      color: estilo.color,
    } satisfies Curso;
  });
  return ordenarCursos(cursos);
}

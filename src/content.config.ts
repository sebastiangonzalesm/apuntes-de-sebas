import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección "consejos" — el blog. Cada post es un Markdown en src/content/consejos/.
 * Se edita desde el panel /admin (o creando un .md a mano).
 */
const consejos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/consejos' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    categoria: z.enum([
      'productividad',
      'métodos de estudio',
      'oratoria',
      'liderazgo',
      'desarrollo personal',
      'libros',
    ]),
    resumen: z.string(),
    // Emoji grande y con actitud que encabeza el post (playful & joy).
    emoji: z.string().default('✨'),
    imagen: z.string().optional(),
    borrador: z.boolean().default(false),
  }),
});

/**
 * Colección "cursos" — EL CORAZÓN. Cada curso es un archivo JSON editable en
 * src/content/cursos/*.json (desde el panel /admin). El nombre del archivo es el
 * slug de la URL (/apuntes/[slug]). El sitio genera solo el listado, la página
 * de cada curso y las vistas por profesor. Nunca se escribe un link a mano.
 */
const cursos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cursos' }),
  schema: z.object({
    titulo: z.string(),
    area: z.string(),
    profesor: z.string().default('Por confirmar'),
    ciclo: z.string().default(''),
    universidad: z.string().default(''),
    // Descripción corta (2-4 líneas): de qué trata el curso.
    descripcion: z.string().nullish(),
    tips: z.array(z.string()).default([]),
    // Opcional: nombre de un ícono de Tabler. Vacío = se usa el ícono del área.
    // El color NO se guarda por curso: se deriva del área (ver src/lib/areas.ts).
    icono: z.string().nullish(),
    drive: z.string().default(''),
  }),
});

/**
 * Colección "testimonios" — personas reales. El texto de la cita se edita desde
 * el panel. Un testimonio sin `cita` no se publica (nunca se inventan citas).
 */
const testimonios = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonios' }),
  schema: z.object({
    nombre: z.string(),
    rol: z.string(),
    orden: z.number().default(99),
    cita: z.string().default(''),
  }),
});

export const collections = { consejos, cursos, testimonios };

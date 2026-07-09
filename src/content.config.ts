import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección "consejos" — el blog. Cada post es un Markdown en src/content/consejos/.
 * Para escribir un post nuevo: crea un .md con el frontmatter de abajo. Listo.
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

export const collections = { consejos };

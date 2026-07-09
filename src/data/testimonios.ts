/**
 * Testimonios REALES. ⚠️ Nunca inventar el texto de un testimonio.
 *
 * Las personas y sus roles son reales (confirmados en el brief). El texto de la
 * cita queda como PLACEHOLDER hasta que el usuario pegue las palabras textuales
 * de cada persona. Un testimonio sin `cita` no se muestra en el sitio, así que
 * publicar nunca expone texto inventado.
 */

export interface Testimonio {
  nombre: string;
  rol: string;
  /** Texto textual de la persona. Vacío = no se publica todavía. */
  cita: string;
}

export const testimonios: Testimonio[] = [
  {
    nombre: 'Paula Silva',
    rol: 'Egresada de Derecho · Universidad del Pacífico',
    cita: '', // PLACEHOLDER: pegar aquí el testimonio textual de Paula.
  },
  {
    nombre: 'Astrid Noriega',
    rol: 'Egresada de Derecho · Universidad del Pacífico',
    cita: '', // PLACEHOLDER: pegar aquí el testimonio textual de Astrid.
  },
  {
    nombre: 'Ana Lucía Taboada',
    rol: 'Estudiante de Derecho · Universidad del Pacífico',
    cita: '', // PLACEHOLDER: pegar aquí el testimonio textual de Ana Lucía.
  },
];

/** Solo los testimonios con texto real se publican. */
export const testimoniosPublicables = testimonios.filter(
  (t) => t.cita.trim().length > 0
);

# Apuntes de Sebas

Relanzamiento de **Apuntes de Sebas** (creado en 2018): una biblioteca digital de
apuntes universitarios + un blog de consejos. **Conecta · Crea · Cambia.**

Sitio estático hecho con [Astro](https://astro.build). Rápido, gratis de hostear y
pensado para mantenerse durante 10 años sin dramas.

---

## 🚀 Empezar

```bash
npm install      # instala dependencias
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio en dist/
npm run preview  # previsualiza el build de producción
```

Requiere Node 18+.

---

## ✍️ Cómo agregar contenido (lo que harás siempre)

### Agregar un curso

Toda la biblioteca sale de **un solo archivo**: `src/data/cursos.ts`.
Copia un objeto, cambia los datos y pégalo en el arreglo `cursos`. El sitio genera
solo el listado de `/apuntes`, la página del curso y la vista del profesor.

```ts
{
  slug: 'derecho-civil-1',        // único, va en la URL
  titulo: 'Derecho Civil I',
  area: 'Derecho',                // Derecho, Administración, Finanzas, Estrategia…
  profesor: 'Nombre del Profesor',
  ciclo: '2015-1',
  universidad: 'Universidad del Pacífico',
  tips: ['Tip 1', 'Tip 2', 'Tip 3'],
  icono: 'scale',                 // ver íconos disponibles en src/components/Icon.astro
  color: '#F5A623',               // fondo de la tarjeta
  drive: 'https://drive.google.com/drive/folders/...',
}
```

> **Regla de oro:** nunca se escribe un link de Drive a mano en una plantilla.
> Todo vive en `cursos.ts`.

### Escribir un consejo (post del blog)

Crea un archivo `.md` en `src/content/consejos/`. El nombre del archivo es la URL.
Frontmatter:

```md
---
titulo: Cómo estudiar sin dramas
fecha: 2024-05-20
categoria: métodos de estudio   # productividad | métodos de estudio | oratoria | liderazgo | desarrollo personal | libros
resumen: Una frase que engancha y aparece en la tarjeta.
emoji: ✍️                        # emoji grande que encabeza el post
borrador: false                  # true = no se publica
---

Aquí va el contenido en Markdown.
```

---

## ⚙️ Cosas configurables (sin tocar plantillas)

Todo en `src/config.ts`:

- **`GOOGLE_FORM_PASAME_LA_VOZ`** → enlace del Google Form "Pásame la voz 🙌".
  Mientras esté vacío, el botón muestra un aviso amable en vez de romperse.
- **`CONTACTO`** → email y redes del footer.
- **`NAV`** → enlaces del menú.

### Pendientes del usuario (placeholders marcados en el código)

- Logo real (`apple_2x.png`) → reemplazar `public/logo.svg` y `public/favicon.svg`.
- Bitmoji de Sebas → hoy hay un 👋 de placeholder en Home y Sobre mí.
- Enlace del Google Form → `src/config.ts`.
- Texto real de los testimonios → `src/data/testimonios.ts` (nunca se inventan).
- Links de Drive reales de los ~36 cursos → `src/data/cursos.ts`.

---

## 🎨 Marca

- **Colores y tipografía** viven como design tokens en `src/styles/global.css`.
- Títulos en **Fraunces**, cuerpo en **Inter** (self-host, sin depender de Google
  en runtime).
- Naranja `#F5A623` protagonista. Bordes redondeados, tono cálido con humor.

---

## ☁️ Despliegue (Cloudflare Pages)

1. Conecta este repositorio a Cloudflare Pages.
2. Configuración de build:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Publica y, al final, apunta el DNS de `apuntesdesebas.blog` a Cloudflare.

No hace falta ninguna variable de entorno para el build.

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

**La forma fácil:** desde el panel `/admin` (ver más abajo), con formularios.

**Por debajo**, cada curso es un archivo JSON en `src/content/cursos/*.json`.
El nombre del archivo es el slug de la URL. El sitio genera solo el listado de
`/apuntes`, la página del curso y la vista del profesor.

```json
{
  "titulo": "Derecho Civil I",
  "area": "Derecho",
  "profesor": "Nombre del Profesor",
  "ciclo": "2015-1",
  "universidad": "Universidad del Pacífico",
  "tips": ["Tip 1", "Tip 2", "Tip 3"],
  "icono": "",
  "drive": "https://drive.google.com/drive/folders/..."
}
```

> **Regla de oro:** nunca se escribe un link de Drive a mano en una plantilla.
> Cada curso vive en su propio JSON (o se edita desde `/admin`).

### Íconos y colores (automáticos por área)

- **Color:** siempre según el `area` del curso. Todos los cursos de un área
  comparten color. El mapa área → color vive en `src/lib/areas.ts`.
- **Ícono:** por defecto el del área (también en `src/lib/areas.ts`). Pero el
  campo `icono` es **opcional y sobreescribible**: si eliges un ícono (un nombre
  de [Tabler Icons](https://tabler.io/icons), ej. `home`, `car`, `world`), ese
  manda; si lo dejas vacío, usa el del área.
- El sitio tiene acceso a **toda la librería Tabler** (~6.4k íconos) vía
  `astro-icon`; el panel ofrece un menú buscable con una selección curada.
- Para agregar/cambiar un área o su estilo, edita `src/lib/areas.ts` (y, si
  quieres que aparezca en el buscador del panel, agrega el ícono a la lista
  `icono` en `public/admin/config.yml`).

### Escribir un consejo (post del blog)

Desde `/admin` o creando un `.md` en `src/content/consejos/`. El nombre del
archivo es la URL. Frontmatter:

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

## 🖥️ Panel de administración (Decap CMS)

Edita cursos, posts, testimonios y textos **con formularios**, sin tocar código,
en `tusitio.com/admin`. Al publicar, guarda en GitHub y el sitio se reconstruye
solo en 1–2 minutos.

- **Panel:** `public/admin/index.html` + `public/admin/config.yml`.
- **Login:** GitHub OAuth resuelto con Cloudflare Pages Functions (`functions/oauth.js`
  y `functions/callback.js`).
- **Requiere** (una sola vez): una *GitHub OAuth App* y dos variables secretas en
  Cloudflare Pages: `OAUTH_GITHUB_CLIENT_ID` y `OAUTH_GITHUB_CLIENT_SECRET`.
- Si conectas el dominio `apuntesdesebas.blog`, actualiza `base_url` en
  `config.yml` y la *callback URL* de la OAuth App a ese dominio.

---

## ⚙️ Cosas configurables

Textos y ajustes editables (desde `/admin` o a mano):

- **`src/data/home.json`** → todos los textos de la portada.
- **`src/data/sobre.json`** → la página "Sobre mí".
- **`src/data/ajustes.json`** → Google Form, correo y redes.
- **`src/content/testimonios/*.json`** → testimonios (sin cita = no se publica).
- **`src/config.ts`** → `NAV` (menú) y datos fijos de marca.

### Pendientes del usuario (placeholders marcados en el código)

- Bitmoji de Sebas → hoy hay un 👋 de placeholder en Home y Sobre mí.
- Enlace del Google Form → `src/data/ajustes.json` (o `/admin` → Ajustes).
- Texto real de los testimonios → `/admin` → Testimonios (nunca se inventan).
- Links de Drive reales de los ~36 cursos → `/admin` → Cursos.

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

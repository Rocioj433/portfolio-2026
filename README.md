# Portfolio — Rocío Sánchez Suárez

Portfolio personal bilingüe (ES/EN) de Rocío Sánchez Suárez, Desarrolladora Full Stack.
One-page, con modo claro y oscuro, sin frameworks de CSS, sin fuentes ni CDNs externos: la única
petición extra al sitio son los PDF del CV.

[![CI](https://github.com/Rocioj433/portfolio-2026/actions/workflows/ci.yml/badge.svg)](https://github.com/Rocioj433/portfolio-2026/actions/workflows/ci.yml)
[![Deploy](https://github.com/Rocioj433/portfolio-2026/actions/workflows/deploy.yml/badge.svg)](https://github.com/Rocioj433/portfolio-2026/actions/workflows/deploy.yml)

**Sitio publicado:** https://rocioj433.github.io/portfolio-2026/

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) en modo estricto
- CSS plano con custom properties y diseño mobile-first (sin Tailwind ni librerías de UI)
- i18n propio: un diccionario tipado, sin dependencias
- Temas claro/oscuro con tokens y toggle persistente, sin flash al cargar
- Space Grotesk + JetBrains Mono variables, self-hosted (SIL OFL), sin Google Fonts
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) para tests de contenido y de UI
- ESLint 9+ (flat config) + Prettier
- GitHub Actions: CI en cada push/PR y deploy automático a GitHub Pages

## Comandos

| Comando                | Descripción                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm install`          | Instala las dependencias                                  |
| `npm run dev`          | Servidor de desarrollo en http://localhost:5173           |
| `npm run build`        | Type-check (`tsc -b`) + build de producción en `dist/`    |
| `npm run preview`      | Sirve el build de producción localmente                   |
| `npm run lint`         | ESLint sobre todo el proyecto                             |
| `npm run format`       | Formatea con Prettier                                     |
| `npm run format:check` | Verifica el formato sin escribir                          |
| `npm run test`         | Tests unitarios y de componentes (Vitest)                 |
| `npm run check`        | Lint + formato + tests + build (lo mismo que corre la CI) |

> El build falla si hay errores de tipos: `tsc -b` corre antes de Vite.

## Estructura

```text
.
├── index.html                    # Shell HTML: metadatos, Open Graph, JSON-LD, no-JS fallback
├── public/
│   ├── CV_RocioSanchez.pdf       # CV en español (ATS, 1 página)
│   ├── CV_RocioSanchez_EN.pdf    # CV en inglés (ATS, 1 página)
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png              # Preview 1200×630 para LinkedIn / WhatsApp / X
│   └── site.webmanifest
├── src/
│   ├── main.tsx                  # Entry point + ThemeProvider + LanguageProvider
│   ├── App.tsx                   # Layout: skip-link, header, main, footer
│   ├── data/
│   │   ├── portfolio.ts          # TODO el contenido del sitio (ES + EN), tipado
│   │   └── portfolio.test.ts     # Invariantes del contenido
│   ├── i18n/                     # Idioma (contexto, provider, hook) y tema
│   ├── components/               # Header, ThemeToggle, Hero, About, Experience, Projects, Skills, Education, Footer
│   ├── lib/assets.ts             # Resuelve archivos de public/ contra el base URL
│   ├── assets/fonts/             # Space Grotesk + JetBrains Mono (woff2, SIL OFL 1.1)
│   ├── styles/global.css         # @font-face, tokens de los dos temas, reset y componentes
│   └── test/setup.ts
├── vite.config.ts                # base + site URL automáticos (Pages) + sitemap/robots
└── vitest.config.ts
```

## Editar el contenido

Todo el texto vive en **`src/data/portfolio.ts`**, duplicado por idioma (`content.es` y
`content.en`). Los componentes lo consumen a través de `useLanguage()`, así que para
actualizar el portfolio no hace falta tocar ningún componente.

- **Experiencia, proyectos, skills, formación**: mismo objeto, un bloque por idioma.
- **Enlaces de proyectos**: `url` es opcional. Si un proyecto todavía no tiene repo
  público, usá `status` (por ejemplo `'En desarrollo'`) y la tarjeta muestra ese texto.
- **Tests de contenido**: `npm run test` verifica que ambos idiomas tengan la misma
  estructura, que no haya anchors repetidos, que cada proyecto tenga contenido y que
  los PDF referenciados existan en `public/`.

### Actualizar el CV

1. Reemplazá `public/CV_RocioSanchez.pdf` (ES) y/o `public/CV_RocioSanchez_EN.pdf` (EN)
   manteniendo el nombre de archivo.
2. El botón del hero descarga el CV del idioma activo; el footer ofrece siempre los dos.

## Idiomas

El sitio arranca en español. El switch `ES / EN` del header traduce todo el sitio,
actualiza `<html lang>`, el título y las meta tags, y recuerda la elección en
`localStorage`. También se puede forzar por URL: `?lang=en`.

## Temas

La estética parte de la paleta de [piszczek.pl](https://piszczek.pl/): **verde terminal
sobre casi negro**. El oscuro es el tema de referencia; el claro es una variante derivada
en papel frío, con el mismo verde oscurecido hasta pasar AA.

- **Oscuro** (`#030303`, acento `#00ff94`): fondo casi negro, lavado radial verde arriba a
  la derecha, grilla técnica en el hero, tarjetas con glow al hover y un foco que sigue al
  cursor. El apellido del hero tiene un shimmer de dos pasadas y el primer proyecto ocupa
  el ancho completo porque es el más profundo.
- **Claro** (`#f6f7f5`, acento `#047857`): los mismos componentes y efectos, con sombras
  suaves y el acento oscurecido para no perder contraste sobre papel.
- Tipografías **Space Grotesk** (300–700) y **JetBrains Mono** (100–800), variables y
  self-hosted en `src/assets/fonts/` (SIL OFL 1.1, licencias incluidas). Cero peticiones a
  Google Fonts o a cualquier CDN.
- El tema oscuro es el default del CSS. Si nunca elegiste un tema, el sitio sigue la
  preferencia del sistema (`prefers-color-scheme`) y reacciona si la cambiás con la página
  abierta.
- El botón del sol/luna del header alterna y guarda la elección en `localStorage`
  (`portfolio:theme`).
- Un script inline en `index.html` aplica el tema antes de que cargue el bundle, así que no
  hay flash del tema equivocado. Si tocás `ThemeProvider.tsx`, actualizá también ese script
  y el `theme-color`.
- Con `prefers-reduced-motion` se apagan el shimmer, el pulso del punto, la entrada del hero,
  el reveal por scroll y el lift de las tarjetas; el texto queda en su estado final legible.
- **Movimiento**: el hero entra con una animación CSS apenas carga (para que el titular esté
  pintado en el primer frame) y todo lo que está bajo el pliegue sube una sola vez cuando
  entra en pantalla. Lo maneja `src/lib/useReveal.ts`: el hook solo marca
  `data-revealed` en los elementos `[data-reveal]` y el CSS hace el resto. Sin
  `IntersectionObserver` todo se muestra de inmediato, así que el contenido nunca queda
  escondido detrás de una animación.

Criterios tipográficos que conviene mantener al editar:

- **Escala de siete pasos**: 13 / 16 / 18 / 22 / 32 / 38 px + el display fluido del hero.
  Nada que se lea baja de **13px**; el cuerpo va a 16px.
- **JetBrains Mono solo para datos**: fechas, tags, tokens del stack y el colofón. Los
  rótulos de sección (Habilidades, Certificaciones, Descargar CV) van en Space Grotesk,
  porque son prosa y no datos.
- **Sin adornos repetidos**: los títulos de sección no llevan subrayado ni numeración. La
  jerarquía la dan el tamaño y el espacio.
- **Un solo gesto fuerte por zona**: el shimmer del apellido en el hero y el foco que sigue
  al cursor en las tarjetas. El resto queda quieto.
- **Sin cadenas de metadatos con puntos**: fecha, lugar y modalidad son elementos separados
  con su propia jerarquía, no un string `A · B · C`.
- **El menú colapsa a los 896px** (`.nav__toggle`): por encima entran los seis enlaces en
  una línea, por debajo no. Antes de bajar ese breakpoint, medí el ancho real de la nav.

Los tokens viven al principio de `src/styles/global.css`. Todo el sitio usa solo esas
variables: cambiar la paleta es cambiar ese bloque (y los colores de `favicon.svg`,
`apple-touch-icon.png`, `og-image.png` y `site.webmanifest`).

## Revisión con tasteskill

La identidad visual se revisó con la skill [tasteskill
v2](https://github.com/leonxlnx/taste-skill), que mide el sitio renderizado en un navegador
real a 1440, 768 y 390px (`scripts/inspect.mjs`). No es una opinión: cada regla sale de
geometría y estilos computados.

| Momento | FAIL  | WARN  |
| ------- | ----- | ----- |
| Antes   | 11    | 6     |
| Después | **0** | **1** |

El WARN que queda es `size-count` a 768px: los `clamp()` del hero y de los títulos pasan por
tamaños intermedios (10 valores en ese ancho). A 1440px la escala real son siete pasos.

Cómo se corre (con el preview levantado en `http://localhost:5199/`):

```powershell
node "$env:USERPROFILE\.agents\skills\design-taste-frontend\scripts\inspect.mjs" `
  http://localhost:5199/ --out .taste-skill/after `
  --allow mono,micro-label,gradient,gradient-text,hairline,outlined-box,eyebrow,few-pictures,no-footage,default-font,glass,card-rows,shadow,em-dash,off-centre
```

Los FAIL que se arreglaron eran defectos de estructura, no de estilo:

- 20 bloques de texto por debajo de 13px (hoy no queda ninguno) y 13 tamaños de fuente
  distintos (hoy 7).
- La página estaba quieta: sólo dos elementos se movían. Hoy el hero entra con una
  animación CSS y 25 elementos suben al entrar en pantalla.
- Experiencia dejaba 665px vacíos a la derecha; ahora es una ficha a dos columnas desde
  60rem.
- Formación y Contacto eran pantallas casi vacías; hoy Formación es una banda con intro y
  Contacto abre con un CTA.
- Los márgenes no coincidían (120px contra 161px) por la barra de scroll; con
  `scrollbar-gutter: stable both-edges` el marco mide 120/120 a 1440 y 20/20 a 390.
- A 390px el `h1` era sólo el nombre; hoy el subtítulo arranca a 18px.
- "SOBRE MÍ" se partía en dos líneas a 768px; la nav colapsa a 896px y no envuelve.

Las reglas que se permiten son exactamente los recursos de la identidad elegida (piszczek.pl):

| Regla permitida              | Dónde                                                           | Por qué                                                                                                      |
| ---------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `mono`                       | fechas, tags, tokens del stack, colofón                         | son datos, no prosa: el mono es el contrapunto del display                                                   |
| `micro-label`                | 4 rótulos en mayúsculas (1,8% del texto)                        | marcan los highlights y los grupos de skills                                                                 |
| `gradient`, `gradient-text`  | wash y grilla del hero, glow de las cards, shimmer del apellido | es el gesto de la referencia, y el contraste del apellido está medido (5.6:1 en oscuro)                      |
| `hairline`                   | reglas de 1px del timeline, la nav móvil y el footer            | separan registros; no hay líneas decorativas sueltas                                                         |
| `outlined-box`               | cards y chips                                                   | el borde de 1px define el bloque, no lo decora                                                               |
| `eyebrow`                    | "Hola, soy"                                                     | la oración que el `h1` completa                                                                              |
| `glass`                      | la nav                                                          | `backdrop-filter` sólo ahí, para que el texto pase por debajo                                                |
| `shadow`                     | nav desplegada y lift de las cards en hover                     | sólo en overlays reales y en hover                                                                           |
| `card-rows`                  | grilla de proyectos (3 cards)                                   | son tres proyectos, no una plantilla repetida                                                                |
| `default-font`               | fallback de los tokens                                          | `system-ui` sólo si el woff2 no carga                                                                        |
| `em-dash`                    | comentarios del CSS                                             | la copia visible no tiene ninguno                                                                            |
| `few-pictures`, `no-footage` | todo el sitio                                                   | no hay material real del trabajo: no se inventan fotos (deuda pendiente)                                     |
| `off-centre`                 | —                                                               | el marco está centrado; el inspector mide 155px a la derecha porque las cards tienen 33px de padding interno |

El escaneo estático (`scripts/lint.mjs`) no acepta `--allow`: reporta 45 avisos que son
estos mismos recursos de marca. No se anotó el CSS con `taste-skill-ignore` porque marcaría
las definiciones de los tokens y los comentarios, sin cambiar nada del sitio.

## Deploy

El deploy es automático: cada push a `main` dispara
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que construye el sitio y
lo publica en GitHub Pages.

**Configuración única (una sola vez):** en el repo, ir a **Settings → Pages** y en
_Build and deployment → Source_ elegir **GitHub Actions**.

`vite.config.ts` calcula `base` y la URL absoluta del sitio a partir de
`GITHUB_REPOSITORY`, así que funciona sin cambios tanto en
`usuario.github.io/portfolio-2026/` como en `usuario.github.io/`. Si algún día usás un
dominio propio, definí la variable de entorno `SITE_URL` en el workflow y listo.

## Accesibilidad y performance

- HTML semántico, landmarks, skip-link, `aria-*` en el menú, el switch de idioma y el de tema
- Foco visible, contraste AA en todos los pares de texto en **ambos temas**, `prefers-reduced-motion`
- Verificado con axe-core (WCAG 2.1 A/AA): **0 violaciones** en claro y en oscuro. La grilla y
  el wash del hero son capas decorativas detrás del texto, pero hacen que axe no pueda
  resolver el fondo y marque `color-contrast` como _incomplete_; el chequeo se corre con esas
  dos capas ocultas. El único nodo que queda como _incomplete_ es el apellido del hero, que
  usa texto con degradado (peor caso: 5.6:1 en oscuro y 4.7:1 en claro).
- Fuentes self-hosted: 4 woff2 (~97 KB en total) y cero peticiones a Google Fonts o a CDNs;
  el único JS es React + la app
- `npm run test` + CI en cada push

## Licencia

Código bajo licencia MIT. El contenido (textos, CV, imagen de preview) es de uso
personal y no puede reutilizarse sin permiso.

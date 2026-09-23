# Evolución visual — Archivo Vivo Digital

**Estado:** propuesta. Sin cambios de código.  
**Fuentes:** `DESIGN.md` (identidad, no se sobrescribe), implementación actual en `src/`, fotografías en `public/images/`, skills `ui-ux-pro-max` → `impeccable` → `web-design-guidelines`.  
**Alcance:** dar vida, profundidad y carácter a lo que ya existe. No es un rediseño.

---

## 1. Auditoría del sitio actual

### Qué es hoy

El sitio ya es un portafolio editorial oscuro, estático (`output: "export"`), con Home narrativa y rutas interiores alimentadas por `src/data/*.ts`. La identidad está definida y, en lo esencial, respetada:

- Grafito `#101112` / `#161719`, marfil `#F2F0E9`, azul `#3057FF`, señal `#B8FF3D`.
- Archivo / Newsreader / JetBrains Mono.
- Retícula 4 / 8 / 12, medida `42rem`, `editorial-shell`.
- Orden de Home: Hero → Manifiesto → Trayectoria → Áreas → Proyectos → Publicaciones → Prensa → Ideas → Contacto.
- Fotografía documental en B/N con revelado al hover.
- Cursor nativo. Sin scroll-jacking. Skip link, foco visible, `scroll-padding-top`.

### Especificidad (Impeccable, Assessment A)

**Parcialmente intercambiable.** El Hero y la Trayectoria sí suenan a Alejandro. A partir de Áreas, el ritmo se vuelve un portafolio editorial genérico: `border-t` + H2 uppercase + franja imagen/texto o lista. Otro perfil ejecutivo podría reutilizar esa forma casi sin cambios; la especificidad vive en el contenido, no en el género visual de cada sección.

### Recorrido emocional

| Tramo | Lectura |
| --- | --- |
| Hero → Manifiesto → Trayectoria | Pico. Presencia, voz, credibilidad viva. |
| Áreas → Proyectos → Publicaciones | Valle. Misma respiración; el scroll deja de “leer archivo”. |
| Prensa | Mini-pico. Densidad, prueba social, filas de registro. |
| Ideas → Contacto → Footer | Cierre correcto, poco memorable. |

### Heurísticas Nielsen (0–4, Experience)

| Heurística | Nota | Comentario |
| --- | ---: | --- |
| Visibilidad del estado | 2 | Nav activo por ruta; sin progreso de la narrativa en Home. |
| Correspondencia con el mundo | 3 | Años, medios, “archivo”; poco “documento en curso”. |
| Control del usuario | 3 | Skip, menú, rail/teclado en timeline. |
| Consistencia | 2 | Tokens sólidos; índices y patrones de sección inconsistentes. |
| Prevención de errores | 3 | Copy pendiente filtrada. |
| Reconocimiento vs. memoria | 2 | 7 destinos de nav + Home larga sin marcadores de capítulo fuertes. |
| Estética / minimalismo | 2 | Sobriedad buena; la repetición es ruido estructural. |

Flexibilidad de expertos, recuperación de errores y ayuda: no aplican.

### Detector (Impeccable, Assessment B)

`impeccable detect` sobre `src` = **0 hallazgos**. El scan de `.` (124) es ruido de `out/`. Los problemas reales son de implementación, no de anti-patrones de plantilla.

### Hallazgos medibles (Web Interface Guidelines)

| Hallazgo | Dónde | Severidad |
| --- | --- | --- |
| `prefers-reduced-motion` anula *todas* las transiciones a `0.01ms` | `globals.css` | Alta |
| `--primary` como color de texto (flecha `→`) ≈ 3.54:1 sobre `#101112` | `Button.tsx` | Alta (AA texto) |
| Tracking de título Hero `−0.05em` (suelo de craft: `−0.04em`) | `Hero.tsx` | Media |
| Tracking de año grande `−0.06em` | `CareerTimeline.tsx`, `CareerStage.tsx` | Media |
| Sin `theme-color` | `layout.tsx` | Baja |
| Sin `env(safe-area-inset-*)` | Header, skip-link, shell | Media (notch) |
| Menú móvil: Escape + foco inicial, sin trampa de foco | `MobileMenu.tsx` | Media |
| Año del footer con `new Date()` (riesgo de hidratación) | `Footer.tsx` | Baja |
| Nav desktop sin `min-h-11` | `Header.tsx` | Baja (solo `lg+`) |
| `--muted` ≈ 6.7:1 sobre fondo | tokens | Pasa AA |
| `transition: all` | no aparece en fuente | OK |
| Filtro `grayscale` en hover de media | `globals.css` | Coste de pintura, no CLS |

`--motion-section: 0.8s` en el revelado del Hero supera el techo de **600 ms** pedido para la fase 2.

### Contenido real que condiciona las ideas

- **Hero:** metadata ya existe (`BOGOTÁ / COLOMBIA`, gobernanza, políticas, tecnología). Foto distinta desktop/móvil.
- **Manifiesto:** seis ejes reales (`ESTADO · CIUDADANÍA · TECNOLOGÍA · LIDERAZGO · COMUNICACIÓN · TRANSFORMACIÓN`).
- **Trayectoria:** años, nodos, `ACTIVO`, rail, teclado, indicador lateral. Es el único bloque que *se comporta* como archivo vivo.
- **Áreas:** cuatro pilares distintos en copy e imagen; la forma es idéntica (stripe 60 vh, lado alternado).
- **Proyectos Home:** 4 destacados de YouTube (Enlace Trece), 1 featured + 3 compactos. No hay interfaces de producto que fragmentar.
- **Publicaciones:** 2 obras, 2026, autores y editorial reales.
- **Prensa:** 4 clippings verificados (Forbes, Infobae, El Colombiano, Canal Trece).
- **Ideas:** 3 artículos (Medios, Inteligencia Artificial, Sociedad). Demasiados pocos para un mapa de conocimiento.
- **Contacto:** canales reales; no hay email ni formulario.
- **Índices rotos:** Home numera Manifiesto `[01]`, Trayectoria `[02]`, Proyectos `[03]`, Prensa `[04]`. Faltan Áreas, Publicaciones e Ideas. Prensa Home `[04]` choca con Ideas interior `[04]` (el archivo de rutas usa 02–07).

### Estilo de referencia (ui-ux-pro-max)

La coincidencia verificada sigue siendo **Editorial Grid / Magazine**, no Dark OLED neón ni Cyberpunk UI (ambos aparecen en búsquedas y ambos están prohibidos). Motion-driven se usa con contención: 1–2 revelados por vista, no animar todo. Timeline = recorrido por eventos discretos, no un line chart de tendencia.

---

## 2. Qué se conserva

Estos elementos **no se rehacen**. Cualquier evolución se apoya en ellos.

### Identidad y sistema

- Paleta, tokens CSS y restricción del verde señal (`ACTIVO` y estados equivalentes, nunca relleno).
- Combinación tipográfica y sus roles: sans de marca, serif de declaración, mono de archivo.
- Retícula editorial, gutters, `--measure`, `--hero-title-max`.
- Sobriedad, credibilidad, tono documental. Sin cards SaaS, sin neón, sin dashboard.

### Estructura y contenido

- Orden de Home y arquitectura de rutas (`/`, `/trayectoria`, `/proyectos`, `/ideas`, `/ideas/[slug]`, `/publicaciones`, `/publicaciones/[slug]`, `/prensa`, `/prensa/[slug]`, `/contacto`).
- Copy, datos y fotografías actuales. No se altera el rostro ni se sustituyen retratos.
- CTAs de texto con flecha (`TextLink`), no botones rellenos.
- Skip link, un solo H1 por página, jerarquía H1 → H2 → H3.
- SEO, canonical, OG, JSON-LD verificados, `generateStaticParams`, export estático.

### Componentes que ya funcionan

- `Header` (estado scrolled, `aria-current`, menú).
- `Hero` + `HeroMedia` + `AnimatedText` (composición asimétrica).
- `CareerTimeline` + `GlobalTimelineIndicator` + rail / teclado / `aria-live`.
- Filas de `Press` (lenguaje de registro, no logo-wall).
- Interiores de Trayectoria y Proyectos (índice + capítulo / stripe).
- Revelado B/N → color al hover, underline de nav, `focus-visible`.
- `output: "export"`, `images.unoptimized`, sin SSR / Server Actions / APIs dinámicas.

### Comportamiento a preservar

- Cursor nativo.
- Scroll nativo (sin jacking).
- Hover solo en `hover: hover` + `pointer: fine`; tap states en táctil.
- Framer Motion ya presente: no se añade otra librería de motion.

---

## 3. Qué se siente plano o repetitivo

1. **Cabeceras de sección.** Casi todas son el mismo bloque: borde superior + H2 uppercase tracking `−0.04em` + CTA a la derecha. El ojo deja de registrar capítulos.
2. **Áreas de trabajo.** Cuatro franjas clonadas. El brief pide gran formato *distinto* por pilar; hoy son cards verticales disfrazadas. Coste de scroll alto (~240 vh) para cuatro leads cortos.
3. **Publicaciones (Home) vs. Áreas.** Misma plantilla de franja imagen/texto. Dos libros acaban pareciendo dos “áreas” más.
4. **Proyectos compactos.** Tres thumbs 4:3 en fila = cuadrícula de tarjetas, el anti-patrón que el propio `DESIGN.md` pide evitar.
5. **Ideas (Home e interior).** Featured + lista; mismo gesto que muchos blogs. El lead “no es un blog” no se ve en la forma.
6. **Contacto y Footer.** Tipográficamente correctos, estáticos. El peak-end cae.
7. **Lenguaje de archivo incompleto.** `signal` casi solo en `ACTIVO`. Sin coordenadas, sin estado de recorrido en Home, sin metadatos de ficha en obras y piezas.
8. **Índices.** El sistema mono —el gesto más específico del concepto— está a medias y se contradice entre Home e interiores.

---

## 4. Criterio de selección

Cada gesto tecnológico debe **nombrar algo que el contenido ya es**. Si no hay dato, no se inventa el adorno.

| Idea inicial | Veredicto | Motivo |
| --- | --- | --- |
| Header: progreso / sección activa | **Sí** | Home es una narrativa larga con anclas reales. |
| Hero: retícula y coordenadas | **Sí** | Metadata y Bogotá ya existen; la foto ya rompe la grilla. |
| Manifiesto: conexiones conceptuales | **Sí, contenido** | Los 6 ejes existen y apuntan a Áreas / Trayectoria. |
| Trayectoria: nodos al recorrer | **Sí, profundizar** | Ya existe; no reconstruir. |
| Áreas: representación distinta por eje | **Sí, prioridad** | Cuatro pilares distintos en datos; forma idéntica. |
| Proyectos: fragmentos de interfaz | **Adaptar** | No hay UI de producto. Sí hay fuente (Enlace Trece / SoyAlejo), categoría e id de pieza. |
| Publicaciones: numeración y metadatos | **Sí** | Año, autores, editorial reales. |
| Prensa: transmisión / registro | **Sí** | Copy y filas ya van en esa dirección. |
| Ideas: mapa de conocimiento | **No** | 3 artículos. Un mapa vacío es teatro. Sustituir por índice editorial. |
| Contacto: señal viva tipo “online” | **No como dashboard** | Olor a SaaS. Sí un cierre de canal, sin pulso ni status bar. |
| Footer: versión / estado de sistema | **No como producto** | Colofón de archivo (`Bogotá · 2026`), no `v1.4.2 online`. |

---

## 5. Propuesta por sección

### 5.1 Header — línea de recorrido

**Conservar:** marca, nav, underline activo por ruta, blur al scroll, skip link, menú.

**Evolución:** una línea de 1 px bajo el borde del header, `transform: scaleX` según el avance de scroll **solo en Home**. En Home, el ítem `Alejandro` no basta: el header puede mostrar un rótulo mono mínimo de capítulo en vista (`CAP. TRAYECTORIA`) a la izquierda del nav, o dejar el nav intacto y que solo la línea cuente el progreso.

**Significado:** el archivo tiene recorrido; el visitante sabe dónde está en el relato, no solo en el sitemap.

**No hacer:** reemplazar el nav por un HUD, puntos de sección tipo landing, ni indicadores por ruta interior (ahí basta `aria-current`).

### 5.2 Hero — ficha de origen

**Conservar:** nombre a escala, foto, overlay, lead, CTAs, lista de metadata, revelado de color.

**Evolución (discreta, detrás de la foto, `aria-hidden`):**

- Retícula de 12 columnas a opacidad muy baja (`--border` ~8–12 %), visible sobre la fotografía, no sobre el texto.
- Una coordenada mono anclada al margen de la imagen, derivada de lo que ya está escrito: `BOGOTÁ · 4.7°N` es demasiado “widget”; preferir el dato ya presente: `BOGOTÁ / COLOMBIA` + `ARCHIVO PERSONAL`. No inventar GPS si no está en origen.
- Entrada del título: mantener el rise de línea, **bajar duración a 500–600 ms**, delay 80 ms. Tracking a `−0.04em`.

**Significado:** la foto no es un banner; es el primer documento del archivo.

**No hacer:** scanlines, glitch, recortar o colorear el rostro, partículas, código.

### 5.3 Manifiesto — declaración con ejes vivos

**Conservar:** índice `[01]`, cita en Newsreader, párrafo de apoyo, lista de ejes.

**Evolución:** los seis ejes dejan de ser una sola línea `·` y pasan a una fila de etiquetas mono. Cada etiqueta puede subrayarse al hover y, en desktop, una línea de 1 px puede asociar visualmente `ESTADO / CIUDADANÍA` con gobernanza, `LIDERAZGO` con el pilar homónimo, `COMUNICACIÓN` con medios, `TECNOLOGÍA` con el cuarto eje. Son **vínculos conceptuales**, no un grafo interactivo.

Si un eje no tiene destino interno claro (`TRANSFORMACIÓN`), se queda como etiqueta, sin forzar un enlace.

**Significado:** el manifiesto nombra el sistema de pensamiento; los ejes son el índice de ese sistema.

**Motion:** revelado del bloque (ya 500 ms). Stagger de ejes 40–60 ms, máximo 6 ítems.

### 5.4 Trayectoria — el archivo que ya late

**Conservar:** estructura, fotos por evento, rail, teclado, `ACTIVO`, indicador lateral, `aria-live`.

**Evolución mínima:**

- El segmento de línea **hasta el nodo activo** usa `--primary`; el resto permanece `--border` (hoy todos los tramos son borde, y solo el punto activo es azul).
- Año grande: `tabular-nums`, tracking `−0.04em`.
- Nodo activo: +1 px de diámetro, sin glow.
- El indicador fijo puede marcar el año activo con `--signal` **solo si** ese año es el evento `ongoing` (Canal Trece / 2026). El resto sigue en azul/marfil.

**Significado:** el recorrido no es decoración; es el tiempo institucional de Alejandro.

**No hacer:** reconstruir la sección, parallax, scroll-jacking, nueva librería de timeline.

### 5.5 Áreas de trabajo — cuatro géneros, no cuatro clones

**Conservar:** los cuatro pilares, textos, fotografías, índices 01–04 de cada eje, revelado B/N.

**Evolución (la más importante del lote visual):**

| Eje | Género visual | Por qué encaja |
| --- | --- | --- |
| 01 Gobernanza digital | **Margen de documento.** Texto dominante, foto más estrecha, índice como expediente. Vertical rule a la izquierda del copy, como margen legal. | Políticas, Estado, regulación. |
| 02 Liderazgo | **Retrato editorial.** Foto a gran formato, título más contenido, menos “hero de sección”. | Dirección de equipos y organización; la foto de oficinas ya existe. |
| 03 Medios | **Marco de transmisión.** Proporción más cinematográfica (16:9), metadata `CANAL TRECE` / `CONTENIDOS`. | Televisión pública; la foto de chaqueta Trece ya existe. |
| 04 Tecnología | **Set / pieza.** Foto de estudio de Enlace Trece con pie técnico (`ESPECIALES ENLACE TRECE`), no un circuito. | IA, innovación, educación desde el programa, no desde un HUD. |

Alturas no idénticas: gobernanza puede ser más baja y textual; medios y tecnología, más visuales. En móvil, no alternar por inercia: una columna, pero **cabecera distinta** (índice + género) para que no parezcan el mismo bloque cuatro veces.

**No hacer:** iconos genéricos, radar chart de 4 ejes, cards iguales.

### 5.6 Proyectos — piezas de archivo, no thumbs de catálogo

**Conservar:** datos, thumbs de YouTube, CTA “Ver todos los proyectos”, enlace externo.

**Evolución:**

- El destacado deja de competir con “otra franja más”: se trata como **emisión**. Metadata mono: fuente (`Enlace Trece`), categoría, identificador de pieza (`ID LpmvsQHb5Zk` truncado o `PIEZA 01 / 04`), nunca un mock de UI inventado.
- Los tres restantes **no van en fila de cards**. Pasan a un **índice de piezas** (como `/proyectos` ya hace con `ProjectIndex`): número, título, fuente. Un solo still a la vez, o el índice sin tres imágenes iguales.
- Home no necesita mostrar 4 thumbs. 1 pieza + índice de 3 respeta el anti-grid.

**Significado:** cada proyecto es un capítulo emitido, no un producto SaaS.

**No hacer:** marcos de “dashboard analytics”, código, play buttons de marketing.

### 5.7 Publicaciones — fichas de obra

**Conservar:** dos obras, portada existente, copy, CTAs, no-ecommerce.

**Evolución:** abandonar la franja gemela de Áreas. Cada libro es una **ficha**:

```
OBRA 01 · 2026
Tecnología real para personas reales
Alejandro Linares · Círculo De Lectores
```

```
OBRA 02 · 2026
Las dos caras del liderazgo
Alejandro Linares y Ever Arévalo
```

Portada contenida (no sangrado a 45 vh). Numeración correlativa. En Home, un índice de dos líneas + una portada destacada basta; la segunda obra no necesita otra franja completa.

**Significado:** son documentos intelectuales con procedencia.

### 5.8 Prensa — registro de transmisión

**Conservar:** filas medio · título · fecha, máximo 4, CTA sala de prensa.

**Evolución:**

- Índice de sección alineado al archivo de rutas: **`[06]`**, no `[04]`.
- Prefijo de fila `REG. 01` … `04` en mono.
- El clipping **más reciente por `dateIso`** (hoy El Colombiano, 2026-08-12) puede llevar `RECIENTE` en `--signal`, el mismo privilegio que `ACTIVO` en trayectoria.
- En hover, el underline ya existe; no añadir logos ni “live badge” parpadeante.

**Significado:** la prensa es señal pública registrada, no un mural de marcas.

### 5.9 Ideas — índice, no mapa

**Conservar:** 3 artículos, categorías reales, featured + lista, CTA.

**Evolución:** tratar Home e interior como **sumario editorial**:

```
IDEA 01 · MEDIOS · 10 ABR 2026 · 8 MIN
IDEA 02 · INTELIGENCIA ARTIFICIAL · …
IDEA 03 · SOCIEDAD · …
```

Un artículo destacado con imagen; los otros como entradas de índice (ya casi es así). Añadir numeración de expediente y alinear el `[04]` de Home con el interior.

**Rechazo explícito del mapa de conocimiento:** con tres nodos el diagrama miente. Cuando el archivo crezca a 8–12 textos, se reevalúa.

### 5.10 Contacto — canal, no semáforo

**Conservar:** cita, título, CTA LinkedIn, lista de redes, copy “canales reales”.

**Evolución:** una línea mono de procedencia (`BOGOTÁ / COLOMBIA · CANALES ABIERTOS`) y el CTA como **canal principal**, no un led “online”. Índice `[07]` también en Home.

**No hacer:** pulso infinito, “system active”, avatares de chat, mapa embebido.

### 5.11 Footer — colofón

**Conservar:** nombre, lugar, nav, redes, statement, copyright.

**Evolución:** una línea de cierre en mono, tono de imprenta:

`ARCHIVO PERSONAL · BOGOTÁ · 2026`

Año **estático o derivado de contenido**, no `new Date()` en cliente (hidratación). Nada de número de versión de producto.

### 5.12 Interiores

No son el foco de la primera oleada visual, pero **no pueden quedar desfasados**:

- Reutilizar el mismo lenguaje de ficha / índice cuando se toque Home.
- `/trayectoria` y `/proyectos` ya tienen radio de archivo: son el modelo a copiar, no a sustituir.
- `/ideas`, `/publicaciones`, `/prensa`, `/contacto`: sumar metadatos (numeración, categorías) sin reescribir las páginas.

### 5.13 Sistema de índices (Home vs. rutas)

Unificar números de las secciones que **tienen ruta** con `NAV_ITEMS`:

| Sección | Home hoy | Propuesta |
| --- | --- | --- |
| Manifiesto | `[01]` | `[01]` (capítulo de origen; coincide con Alejandro) |
| Trayectoria | `[02]` | `[02]` |
| Áreas | — | Sin número de ruta. Etiqueta `EJES` + 01–04 internos |
| Proyectos | `[03]` | `[03]` |
| Ideas | — | `[04]` |
| Publicaciones | — | `[05]` |
| Prensa | `[04]` | `[06]` |
| Contacto | — | `[07]` |

---

## 6. Elementos tecnológicos y su significado

| Elemento | Dónde | Qué significa | Qué no es |
| --- | --- | --- | --- |
| Línea de progreso | Header Home | Avance en el relato | Loading bar de app |
| Retícula 12 col | Hero, detrás de foto | La imagen entra en el sistema editorial | HUD militar |
| Coordenada / lugar | Hero, Contacto, Footer | Procedencia (Bogotá) | GPS decorativo |
| Índices `[n]` y `OBRA` / `IDEA` / `REG.` / `PIEZA` | Secciones | Clasificación de documentos | Numeración cosmética |
| Ejes del manifiesto | Manifiesto | Mapa mental del autor | Grafo de producto |
| Nodos + tramo activo | Trayectoria | Tiempo institucional | Timeline de onboarding |
| `ACTIVO` / `RECIENTE` en `--signal` | Trayectoria, Prensa | El archivo sigue abierto | LED neon |
| Géneros distintos por área | Áreas | Cada eje es un oficio | 4 cards con icono |
| Fuente + id de pieza | Proyectos | Procedencia televisiva / canal | Screenshot de SaaS |
| Autores + editorial | Publicaciones | Cadena de publicación | Ficha de Amazon |
| Filas medio/fecha | Prensa | Transmisión registrada | Logo wall |
| Colofón | Footer | Cierre de imprenta | Status de servidor |
| Revelado B/N → color | Media | El documento se activa al atenderlo | Filtro Instagram |

Textura digital: **solo** ruido de 2–3 % en overlays de foto si hace falta profundidad, nunca sobre texto. Preferible no usarla si la retícula y el B/N ya dan carácter.

---

## 7. Animaciones y microinteracciones

Techo pedido: **150–600 ms**. `DESIGN.md` habla de 0.8 s en secciones: en fase 2 se recorta `--motion-section` a **0.6 s**. Micro 300 ms, componentes 500 ms. Easing actual `--ease-out` se mantiene.

### Qué se anima

| Gesto | Técnica | Duración | Trigger |
| --- | --- | --- | --- |
| Líneas del nombre Hero | CSS `@keyframes` (ya existe) | 500–600 ms | Carga, `no-preference` |
| Progreso del header | CSS `scaleX` | 150–200 ms | Scroll (transform) |
| Capítulo activo (si se muestra) | Opacity / color | 200 ms | IntersectionObserver |
| Ejes del manifiesto | Stagger opacity + `translateY(8px)` | 400 ms + 50 ms | `whileInView` once |
| Nodo / tramo de timeline | Color + scale del punto | 200–300 ms | Cambio de `activeId` |
| Revelado B/N | `filter` (ya existe) | 300 ms | Hover fino |
| Underline nav / prensa / footer | `scaleX` (ya existe) | 300 ms | Hover / current |
| Flecha CTA | `x: 4` (ya existe) | 300 ms | Hover |
| Regla inferior de área | `scaleX` (ya existe) | 300 ms | Hover |
| Entrada de ficha (obras, pieza) | Opacity + `translateY(12px)` | 400–500 ms | Vista, once |

### Qué no se anima

- Parallax de foto.
- Scroll-jacking, sticky progress que bloquee el scroll.
- Loops infinitos (salvo que se descarte cualquier pulso de “live”).
- Cursor custom.
- Stagger de más de ~8 ítems a la vez.
- `filter` en reduced-motion (ya se congela el B/N: correcto).

### `prefers-reduced-motion`

Hoy el sitio **destruye** transiciones útiles (foco, underline, color). Fase 2 debe:

1. Quitar el kill global `0.01ms !important`.
2. Desactivar *desplazamientos y revelados* (translate, scale de media, hero-line).
3. Conservar cambios de color, underline instantáneo o 150 ms, y foco visible.
4. Seguir usando `useReducedMotion()` en Framer.
5. `scroll-behavior: auto` (ya está).

CSS para efectos de 1 propiedad; Framer solo donde ya hay estado (timeline, CTA, manifiesto) o donde un stagger corto aporte. Sin GSAP, Lottie ni canvas.

---

## 8. Impacto en rendimiento y accesibilidad

### Rendimiento

- **Bajo** si se cumple: solo `transform` / `opacity` / `color` en el header; retícula CSS (no canvas); un `IntersectionObserver` para capítulos de Home, compartido, no uno por sección anidada.
- **Riesgo:** más `filter: grayscale` no; ya existe. No añadir blur extra. Header ya usa `backdrop-filter`; no duplicarlo.
- **LCP:** no tocar la foto del Hero ni su `priority`. La retícula es overlay CSS.
- **CLS:** prohibido insertar barras que empujen el layout. La línea de progreso es `position: absolute` en el header. Índices nuevos son texto, no bloques que aparezcan tarde.
- **JS:** un hook de scroll para progreso (passive listener + `startTransition` o `requestAnimationFrame`). Compatible con export estático. Sin APIs, middleware ni backend.
- **Bundle:** sin dependencias nuevas. Framer ya está.

### Accesibilidad (obligatorio en fase 2, aunque sea “infra”)

- Contraste de la flecha: `text-primary` → `text-foreground` o un azul más claro que cumpla 4.5:1.
- Reduced-motion como en §7, no como kill switch.
- Tracking Hero / años a `≥ −0.04em`.
- `theme-color: #101112`.
- `safe-area-inset-top` en header y skip-link.
- Trampa de foco + `overscroll-behavior: contain` en `MobileMenu`.
- Progreso del header: `aria-hidden`; el capítulo, si se anuncia, via `aria-live="polite"` o no se anuncia (el H2 de sección basta).
- Indicador de timeline: se mantiene decorativo; el live region de la sección sigue siendo la fuente.
- `tabular-nums` en años e índices.
- Nav desktop: `min-h-11` o padding equivalente.
- No cubrir el foco con el header (`scroll-padding-top` ya existe; mantenerlo).
- No `user-scalable=no`.

Lighthouse objetivo (`DESIGN.md`): Performance > 90, Accessibility > 95. Esta evolución no debe empeorar LCP/CLS/INP.

---

## 9. Prioridad, complejidad, impacto

Escala: **P0** imprescindible para que el archivo se sienta vivo · **P1** refuerza el relato · **P2** pulido e interiores.

| # | Mejora | Prioridad | Complejidad | Impacto | Notas |
| ---: | --- | :---: | :---: | :---: | --- |
| 1 | Diferenciar las 4 Áreas | P0 | Media | Muy alto | Rompe el valle principal |
| 2 | Unificar índices Home ↔ rutas | P0 | Baja | Alto | Consistencia de archivo |
| 3 | Proyectos: 1 pieza + índice (sin grid 4:3) | P0 | Media | Alto | Evita cards |
| 4 | Publicaciones como fichas de obra | P0 | Baja–media | Alto | Deja de clonar Áreas |
| 5 | Header: progreso de scroll en Home | P1 | Baja | Medio | Estado de sistema sin HUD |
| 6 | Hero: retícula + tracking + duración | P1 | Baja | Medio | Profundidad sin tocar la foto |
| 7 | Manifiesto: ejes como etiquetas | P1 | Baja | Medio | Conecta con Áreas |
| 8 | Trayectoria: tramo activo + tabular-nums | P1 | Baja | Medio | No reconstruir |
| 9 | Prensa `[06]` + REG. + RECIENTE | P1 | Baja | Medio | Ya es el patrón correcto |
| 10 | Ideas: numeración de expediente | P1 | Baja | Medio | No mapa |
| 11 | Reduced-motion no destructivo | P0* | Baja | Alto (a11y) | Infra, no “look” |
| 12 | Contraste flecha / theme-color / safe-area / focus trap | P0* | Baja | Alto (a11y) | Infra |
| 13 | Contacto: procedencia + `[07]` | P2 | Baja | Bajo–medio | Cierre, sin live |
| 14 | Footer: colofón + año estable | P2 | Baja | Bajo | Peak-end discreto |
| 15 | Alinear metadatos en interiores | P2 | Media | Medio | Tras Home estable |
| 16 | Textura de ruido | P2 | Baja | Bajo | Solo si la retícula no basta; default = no |

\*P0 de calidad, no de look. Debe ir en el primer bloque de implementación junto con tokens de motion.

### Orden sugerido de fase 2 (una sección por bloque, tras aprobación)

1. **Infra de motion y a11y** (`globals.css`, `Button`, `Header`/`MobileMenu`, `layout`, tokens 600 ms).
2. **Header** (progreso Home) + **índices** (`SectionLabel` en Home).
3. **Hero**.
4. **Manifiesto**.
5. **Trayectoria** (ajuste, no rewrite).
6. **Áreas** (bloque visual mayor).
7. **Proyectos** Home.
8. **Publicaciones** Home.
9. **Prensa** Home.
10. **Ideas** Home.
11. **Contacto + Footer**.
12. **Interiores** (solo eco de metadatos).

Validación por bloque: 1440 / 1280 / 1024 / 768 / 430 / 390, teclado, contraste, foco, lint, build, carpeta `out/`. `prefers-reduced-motion` en cada bloque con motion.

---

## 10. Fuera de alcance (hasta nueva orden)

- Reescribir `DESIGN.md`.
- Cambiar paleta, fuentes o copy.
- Nuevas fotografías o retoque de rostro.
- Dependencias nuevas, backend, SSR, Server Actions, middleware.
- Mapa de ideas, señal “online”, versión de software, cursor custom, scroll-jacking.
- Rediseño de `/proyectos` archivo completo (solo Home y, luego, eco).
- Animaciones > 600 ms.

---

## Decisión pendiente

Este documento es la única entrega de la **fase 1**.

Si se aprueba, la fase 2 empieza por el bloque 1 (infra de motion/a11y) y sigue sección a sección, reutilizando componentes actuales, sin reescritura general.

Si se rechazan ítems de la tabla §9, se implementan solo los aprobados.

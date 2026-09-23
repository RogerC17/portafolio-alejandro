# Propuesta visual — Archivo Vivo Digital

Documento de precisión. No sustituye a `DESIGN.md`: lo vuelve ejecutable.  
Fuentes: `DESIGN.md`, `docs/ui-ux-audit.md`, Agent Skill **ui-ux-pro-max** (estilo `editorial-grid-magazine`, producto Portfolio/Personal, patrones Hero-Centric + Storytelling-Driven, densidad 3/10 Spacious, pairings tipográficas y stacks `nextjs` / `html-tailwind`).

No se escribió código. No se creó Next.js. No se inventaron datos biográficos, cargos, fechas, proyectos, premios ni canales de Alejandro. Donde el contenido aún no está verificado en alejandrolinares.co: `TODO: validar contenido`.

Cualquier punto que se aparte de `DESIGN.md` va marcado así:

`PROPUESTA PENDIENTE DE APROBACIÓN`

---

## Dirección (no cambiar)

**Archivo Vivo Digital:** trayectoria que sigue escribiéndose.  
Mezcla: portafolio ejecutivo + revista editorial + archivo + plataforma de pensamiento.  
Personalidad: tecnología + gobierno + liderazgo + comunicación + personas.  
Superficie: grafito, marfil, azul eléctrico. Verde solo como señal.  
No: SaaS, dashboard, consultora genérica, cyberpunk, neón, partículas, cards de producto, hero centrado, foto circular, cursor personalizado, scroll-jacking.

Estilo anclado: **Editorial Grid / Magazine** en oscuro. No paleta clara de gobierno. No OLED neón.

---

## 1. Grilla y sistema de columnas

Sistema de **12 columnas** a partir de `1024px`. No es un bento uniforme: es una grilla de publicación con **áreas nombradas**.

| Viewport | Columnas | Gutter (`--space-md` / `--space-lg`) | Margen lateral |
|---|---|---|---|
| 390 / 430 | 4 | 24px | 20px |
| 768 | 8 | 24px | 32px |
| 1024 | 12 | 24px | 48px |
| 1280 / 1440 | 12 | 24px | 64px |

Reglas:

- El contenido vive en un shell `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--gutter)`.
- Fotografías a sangre pueden **salirse una columna** (asimetría controlada). Nunca todas las secciones.
- Texto largo ocupa como máximo 8 columnas (desktop) o `var(--measure)`.
- Gaps de grid, no `margin-bottom` por hijo (guía Tailwind: `gap-*`).
- Bloques reutilizables (proyecto, publicación, idea) usan `@container`, no un segundo sistema de breakpoints.

Áreas tipo (Home):

```text
hero-meta | hero-title | hero-photo | hero-lead | hero-cta
manifesto-index | manifesto-quote | manifesto-aside
timeline-index | timeline-stage | timeline-copy
```

Índices de sección en mono, columna 1–2. Título y cuerpo, columnas 3–10. Excepciones: Hero y Áreas (gran formato).

---

## 2. Anchos máximos

| Token | Valor | Uso |
|---|---|---|
| `--page-max` | `90rem` (1440px) | Shell de la Home |
| `--content-max` | `80rem` (1280px) | Secciones tipográficas (Manifiesto, Ideas, Prensa, Contacto, Footer) |
| `--measure` | `42rem` (~65ch) | Párrafos y excerpts |
| `--hero-title-max` | `20ch` | Caja del H1 (line-balance) |
| `--header-height` | `4.5rem` desktop / `4rem` móvil | Sticky + `scroll-padding-top` |

El canvas puede ser full-bleed (`100vw`). El texto no. En 1440 el shell se centra; la foto del Hero puede invadir el margen derecho.

---

## 3. Espaciado

Densidad ui-ux-pro-max **3/10 — Spacious** (escala 24–96px en los peldaños de sección). Ritmo 4/8.

| Token | px | rem | Uso |
|---|---|---|---|
| `--space-xs` | 4 | 0.25 | Ajuste óptico, gap icono-texto |
| `--space-sm` | 8 | 0.5 | Gap entre targets, underline |
| `--space-md` | 24 | 1.5 | Padding interno de bloques, gutter |
| `--space-lg` | 32 | 2 | Padding de sección en móvil |
| `--space-xl` | 48 | 3 | Padding de sección en tablet |
| `--space-2xl` | 64 | 4 | Padding de sección en desktop |
| `--space-3xl` | 96 | 6 | Separación entre actos de la narrativa |

Aplicación Home:

- Entre Hero y Manifiesto: `--space-3xl`.
- Entre el resto de actos: `--space-3xl` desktop, `--space-2xl` <1024.
- Interior de un acto (índice → título → cuerpo): `--space-md` / `--space-lg`.
- Header: padding horizontal = margen de grilla; altura fija (ver §2).

No usar valores arbitrarios tipo `p-[15px]`.

---

## 4. Escala tipográfica responsive

Tres roles, una escala. El H1 puede ocupar **30–50% del viewport** en altura combinada de las dos líneas, vía `clamp`, no `vw` suelto.

| Rol | Familia | Peso | Tracking | Leading | Tamaño |
|---|---|---|---|---|---|
| Display / H1 | Sans | 700–800 | `-0.04em` a `-0.06em` | `0.9` | `clamp(2.75rem, 6.4vw + 1rem, 8rem)` por línea |
| H2 de sección | Sans | 600–700 | `-0.03em` | `1.05` | `clamp(2rem, 2vw + 1.5rem, 3.5rem)` |
| H3 | Sans | 600 | `-0.02em` | `1.15` | `clamp(1.375rem, 1vw + 1rem, 1.75rem)` |
| Cifras | Sans | 700 | `-0.04em` | `1` | `clamp(2.5rem, 4vw, 5rem)` |
| Pull quote / manifiesto | Serif | 400–500 italic o roman | `0` | `1.2` | `clamp(1.75rem, 2.2vw + 1rem, 3.25rem)` |
| Lead / excerpt | Sans | 400 | `0` | `1.5` | `clamp(1.0625rem, 0.3vw + 1rem, 1.25rem)` |
| Cuerpo | Sans | 400 | `0` | `1.6` | `1rem` (16px) mínimo |
| Nav desktop | Sans | 500 | `0.02em` | `1` | `0.875rem` |
| Metadata / índices | Mono | 400–500 | `0.12em`–`0.18em` | `1.3` | `0.6875rem`–`0.75rem` uppercase |
| Año timeline | Mono | 500 | `0.08em` | `1` | `0.8125rem` |

Reglas:

- Un solo H1 en Home: las dos líneas `ALEJANDRO` / `LINARES`.
- Labels `[01] MANIFIESTO` no son headings.
- Cuerpo: leading 1.5–1.75.
- H1: `max-inline-size: 20ch`. Las dos líneas son identidad, no un wrap aleatorio. En 320px se permite que `LINARES` baje; no insertar espacios duros extra.
- Nunca serif en nav ni en el nombre propio.

---

## 5. Tres fuentes concretas (`next/font`)

Las tres están en el catálogo Google Fonts de ui-ux-pro-max, son **variables** y soportan `latin` + `latin-ext`.

| Rol DESIGN.md | Familia | Axes | Por qué |
|---|---|---|---|
| A. Sans | **Archivo** | `wght` 100–900, `wdth` 62–125 | Pairing *Minimalist Portfolio*. Contundente, no Inter. Eco conceptual con “Archivo Vivo”, sin usarlo como chiste visual. |
| B. Serif | **Newsreader** | `wght` 200–800, `opsz` 6–72 | Pairing *News Editorial*. Periodismo y lectura, no Playfair (lujo) ni Bodoni (moda). |
| C. Mono | **JetBrains Mono** | `wght` 100–800 | Triple stack editorial: años, índices, categorías. Peso 400–500; el 700 rompe el carácter mono. |

Carga (cuando exista Next.js, no ahora):

- `next/font/google` en el layout raíz. Subsets `latin`, `latin-ext`. `display: "swap"`.
- Una instancia variable por familia, no archivos por peso.
- CSS: `--font-sans`, `--font-serif`, `--font-mono`.
- Fallback: `system-ui, sans-serif` / `Georgia, serif` / `ui-monospace, monospace`.

No añadir cuarta familia. No `<link>` a fonts.google.com.

---

## 6. Variables y función de cada color

Base obligatoria de `DESIGN.md` (no se altera el hex):

```css
--background: #101112;   /* Lienzo. Grafito. Nunca #000 OLED. */
--surface: #161719;      /* Bandas de acto, header scrolled, escenario de timeline. No card SaaS. */
--foreground: #F2F0E9;   /* Texto principal y H1. Marfil, no blanco puro. */
--muted: #9A9A9A;        /* Metadata, índices inactivos, bylines. No cuerpo largo. */
--primary: #3057FF;      /* Azul eléctrico: CTA primario, link de énfasis, línea activa, underline. */
--signal: #B8FF3D;       /* Solo badges con texto: ACTIVO, año vigente, NUEVO. Cero glow. */
```

Función operativa:

| Color | Sí | No |
|---|---|---|
| Grafito `--background` | Página, Hero detrás del overlay | Texto |
| `--surface` | Franjas, menú fullscreen, escenario de imagen | Cuatro cards elevadas |
| Marfil `--foreground` | Titulares, cuerpo, iconos con sentido | Fondos |
| `--muted` | Mono labels, fechas inactivas | Párrafos; links |
| `--primary` | Botón/texto CTA grande, estado activo de nav, línea de timeline | Texto <18px sobre grafito (~3.6:1, falla AA) |
| `--signal` | Píldora `● ACTIVO` + palabra | Fondos, hovers, H1, glow, “tech neon” |

`PROPUESTA PENDIENTE DE APROBACIÓN` — tokens extra (no están en la paleta de `DESIGN.md`):

```css
--on-primary: #F2F0E9;     /* Texto sobre azul. Verificar 4.5:1 en el botón real. */
--border: #2A2C2E;         /* Filetes editoriales. Separa surface de background. */
--ring: #F2F0E9;           /* Foco 2px / offset 2px. Contraste de estado ≥3:1. */
--overlay: rgba(16, 17, 18, 0.45); /* Lectura del H1 sobre foto. */
--header-scrolled: rgba(16, 17, 18, 0.88);
```

`--muted` se mantiene como en `DESIGN.md` (texto apagado). No se renombra.

---

## 7. Tratamiento de fotografías

- Origen: sitio actual. Guardar en `public/images/{alejandro,projects,publications,press}/`.
- `next/image`. Hero: `priority`. Resto: lazy.
- Si falta archivo: placeholder tonal `--surface` + label mono `Contenido pendiente`. **No stock. No inventar retratos.**
- Documental, no fashion lighting. Gran formato. `object-fit: cover`. Punto focal: rostro en Hero; acción o contexto en el resto.
- Recortes: 4:5 o 3:4 en Hero desktop; 16:9 en móvil si la vertical pierde el rostro.
- Home Hero: **blanco y negro por defecto**. En pointer fino, contraste/color al hover. Táctil y `prefers-reduced-motion`: se queda en B/N.
- Zoom de hover: `scale(1.03)` máximo, 0.3 s, `transform-origin` en el foco. No Ken Burns continuo.
- Overlay del Hero: degradado de `--background` desde la izquierda/abajo hasta ~45% de opacidad, medido para 4.5:1 del H1 y del lead. Si la foto ya es oscura en la zona de tipo, bajar overlay.
- `alt` concreto cuando se conozca el contexto (`TODO: validar contenido`). Vacío solo si la foto es decorativa junto a un heading equivalente.
- Nunca circular. Nunca filtro neón.

---

## 8. Composición exacta del Hero

Pantalla completa (`min-height: 100svh`). Asimétrica. Un H1. Sin botón azul centrado.

### Desktop ≥1024

```text
┌──────────────────────────────────────────────────────────────┐
│ skip link (visually hidden)     [nav transparente]           │
│                                                              │
│  ALEJANDRO                 ████████████████                  │
│  LINARES                   ████ foto B/N ████  → rompe 1 col │
│                            ████████████████                  │
│  Abogado · Gobernanza…                                       │
│                                                              │
│  “Creo en el poder de la     BOGOTÁ / COLOMBIA               │
│   tecnología y las           GOBERNANZA DIGITAL              │
│   instituciones…”            POLÍTICAS PÚBLICAS              │
│                              TECNOLOGÍA                      │
│  Explorar trayectoria →                                      │
│  Conocer mis ideas →                                         │
└──────────────────────────────────────────────────────────────┘
```

- Foto: columnas 6–12, overflow +40–80px a la derecha y abajo. Z-index 0.
- H1: columnas 1–8, superpuesto, z-index 1. Altura combinada de las dos líneas ≈ 35–45% del viewport en 1440.
- Línea de rol: sans, `--foreground`, bajo el H1, columnas 1–7.
- Lead (cita de `DESIGN.md`, sin alterar): columnas 1–5, `--measure` reducido.
- CTAs: bajo el lead, alineados a la izquierda, no centrados, no relleno azul de píldora.
- Metadata mono: columna 10–12, abajo, o bajo la foto si choca con el rostro. Nunca encima de la cara.

### Móvil <768

- Foto: 52–58vh, full-bleed, rostro al tercio superior.
- H1 superpuesto en el tercio inferior de la foto (overlay más fuerte).
- Rol, lead y CTAs **debajo** de la foto, no centrados: alineación start, padding de grilla.
- Metadata en una sola columna, cuatro líneas, `--space-md` bajo los CTAs.

### CTAs del Hero

`DESIGN.md` pide ambos. Se conservan.

- Primario **Explorar trayectoria →**: sans 500, marfil, flecha que se desplaza 4px, underline que crece. Destino: `#trayectoria` / `/trayectoria`.
- Secundario **Conocer mis ideas →**: mismo patrón, color `--muted` en reposo y `--foreground` en hover. Destino: `#ideas` / `/ideas`.

`PROPUESTA PENDIENTE DE APROBACIÓN` — el primario no usa relleno `--primary` (el spec prohíbe “botón azul debajo”). El azul aparece en la línea/flecha, no en un chip.

---

## 9. Composición del Manifiesto

Gran bloque editorial. Serif. Declaración personal. Sin card.

```text
[01]
MANIFIESTO                         (mono, columnas 1–2)

La tecnología no transforma        (Newsreader, columnas 3–10)
sociedades.
Las personas que saben
utilizarla, sí.

[ copy corto verificado ]          (sans, --measure, columnas 3–8)

ESTADO · CIUDADANÍA · TECNOLOGÍA   (mono, columnas 3–10)
LIDERAZGO · COMUNICACIÓN · TRANSFORMACIÓN
```

- H2 visible: la propia cita, o “Manifiesto” en sans sr-only + cita como texto principal. Un H2, no dos.
- Cita: exactamente el texto de `DESIGN.md`. Dos frases. No drop cap.
- Acompañamiento: **no se inventa prosa de Alejandro**. Un párrafo de 3–4 líneas extraído del sitio original (misión / perfil). Si no hay texto verificable: `TODO: validar contenido` y mostrar solo la cita + los seis ejes en mono.
- Los seis ejes son **índice de archivo**, no nube de tags con hover SaaS.
- Fondo `--background`. Filete superior `--border`. Padding `--space-3xl` vertical.

---

## 10. Navegación desktop y móvil

Ítems (orden de `DESIGN.md`): Alejandro · Trayectoria · Proyectos · Ideas · Publicaciones · Prensa · Contacto.

Alejandro = `/`. El resto, anclas en Home y rutas placeholder.

### Desktop ≥1024

- Header fijo, transparente sobre el Hero.
- Al salir del Hero: `--header-scrolled`, blur 6px, borde inferior 1px `--border`.
- Logo/nombre a la izquierda (sans, no serif), 7 links a la derecha.
- Activo: `aria-current`, filete `--primary` de 1px bajo el ítem (no lima).
- Skip link primer foco: “Saltar al contenido”.

`PROPUESTA PENDIENTE DE APROBACIÓN` — si el blur resta LCP o tapa foco, el header scrolled pasa a sólido `--background` sin blur. El spec pide blur moderado; el sólido sería el fallback.

### Móvil <1024

Se elige **pantalla completa** (opción ya prevista en `DESIGN.md`; se descarta el panel genérico).

- Barra: nombre + botón `List` (Phosphor, 24px, `weight="regular"`).
- Botón: 44×44px táctil, `aria-label` “Abrir menú” / “Cerrar menú”, `aria-expanded`, `aria-controls="mobile-menu"`. Ícono `aria-hidden`.
- Overlay `--surface`, tipografía grande (H3), índices mono `[01]`…`[07]`.
- Foco al primer link al abrir; Escape; retorno al botón; `inert` en el resto.
- Sin hamburguesa de template: el menú es un índice de archivo.

---

## 11. Timeline desktop y móvil

Componente: `CareerTimeline.tsx`. Datos: `data/career.ts` con eventos **reales** del sitio. Campos del spec. Nada inventado.

`activeYear`: el evento cuya caja tiene ≥40% de intersección. Cambia año, imagen y peso tipográfico. **Scroll nativo.** Sin pin, sin scrub, sin `ScrollTrigger` que robe la rueda.

### Desktop ≥1024 — híbrida

```text
[02]
TRAYECTORIA          [2008—····] año activo en mono + sans grande

┌ imagen fija 5 col ┐  ┌ carril horizontal 7 col (overflow-x) ┐
│ misma caja, no CLS│  │  2008  2012  2018  2022  2026        │
│ alt del evento    │  │  —o————o————●————o————o—             │
└───────────────────┘  │  título, institución, texto corto    │
                       └──────────────────────────────────────┘
```

- Imagen en caja de ratio fijo. Crossfade 0.3 s. Una sola `img` visible para AT.
- Carril: `ol`. Cada `li` es un año. Tab + flechas. Botones “Año anterior” / “Año siguiente” (WCAG 2.2 dragging).
- Año activo: peso 700 + línea `--primary`. Lima solo si el copy dice explícitamente vigencia, y con la palabra (`ACTIVO`), nunca el punto solo.

### Móvil — vertical

- Foto arriba (ratio 16:9 o 4:5), texto debajo.
- Un evento tras otro, scroll vertical de página.
- Sin carril horizontal (no desktop comprimido).

### `GlobalTimelineIndicator.tsx`

- Visible ≥1280. Oculto bajo ese corte (el spec ya pide ocultarlo en móvil si perjudica).
- 8px del borde derecho, tipo 11px mono, línea 1px `--border`, punto 4px.
- Sigue `activeYear`. `aria-hidden="true"` porque la `ol` principal ya es la nav. No tapa el foco: `right` + `scroll-padding`.

`PROPUESTA PENDIENTE DE APROBACIÓN` — interpretamos “el scroll activa años” como Intersection Observer, no como scroll-jacking (prohibido en el mismo `DESIGN.md`).

---

## 12. Áreas de trabajo

`FocusAreas.tsx`. Cuatro pilares del spec, textos del spec, fotos reales si existen.

No cuatro cards idénticas.

Desktop: **stack de cuatro franjas** a casi sangre, cada una min 60vh, foto a un lado (alternando izq/der), número mono `01`–`04`, título sans H2, lead del spec.

Móvil: franjas verticales, foto 40vh, texto debajo. Mismo orden 01–04.

Hover (pointer fino): filete `--primary` que crece 0→100% en 0.3 s + recorte de foto `scale(1.03)`. El bloque entero es el enlace. Táctil: sin depender del hover; estado `:active` de opacidad.

Sin iconos de categoría. Sin bento 2×2.

---

## 13. Proyectos

`FeaturedProjects.tsx`. Cuatro especiales **Enlace Trece** verificados. Categorías del spec solo si coinciden con el material real.

Composición **1 + 3**, no 2×2:

```text
[03] PROYECTOS

████████████████████  destacado: imagen amplia, título H3,
████ 4–8 columnas  █  categoría + año mono, descripción corta

██ 2 col ██  ██ 2 col ██  ██ 2 col ██
secundarios: imagen 4:3, título, categoría, año
```

- CTA de sección: `Ver todos los proyectos →` a `/proyectos`.
- Cada ítem: `article` + `figure`. El archivo puede llamarse `ProjectCard.tsx` (nombre de `DESIGN.md`) pero **no** se ve como card de producto: sin sombra, sin radius 16px, sin botón “Ver más” relleno.
- Si no hay cuatro piezas verificadas: mostrar las que existan + `TODO: validar contenido`.

---

## 14. Publicaciones

`Publications.tsx`. Prioridad visual, en este orden, a las dos obras nombradas en `DESIGN.md`:

1. Tecnología real para personas reales  
2. Las dos caras del liderazgo  

Solo si aparecen en el sitio. No inventar sinopsis.

Desktop: **dos obras a gran formato** (portada ~40–45% de alto de sección + ficha: título, año mono, descripción, CTA texto). No grilla de cubiertas tipo tienda.

Móvil: portada + ficha apiladas, una tras otra.

CTA por obra en texto (`Leer` / destino real). Ningún precio, ninguno “Añadir”.

---

## 15. Prensa

`Press.tsx`. H2: **EN LOS MEDIOS**. Máximo cuatro destacados. Medios de ejemplo del spec (Forbes, Infobae, El Colombiano, Semana, Canal Trece) **solo si la aparición está en el sitio**.

Formato: **índice**, no logo slider.

```text
[04] EN LOS MEDIOS

FORBES          Titular de la pieza                    2024  →
INFOBAE         Titular…                               2023  →
```

- Medio en mono. Titular sans. Fecha muted. Fila completa clicable.
- Imagen opcional a la izquierda (80×80 máximo) si existe; si no, solo tipo.
- Logos estáticos, sin carrusel, sin marquee.
- CTA: `Ver sala de prensa →` → `/prensa`.

---

## 16. Ideas

`IdeasPreview.tsx`. Nombre de sección **IDEAS**, no Blog. Tres artículos reales.

Composición **1 destacado + 2 índice**:

- Destacado: imagen 16:9, categoría mono, título H3, excerpt (`--measure`), fecha + `readingTime`.
- Dos siguientes: sin imagen grande; categoría, título, fecha.
- CTA: `Explorar ideas →` → `/ideas`.

Categorías del spec (Gobernanza, IA, Liderazgo, etc.): **solo las que existan en esos tres artículos**. No pintar seis chips vacíos.

---

## 17. Contacto

Cierre editorial. `ContactCTA.tsx`.

```text
“Un mejor futuro es posible cuando las ideas
 se convierten en acciones.”          (Newsreader)

Conversemos sobre lo que viene.       (sans H2)

Trabajemos juntos →                   (CTA primario, mismo patrón del Hero)
```

Canales: lista de enlaces **reales** (`data/social.ts`). Extraer del sitio. Si falta un canal: omitir, no inventar.

Sin formulario de lead-gen en v1 (no está en `DESIGN.md`). El CTA puede ser `mailto:` o URL verificada.

---

## 18. Footer

Minimalista. `--surface`, padding `--space-2xl`.

Fila 1: Alejandro Linares · Bogotá / Colombia  
Fila 2: nav reducida (mismos 7 destinos)  
Fila 3: redes verificadas (iconos Phosphor + nombre accesible; `aria-hidden` si hay texto visible)  
Fila 4: `Ideas para un futuro más humano y digital.` (sans, muted)  
Fila 5: copyright año en curso + nombre. Sin cifras biográficas inventadas.

Sin newsletter, sin mapa, sin cuatro columnas de corporativo.

---

## 19. Microinteracciones

Cursor **normal** (spec).

| Gesto | Comportamiento | Duración |
|---|---|---|
| Link con flecha | `→` translateX 4px | 0.3 s |
| Underline | scaleX 0→1 desde la izquierda, color `--primary` | 0.3 s |
| Línea de sección | filete 1px que crece al entrar en vista | 0.5 s |
| Año timeline | tabular-nums; el activo sube de peso, no de tamaño de caja | 0.3 s |
| Foto | scale 1.03 + (Hero) contraste | 0.3 s |
| Header | fondo/borde al cruzar el Hero | 0.3 s |

No: cursor custom, magnetic, partículas, bounce infinito, glow lima.

---

## 20. Sistema de movimiento

Motor: **Framer Motion**. GSAP solo si un text-reveal del H1 no se puede hacer en FM, y nunca en la timeline.

Traducción de las duraciones de `DESIGN.md`:

| Token | Tiempo | Uso |
|---|---|---|
| `--motion-micro` | 0.3 s | Links, hover, foco, años |
| `--motion-component` | 0.5 s | Imagen, líneas, menú overlay |
| `--motion-section` | 0.8 s | Reveal de un acto (sin stagger encima) |

Easing: **deceleración al entrar** (`ease-out` / cubic `0.16, 1, 0.3, 1`). No `ease-in-out` universal. No `back.out` (overshoot de producto).

Presupuesto por viewport: **1 reveal de sección + hovers**. Guía *Excessive Motion*: no animar H1 + foto + líneas + header a la vez.

Reveal estándar (equivalente Subtle de la base, en FM): opacity 0→1, `y: 12px`, 0.35–0.5 s, al 90% del viewport. Contenido visible sin JS (no `opacity: 0` en SSR).

Stagger: máximo 6 hijos, `0.06 s`. Listas largas de timeline: no stagger por año.

`prefers-reduced-motion: reduce`:

| Pieza | Estado final |
|---|---|
| Reveals | Visible, y=0, sin delay |
| Hero foto | B/N estático, sin zoom |
| Timeline | Año e imagen ya en el evento; sin crossfade |
| Líneas | Ancho 100% |
| Menú | Overlay instantáneo |
| Header | Color sólido, blur opcional apagado |
| `scroll-behavior` | `auto` |

Prohibido: scroll-jacking, pin, scrub, parallax, animaciones >1 s.

---

## 21. Estados interactivos

| Estado | Tratamiento |
|---|---|
| Default | Marfil sobre grafito |
| Hover | Underline / flecha / filete; foto +3% |
| Focus-visible | `outline: 2px solid var(--ring); outline-offset: 2px`. Nunca `outline-none` sin reemplazo |
| Active (pointer) | Opacidad 0.85, sin salto de layout |
| Current (nav / año) | Filete `--primary` + peso; no solo color |
| Disabled | No usar en Home v1 |
| Signal | Texto + punto lima (`ACTIVO`), nunca lima sola |
| Target | Web AA ≥24px; táctil holgura 44px; gap ≥8px entre targets |

Z-index escala: contenido `0` · header `10` · timeline global `20` · menú `30` · skip/focus `40`. Nada de `z-[9999]`.

---

## 22. Breakpoints

Los de `DESIGN.md` son de **comprobación obligatoria**:

```text
1440  1280  1024  768  430  390
```

Cortes de composición (mobile-first):

| Min-width | Qué cambia |
|---|---|
| default | 4 col, menú fullscreen, timeline vertical, Hero apilado |
| 768 | 8 col, Manifiesto en dos bloques, publicaciones apiladas anchas |
| 1024 | 12 col, nav desktop, Hero asimétrico, timeline híbrida, áreas en franja |
| 1280 | Indicador global, márgenes 64px |
| 1440 | Shell máximo; foto del Hero puede sangrar |

`PROPUESTA PENDIENTE DE APROBACIÓN` — añadir prueba de **320px** (guía UX de la skill: 320 / 375 / 414 / 768 / 1024 / 1440). No sustituye la lista del spec; la extiende para el H1.

---

## 23. Accesibilidad

Objetivo `DESIGN.md`: Lighthouse Accessibility > 95. Condiciones de esta propuesta:

- Landmarks: un `header`, un `nav` (el menú), un `main`, `section` por acto, `footer`. Timeline: `ol`. Ideas/prensa/proyectos: `article`.
- Un H1. H2 en orden: Manifiesto, Trayectoria, áreas (o un H2 de grupo + H3 por pilar), Proyectos, Publicaciones, En los medios, Ideas, Contacto.
- Skip link. `scroll-padding-top: var(--header-height)` (*Focus Not Obscured*).
- Contraste: cuerpo marfil/grafito; `--muted` no como cuerpo; `--primary` no como texto pequeño; overlay del Hero medido.
- Color nunca único indicador.
- Menú: nombre accesible, expanded, trampa de foco, Escape.
- Timeline: teclado + botones; no drag único (*Dragging Movements*).
- Iconos Phosphor: `aria-hidden` si hay texto; si no, nombre en el control.
- Reduced-motion: matriz del §20.
- `html { color-scheme: dark }`. Sin tema claro en v1 (no está en el spec).
- No contenido debajo del pliegue con `opacity: 0` permanente (SEO + AT).

---

## 24. Reglas para evitar una apariencia genérica

Antes de cerrar cada sección: *¿esto parece diseñado para Alejandro Linares?*

Hacer:

- Foto documental real como ancla, no mesh gradient.
- Índices `[01]` ligados a actos reales, no a features de producto.
- Serif solo en declaraciones (manifiesto, cita de contacto).
- Asimetría: **una** ruptura de grilla por acto.
- Copy verificado, escueto, institucional-humano.
- Lima miserablemente escasa.
- Bogotá / Colombia como coordenada de archivo, no como badge de startup.

No hacer:

- Inter + fondo `#0A0A0A` + azul 600 + lima glow (Linear/Vercel).
- Bento 2×2, glassmorphism en cards, radius 24px, sombras suaves de SaaS.
- Logo cloud animado de prensa.
- Hero centrado, avatar circular, botón pill azul.
- Cyberpunk, circuitos, partículas, cursor custom (ya prohibidos).
- shadcn visible (empujaría look de app).
- Espacio Grotesk + Playfair (portafolio de estudio / moda).

Si una sección se siente plantilla: rediseñar con foto + índice mono + un gesto tipográfico, no con más UI.

---

## 25. Arquitectura de componentes

Se conserva el árbol de `DESIGN.md`. Matiz: los `*Card` son bloques editoriales.

```text
src/
  app/
    layout.tsx
    page.tsx
    trayectoria/page.tsx          # placeholder
    proyectos/page.tsx
    ideas/page.tsx
    ideas/[slug]/page.tsx
    publicaciones/page.tsx
    prensa/page.tsx
    contacto/page.tsx
  components/
    layout/
      Header.tsx                  # cliente mínimo (scroll + menú)
      Footer.tsx                  # servidor
      MobileMenu.tsx              # cliente
    home/
      Hero.tsx                    # servidor + HeroMedia cliente
      Manifesto.tsx               # servidor
      CareerTimeline.tsx          # cliente (activeYear)
      FocusAreas.tsx              # servidor
      FeaturedProjects.tsx        # servidor
      Publications.tsx            # servidor
      Press.tsx                   # servidor
      IdeasPreview.tsx            # servidor
      ContactCTA.tsx              # servidor
    ui/
      SectionLabel.tsx
      AnimatedText.tsx            # cliente, reduced-motion
      RevealImage.tsx             # cliente
      TimelineIndicator.tsx       # cliente; GlobalTimelineIndicator
      Button.tsx                  # texto+flecha, no pill SaaS
      ArticleCard.tsx             # bloque editorial
      ProjectCard.tsx             # bloque editorial
    seo/
      StructuredData.tsx
  data/
    career.ts
    projects.ts
    publications.ts
    press.ts
    articles.ts
    social.ts
```

Reglas de stack:

- `page.tsx` **servidor**. No `'use client'` en la página.
- Cliente solo en hojas: header scroll, menú, media del Hero, timeline, motion.
- TypeScript estricto, interfaces del spec, `category` como union cuando el set esté validado.
- Contenido fuera del JSX. CMS Sanity después, mismo contrato.

---

## 26. Orden de implementación

Sigue las fases de `DESIGN.md`. Esta propuesta es el contrato visual de FASE 1–2. No implementar código en este paso.

0. **Hecho:** auditoría de especificación (`docs/ui-ux-audit.md`) y esta propuesta.  
   La FASE 0 de repo/Next.js queda para cuando exista aplicación.

1. **FASE 1 — Base:** layout, tokens, Archivo/Newsreader/JetBrains Mono vía `next/font`, Tailwind, Header, Footer, metadata. Sin secciones de contenido.

2. **FASE 2 — Primer impacto:** Hero + Manifiesto. Lint, build, responsive 390/768/1440, contraste de foto. **Parar aquí para validación visual** (lo pide el spec).

3. **FASE 3 — Identidad:** CareerTimeline, GlobalTimelineIndicator, FocusAreas.

4. **FASE 4 — Contenido:** Projects, Publications, Press, Ideas. Solo datos verificados.

5. **FASE 5 — Cierre:** ContactCTA, Footer completo.

6. **FASE 6 — Calidad:** responsive de la lista del spec, a11y, SEO, LCP/CLS/INP, reduced-motion.

Rutas interiores: placeholders desde FASE 1, sin diseñarlas.

Tras cada fase: el resumen corto que pide `DESIGN.md` (cambios, archivos, lint/build, pendiente) y esperar.

---

## Contenido que no se inventa

Bloques con copy ya fijado por `DESIGN.md` (usar literal):

- H1 `ALEJANDRO` / `LINARES`
- Rol: `Abogado · Gobernanza digital · Tecnología · Liderazgo`
- Lead del Hero
- CTAs listados
- Metadata geográfica/temática del Hero
- Cita del manifiesto
- Cuatro pilares y sus leads
- Cita y título de Contacto
- Statement del Footer
- Título de prensa `EN LOS MEDIOS`
- Título `IDEAS`

Todo lo demás (eventos, proyectos, titulares de prensa, excerpts, URLs, fotos, redes): extraer de alejandrolinares.co o marcar `TODO: validar contenido` / `Contenido pendiente`.

---

## Cierre

La dirección sigue siendo **Archivo Vivo Digital**. Esta propuesta fija grilla 12, escala Spacious, tres variables de fuente, semántica de color, Hero asimétrico, manifiesto en Newsreader, timeline de scroll nativo, y un orden de implementación que valida identidad en Hero + Manifiesto antes del resto.

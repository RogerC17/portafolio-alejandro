# Auditoría UI/UX — Archivo Vivo Digital

Fuente revisada: `DESIGN.md` (especificación, no implementación).  
Método: Agent Skill **ui-ux-pro-max** (sistema de diseño + búsquedas por dominio `product`, `style`, `color`, `typography`, `landing`, `ux`, `chart`, `gsap`, `google-fonts`, `icons`, `react` y stacks `nextjs`, `html-tailwind`).  
No se modificó `DESIGN.md`. No se creó aplicación ni se instalaron dependencias.

---

# Resumen

El concepto **Archivo Vivo Digital** es sólido y coherente con el público (gobierno, tecnología, liderazgo, medios) y con la personalidad pedida. La especificación acierta al rechazar SaaS, consultoría genérica, dashboard y ciberpunk, y al proponer una Home narrativa con fotografía documental, tipografía en tres registros y movimiento contenido.

La coincidencia verificada más precisa de estilo es **Editorial Grid / Magazine** (`editorial-grid-magazine`): grilla asimétrica, citas, jerarquía de artículo, imágenes de gran formato y reflow móvil. El producto verificado es **Portfolio/Personal**, con patrón de landing **Storytelling-Driven** / **Hero-Centric**. Eso encaja con Hero → Manifiesto → Trayectoria → … → Contacto.

Hay una tensión útil que hay que resolver a propósito, no por accidente:

- Las paletas “Government/Public Service” de la base son **claras, navy y corporativas**. Seguirlas haría el sitio genérico de sector público.
- El modo **Dark OLED** de la base empuja **acentos neón**. Seguirlo chocaría con la prohibición de neón y futurismo cliché.
- La dirección correcta es **grafito editorial oscuro + azul eléctrico + serif humano**, no gobierno claro ni OLED neón.

La especificación está lista para orientar identidad, pero **aún no es un sistema de diseño ejecutable**: faltan familias tipográficas concretas, tokens semánticos completos, definición de grilla, estados de foco, comportamiento reducido de movimiento por componente, y alternativas de teclado para la timeline. Esos huecos son el principal riesgo de que la implementación se parezca a una plantilla Awwwards / Linear / agencia 2025.

---

# Decisiones acertadas

## Concepto y público

- “Archivo que sigue evolucionando” justifica índices `[01]`, años, metadata y una timeline viva, sin convertir el sitio en CMS de noticias.
- La personalidad **tecnología + gobierno + liderazgo + comunicación + personas** se sostiene si la fotografía documental y el manifiesto en serif contrarrestan el azul eléctrico.
- El rechazo explícito de cards, hero centrado, foto circular, botón azul debajo, cursor personalizado y scroll-jacking evita los anti-patrones más comunes de portafolio premium genérico.
- Home primero, rutas interiores como placeholders: correcto para validar identidad antes de volumen de contenido.
- Contenido real del sitio actual, sin inventar cargos ni premios: protege credibilidad ante un público institucional.

## Paleta

- Grafito `#101112` / `#161719` + marfil `#F2F0E9` es una base editorial creíble (no el negro puro OLED `#000000` ni el blanco SaaS `#FAFAFA`).
- Azul `#3057FF` como acento de marca, no como relleno de toda la UI.
- Verde `#B8FF3D` limitado a señales (`ACTIVO`, `2026`, `NUEVO`): alineado con “un solo acento vibrante” del estilo *Exaggerated Minimalism*.
- `#F2F0E9` sobre `#101112` supera con holgura 4.5:1 (texto principal).
- `#9A9A9A` sobre `#101112` ronda ~6.5:1: usable para metadata, no para cuerpo largo.
- Blanco/marfil sobre `#3057FF` ronda ~5.3:1: el CTA relleno puede cumplir AA si el texto no es gris.

## Tipografía

- Tres registros (sans contundente, serif de declaración, mono de archivo) coinciden con un archivo editorial, no con un SaaS de una sola grotesk.
- Sans en H1 y navegación (no serif de lujo en el nombre) evita estética fashion/spa. Las pairings *Classic Elegant* (Playfair + Inter) y *Editorial Classic* (todo serif) serían demasiado “revista de moda” para este perfil.
- Mono para años, índices y coordenadas es el gesto de “archivo” más específico del concepto.
- `next/font` está bien exigido: la guía de stack Next.js pide fuentes autoalojadas y, si es posible, variables, para no pagar CLS.

## Composición y UX

- Pregunta “¿existe una manera más editorial?” antes de cualquier grid de tarjetas: es el criterio de calidad más importante del documento.
- Hero a pantalla completa, nombre partido, foto que rompe la grilla, CTAs en texto con flecha: coherente con *Hero-Centric* + *Exaggerated Minimalism*.
- Manifiesto como declaración personal en serif: es el contrapunto humano al azul tecnológico.
- Timeline horizontal/híbrida en desktop y vertical en móvil: respeta *Mobile First* (no comprimir desktop).
- `GlobalTimelineIndicator` opcional y ocultable en móvil: discreción correcta.
- Áreas de trabajo numeradas a gran formato, no cuatro cards idénticas.
- “Ideas” en lugar de “Blog”: lenguaje de pensamiento, no de CMS.
- Publicaciones como obra intelectual, no ecommerce.
- Prensa con máximo cuatro destacados en Home: control de ruido.
- Header transparente → blur moderado, sin mega-menú corporativo.
- Animaciones cortas (0.3 / 0.5 / 0.8 s), sin scroll-jacking, con `prefers-reduced-motion`.
- Semántica `header/nav/main/section/article/aside/footer`, un solo H1, datos separados de JSX, App Router, Server Components por defecto.

## Tecnología

- Next.js + TypeScript + Tailwind + Framer Motion es viable para esta pieza.
- `next/image` con `priority` en el Hero cubre LCP.
- Metadata API, OG, Person schema: alineado con las guías Next.js verificadas.
- `data/*.ts` deja un corte limpio hacia Sanity después.
- GSAP solo si Framer Motion no alcanza: correcto; el riesgo está en *cuándo* se considera que “no alcanza”.

---

# Ambigüedades

1. **Familias tipográficas no nombradas.** Hay roles (sans / serif / mono) pero no familias, pesos, tracking ni `clamp()`. Sin eso, dos implementaciones del mismo spec pueden verse como productos distintos.
2. **Tokens incompletos e inconsistentes.** Faltan `--border`, `--ring`, `--on-primary`, `--destructive`, `--muted-foreground`. `--muted` se usa como color de texto, no como superficie (en los sistemas de la skill, `muted` es fondo y `muted-foreground` es texto).
3. **Grilla editorial no definida.** No hay columnas, `max-width`, gutters, named areas ni medida de lectura (~65ch). El estilo `editorial-grid-magazine` exige grid asimétrico explícito; aquí solo se describe la intención.
4. **Uso semántico de `--primary` vs `--signal`.** No está claro si el azul pinta CTAs, links, estados activos de nav, o todo ello. El verde puede colisionar con “año activo” de la timeline.
5. **Hero: foto + tipo 30–50% del viewport.** No se define z-index, recorte, punto focal, ni contraste mínimo del texto sobre la imagen (color u overlay).
6. **Manifiesto: “acompañar con texto relacionado”.** Puede convertirse en el párrafo largo que el propio spec prohíbe, o en una nube de palabras genérica (Estado, ciudadanos, tecnología…).
7. **Timeline: “el scroll debe poder activar diferentes años”.** Puede interpretarse como scrub (casi scroll-jacking, anti-patrón de *Motion Sensitivity*) o como Intersection Observer pasivo (recomendable). No se define teclado, foco ni estado `activeYear` accesible.
8. **Timeline híbrida vs `GlobalTimelineIndicator`.** Dos cromos de tiempo en desktop pueden duplicar señal y tapar foco (WCAG 2.2 *Focus Not Obscured*).
9. **Áreas: hover como diseño.** No hay equivalente teclado/touch. El hover no existe en móvil.
10. **Proyectos / Publicaciones / Ideas: componentes `*Card`.** La arquitectura nombra `ProjectCard` y `ArticleCard` mientras el criterio visual dice “no abusar de cards”. Conflicto de implementación.
11. **Contacto: canales “reales o existentes”** sin lista. Tampoco se decide formulario vs. mailto/redes.
12. **Menú móvil: “pantalla completa o panel elegante”.** Dos patrones distintos; no hay `aria-expanded`, trampa de foco ni restauración de foco.
13. **Responsive: 430 / 390**, pero la guía UX pide probar **320, 375, 414, 768, 1024, 1440**. Falta el extremo 320 px, crítico para el H1 gigante.
14. **CTA dual en Hero** (“Explorar trayectoria” y “Conocer mis ideas”). *Hero-Centric* pide **un** CTA primario. No hay regla de jerarquía visual entre ambos ni respecto a “Trabajemos juntos”.
15. **`DESIGN.md` contradice esta fase:** las secciones 2, 36 y 40 ordenan inspeccionar `package.json` y construir FASE 1–2. En el estado actual del repo eso no aplica; esta auditoría cubre solo la especificación.

Búsquedas sin match verificado (no se persistió salida no verificada):

- `product`: “editorial portfolio archive” → 0. Reintento “personal portfolio” → **Portfolio/Personal** (usado).
- `landing`: “hero editorial photography” y “contact cta” → 0. Reintentos: **storytelling hero-centric** y **trust-authority-conversion** (usados).
- `chart`: “career timeline” devolvió *line chart* de datos; **no aplica** a una career timeline editorial.
- `react`: “animation reduced motion” y “intersection observer” → 0. No hay guía React verificada para el scrub de años.
- `google-fonts`: “editorial serif” y “monospace” devolvieron familias irrelevantes (Adamina, Datatype, etc.). Se ignoran. La pairing verificada a usar es la de `typography.csv`.

---

# Riesgos

## Apariencia genérica (alta)

| Gesto del spec | Cómo se vuelve plantilla | Qué lo salva |
|---|---|---|
| Oscuro + azul eléctrico + lima | Linear / Vercel / SaaS dark | Lima rarísima; foto documental; serif del manifiesto |
| Header blur al scroll | Agencia 2024–2026 | Tipografía propia + ausencia de glass en el resto |
| `[01] MANIFIESTO` en mono | Portafolio Awwwards | Contenido institucional real, no lorem editorial |
| Grid asimétrico sin criterio | Bento de features SaaS | Named areas, no cajas iguales a 1fr |
| Hover zoom en imágenes | Template de estudio | Zoom mínimo o recorte documental, no Ken Burns |
| Cuatro pilares con foto | Home de consultora | Títulos y fotos realmente distintas, no iconos |

El **verde `#B8FF3D`** es el mayor riesgo de “tech startup”. Un glow, un fondo lima o un cursor-follow lo empujarían al anti-patrón que el spec ya prohíbe. El estilo *Dark Mode OLED* de la base **no debe seguirse** en acentos neón.

El primer `--design-system` (query con “government”) devolvió **Accessible & Ethical** + Atkinson Hyperlegible + paleta clara navy. Es correcto para un trámite público; **incorrecto** para este portafolio. El reintento editorial devolvió **Minimalism & Swiss** + Archivo/Space Grotesk + fondo `#FAFAFA`: más cercano, pero todavía demasiado “SaaS profesional”. El estilo a anclar es **Editorial Grid / Magazine** en superficie oscura, no Swiss claro ni gobierno WCAG-template.

## Paleta y contraste

- `#3057FF` sobre `#101112` ronda **~3.6:1**: no sirve para texto normal ni links pequeños. Solo UI no textual grande o texto grande.
- Superficie `#161719` vs fondo `#101112` apenas se separa: las “cards” (si aparecen) se perderán. Hace falta borde o un escalón tonal mayor.
- Metadata del Hero sobre fotografía: el spec no garantiza 4.5:1. Es el fallo AA más probable del primer viewport.
- `ACTIVO` solo en lima viola *Color Only* si no hay texto o icono equivalente.
- No hay token de foco (`--ring`). En oscuro, un `outline` azul 1 px desaparece.

## Timeline y movimiento

- Timeline horizontal + “scroll activa años” es el camino más corto hacia **scroll-jacking**, náusea y CLS (cambio de imagen).
- GSAP `ScrollTrigger` aparece en la base como ejemplo **negativo** de *Motion Sensitivity*.
- El dial de motion 4/10 adjuntó stagger con `back.out(1.4)`: **inadecuado** para un archivo sobrio (overshoot de producto).
- Animar más de 1–2 elementos por vista viola *Excessive Motion* (Hero tipo + foto + líneas + header a la vez).
- Indicador sticky a la derecha puede **tapar el foco** de teclado (*Focus Not Obscured*, AA).
- Si los años se eligen arrastrando, WCAG 2.2 exige alternativa de **un solo pointer y teclado** (*Dragging Movements*).

## Hero, tipografía y responsive

- Nombre al 30–50% del viewport sin `clamp` ni prueba en 320 px: overflow, huérfanas, recorte.
- Foto a color al hover: en táctil no existe; con reduced-motion debe quedarse en el estado final estático (*Hero-Centric*).
- Siete ítems de nav + logo: el patrón *Minimal Single Column* advierte “no nav clutter”. En desktop cabe; en 390 px el menú a pantalla completa es obligatorio, no opcional.

## Accesibilidad y Lighthouse

- Meta de Accessibility > 95 es incompatible con texto sobre foto, blur sticky, timeline que cambia imagen y menú sin foco definido, **si no se especifican overlays, `scroll-padding` y skip link**.
- No hay skip link (*Skip Links*, páginas con nav pesada).
- Botón de menú icon-only sin nombre accesible: fallo directo (*ARIA Labels* / guideline de iconos).
- `prefers-reduced-motion` está nombrado, pero no se lista qué se apaga (reveal, zoom, line draw, swap de imagen, blur del header).

## Tecnología

- Si `page.tsx` lleva `'use client'` para Framer Motion, se infla el JS del Home y se pega LCP/INP. La guía Next.js pide **Client Components como hojas**.
- Imágenes remotas de alejandrolinares.co sin `remotePatterns` rompen `next/image`.
- Arquitectura con muchos Client Components animados vs. “evitar dependencias” y Lighthouse Performance > 90: hay que presupuestar motion.
- `ProjectCard` / `ArticleCard` empujan a UI de producto. Mejor bloques editoriales (`figure`, `article`) con clases de composición.

---

# Recomendaciones

## Paleta y uso semántico

Conservar los hex actuales, pero completar el sistema:

| Token | Rol | Notas |
|---|---|---|
| `--background` `#101112` | Lienzo | Grafito, no OLED `#000` |
| `--surface` `#161719` | Bandas, no cards | Subir un escalón o usar `--border` para separar |
| `--foreground` `#F2F0E9` | Texto principal | Marfil, no blanco puro |
| `--muted-foreground` `#9A9A9A` | Metadata | Renombrar; no usar `--muted` para texto |
| `--primary` `#3057FF` | Links grandes, CTA relleno, estado activo | Nunca texto pequeño sobre grafito |
| `--on-primary` `#F2F0E9` | Texto sobre azul | Verificar 4.5:1 en el botón real |
| `--signal` `#B8FF3D` | Solo badges con texto (“Activo”, no solo punto) | Cero glow |
| `--ring` | Foco 2 px + offset 2 px, contraste de estado ≥ 3:1 | Obligatorio en oscuro |
| `--border` | Separadores editoriales | Visible; no gris que desaparece |

No implementar tema claro en v1 (el estilo OLED marca light como no recomendado para esta dirección). Sí garantizar contraste AA en oscuro.

## Combinación sans, serif y monospace

Anclar familias (propuesta alineada a pairings verificadas, **no** a las google-fonts irrelevantes):

- **Sans (H1, nav, cifras):** **Archivo** variable. Coherente con *Minimalist Portfolio* y con el nombre conceptual “Archivo Vivo”, sin ser un chiste visual. Alternativa: **Instrument Sans** (variable, `latin-ext`).
- **Serif (manifiesto, citas, statements):** **Newsreader** o **Source Serif 4**. Periodismo / lectura larga; no Playfair (lujo) ni Bodoni (revista de moda).
- **Mono (años, índices, categorías):** **JetBrains Mono** 400–500, uppercase, tracking amplio, como en *Minimalist Monochrome Editorial*.

Regla: máximo estas tres; `next/font/google` en el layout raíz; pesos variables, no archivos por peso. El H1 permanece sans. La serif no se usa en navegación.

## Sistema de grilla editorial

Definir antes de FASE 1:

- Desktop ≥1280: composición 12 columnas, contenido 10–12, gutter creciente (no el mismo margen que en 390).
- Áreas con nombre (`hero-type`, `hero-photo`, `meta`, `quote`, `body`), no `grid-cols-3` uniforme.
- Medida de texto largo ≤ ~65ch.
- Asimetría: la foto o la cifra rompe **una** columna, no todas las secciones.
- Gaps con escala Tailwind (`gap-4/6/8/12/24`); no márgenes sueltos por ítem.
- Container queries para bloques reutilizables (proyecto, publicación), no solo breakpoints de página.

## Hero

- Un H1: las dos líneas `ALEJANDRO` / `LINARES` son el único H1.
- CTA primario único visualmente: **Explorar trayectoria**. “Conocer mis ideas” como texto-link, no segundo botón gemelo.
- Overlay o recorte que garantice 4.5:1 del titular y de la línea de rol sobre la foto (probar zona clara y zona oscura).
- Foto: `next/image` + `priority` + `sizes` de viewport; punto focal definido (rostro).
- Blanco y negro por defecto; el cambio de contraste solo en pointer fino, con estado estático si `prefers-reduced-motion` o táctil.
- Metadata (`BOGOTÁ / COLOMBIA`…) en mono, fuera de la cara, no como watermark ilegible.
- Evitar parallax. El patrón *Hero-Centric* lo desactiva bajo reduced-motion.

## Manifiesto

- La cita en serif, tamaño de pull quote (~1.5em+), no drop cap de revista si no aporta.
- Un párrafo corto de contexto (máximo 3–4 líneas) + tres metadatos en mono (`Estado`, `Ciudadanía`, `Tecnología`), no un ensayo.
- Label `[01] MANIFIESTO` como `p` o `span`, no como H2 vacío de sentido; el H2 puede ser la propia cita o “Manifiesto”.

## Timeline

- Implementar como **lista ordenada** semántica. `activeYear` se actualiza por Intersection Observer, sin hijack del scroll.
- Desktop: carril horizontal **dentro** de la sección (overflow propio), no takeover del scroll de la página.
- Móvil: vertical, un evento a la vez, imagen encima o debajo, no al lado.
- Años clicables y navegables con teclado (flechas / tabs). Si hay drag, botones “anterior / siguiente año”.
- Cambio de imagen: `position` absoluto con la misma caja reservada para no mover CLS; `alt` del evento visible, no de todas las fotos apiladas.
- Color de año activo: no solo lima; peso tipográfico + línea.
- Animación: fade 300–400 ms, `ease-out`, offset Y 8–16 px. Sin `back.out`.

## Timeline global

- Solo desktop ≥1280. `aria-hidden` si duplica la timeline principal; o bien es la única nav de años (`nav` + `aria-label="Trayectoria por año"`).
- `scroll-padding` igual a la altura del header para no tapar foco.
- z-index en escala (`z-10` header, `z-20` menú), nunca `z-[9999]`.

## Áreas de trabajo

- Bloques a sangre o 12 columnas, cada uno con número mono, título sans, un lead y foto distinta.
- Hover: línea o recorte, no lift de card. En táctil, el bloque entero es el enlace (`≥24px` web AA; holgura de 44px recomendable).
- No iconos emoji. Si hay icono, Phosphor `aria-hidden` junto al texto visible.

## Proyectos

- Composición 1 destacado + 3 secundarios, o 2+2 desiguales. Nunca cuatro tiles iguales.
- Categoría y año en mono; título sans; no botón “Buy”.
- `figure`/`article`, no `ProjectCard` genérico. El CTA “Ver todos los proyectos →” es un texto-link editorial.

## Publicaciones

- Las dos obras prioritarias a gran formato (portada + ficha), el resto en lista tipográfica.
- Portada como objeto de libro (sombra documental mínima), no tile de catálogo.
- CTA por obra en texto, no botones primarios repetidos.

## Prensa

- Lista editorial: medio (sans/mono) + titular + fecha. Logos estáticos, **no carrusel**.
- *Trust & Authority* aplica a credibilidad, no a “logo slider” corporativo. Si hay movimiento, pause/prev/next y corte en reduced-motion.
- Máximo cuatro en Home, como ya está.

## Ideas

- Tres piezas: un destacado (título grande + excerpt) y dos en índice.
- “Ideas” como H2 de sección; categorías en mono, máximo las que existan en los tres artículos reales.
- `readingTime` como metadata, no como gamificación.

## Contacto

- Cierre de relato, no formulario de lead-gen SaaS.
- Un CTA fuerte: **Trabajemos juntos**. Canales (email, LinkedIn, etc.) como lista de enlaces reales, verificados.
- El patrón *Trust & Authority* coloca contacto también en nav: el ítem “Contacto” basta; no hace falta botón “Contact Sales” persistente.

## Header

- Transparente sobre Hero; al salir del Hero, fondo `#101112` a ~80–90% y blur **bajo** (4–8 px). Si el blur pelea con LCP o con foco, priorizar sólido.
- Estado activo por ruta o por sección en Home (`aria-current`).
- Skip link “Saltar al contenido” como primer foco.
- `scroll-padding-top: var(--header-height)`.

## Menú móvil

- Elegir **pantalla completa** (más archivo: tipografía grande, índices, años).
- `button` con `aria-expanded`, `aria-controls`, foco inicial al abrir, Escape, retorno al botón.
- Ícono Phosphor + nombre accesible (“Abrir menú” / “Cerrar menú”). Decorativo: `aria-hidden`.
- Ítems a tamaño táctil, no lista densa de desktop comprimido.

## Responsive

- Diseñar 390 primero para Hero, nav y timeline; luego 768, 1024, 1280, 1440. Añadir prueba en **320**.
- El H1 debe vivir de `clamp()`, no de un `vw` crudo que desborde.
- 1024 es el corte de timeline híbrida, no 768 (en tablet horizontal el indicador lateral estorba).

## Accesibilidad

- Foco visible global (`outline` 2 px, offset 2 px, color `--ring`).
- Un H1; H2 por sección en orden; labels `[01]` no sustituyen headings.
- Color nunca como único indicador (año activo, “Nuevo”).
- Reduced-motion: estado final visible, sin parallax, sin zoom de foto, sin line-draw, sin stagger largo.
- Fotos documentales: `alt` concreto (“Alejandro Linares en [contexto]”), no vacío ni keyword stuffing.
- Meta Lighthouse Accessibility > 95: tratarla como tesoro de implementación, no como ya ganada por el spec.

## Animaciones

- Presupuesto: **un** reveal de sección + microinteracciones de enlace. El resto, CSS hover.
- Duraciones: 0.3 s controles, 0.45 s bloques, 0.6 s máximo para el H1. 0.8 s solo si no hay stagger encima.
- Easing: deceleración al entrar (`ease-out`); no `ease-in-out` universal; no `back.out`.
- Framer Motion en hojas cliente (`HeroMedia`, `Timeline`, `MobileMenu`). El resto, Server Components.
- GSAP: no para la timeline. Reservarlo, si acaso, a un text-reveal del H1 que Framer no cubra bien; con fallback de texto plano (la guía SplitText prohíbe partir párrafos y exige `revert()`).

## Viabilidad Next.js / TypeScript / Tailwind / Framer Motion

Viable. Condiciones:

1. `layout.tsx` servidor: fuentes, metadata, skip link, CSS de tokens.
2. `page.tsx` servidor: secciones estáticas; importar islas cliente.
3. Tailwind: tokens en `@theme` / CSS variables; grilla con named areas; `motion-safe:` / `motion-reduce:`.
4. Framer: `useReducedMotion()` en cada variante; imágenes con layout fijo.
5. TypeScript: las interfaces del spec bastan; `category` como union, no `string` suelto.
6. No shadcn salvo piezas invisibles (FocusTrap). shadcn empuja look SaaS, que el spec prohíbe.
7. CMS: `data/*.ts` ahora; Sanity después sin cambiar la narrativa visual.

---

# Decisiones que deben conservarse

1. Nombre conceptual **Archivo Vivo Digital**.
2. Dark grafito + marfil + azul eléctrico; lima solo como señal con texto.
3. Tres lenguajes tipográficos con sans en el nombre propio y serif en el manifiesto.
4. Home como relato en el orden ya escrito.
5. Hero editorial asimétrico, foto real, sin círculo ni centro clásico.
6. Cita del manifiesto tal cual.
7. Timeline de carrera como pieza central, vertical en móvil, sin scroll-jacking.
8. Indicador global opcional y no móvil.
9. Cuatro áreas a gran formato, no cards.
10. Ideas ≠ Blog; publicaciones ≠ ecommerce; prensa limitada a cuatro.
11. Contenido verificado del sitio actual; si falta, `TODO` / “Contenido pendiente”.
12. Framer Motion primero; GSAP excepcional; cursor nativo; reduced-motion.
13. App Router, Server Components por defecto, `next/image`, `next/font`, datos fuera del JSX.
14. Criterio: “¿parece diseñado específicamente para Alejandro Linares?”
15. Fases: validar paleta, tipo, foto, Hero y Manifiesto antes de la timeline.

---

# Elementos que requieren validación

Antes de implementar (o en paralelo a FASE 1, sin inventar):

- [ ] Familias tipográficas finales (¿Archivo + Newsreader + JetBrains Mono?).
- [ ] Contraste real del H1 y la metadata sobre la fotografía elegida (varias crops).
- [ ] Fotografía Hero: autorización de uso, recorte, versión B/N, `alt`.
- [ ] Eventos de trayectoria, fechas, cargos e instituciones en alejandrolinares.co.
- [ ] Cuatro proyectos de Especiales Enlace Trece: títulos, años, URLs, capturas.
- [ ] Las dos publicaciones prioritarias: portadas de calidad suficiente a gran formato.
- [ ] Cuatro piezas de prensa (Forbes, Infobae, El Colombiano, Semana, Canal Trece u otras reales).
- [ ] Tres artículos reales para Ideas, con categorías que existan de verdad.
- [ ] Canales de contacto y redes vigentes.
- [ ] Comportamiento de timeline: Observer vs scrub; teclado; CLS de imagen.
- [ ] Copy corto del manifiesto (el acompañamiento, no la cita).
- [ ] Jerarquía de CTAs: trayectoria vs ideas vs “Trabajemos juntos”.
- [ ] Patrón único de menú móvil (fullscreen).
- [ ] Token de foco y prueba de teclado con header sticky.
- [ ] Prueba 320 / 390 / 768 / 1024 / 1440 del H1 y de la timeline.
- [ ] Reduced-motion: matriz de qué se apaga en Hero, timeline y hovers.
- [ ] `remotePatterns` si las imágenes no se copian a `public/`.
- [ ] Schema.org Person: cargos y mismos datos que el contenido visible.

**Fuera de alcance de esta auditoría:** inspección de repositorio de aplicación, `package.json`, componentes y FASE 1–2 de construcción. No existen aún; no se buscaron.

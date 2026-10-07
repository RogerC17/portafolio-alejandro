---
name: Alejandro Linares
description: Portafolio archivo. El panel local añade el oro de marca y los controles de ficha; el sitio público conserva las secciones 1 a 40.
colors:
  archive-gold: "#c9a45c"
  archive-gold-hover: "#d7b56d"
  alert-rose: "#e7b2b2"
  hairline: "#2a2c2e"
  hairline-strong: "#4a4d51"
  rail-wash: "#222426"
  preview-well: "#0c0d0e"
rounded:
  control: "0.25rem"
spacing:
  nav: "0.25rem"
  label: "0.35rem"
  stack: "0.9rem"
  screen: "1.5rem"
  workspace: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.archive-gold}"
    textColor: "#101112"
    rounded: "{rounded.control}"
    padding: "0 1.15rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.archive-gold-hover}"
    textColor: "#101112"
    rounded: "{rounded.control}"
    padding: "0 1.15rem"
    height: "2.75rem"
  button-save-saved:
    backgroundColor: "#f2f0e9"
    textColor: "#101112"
    rounded: "{rounded.control}"
    padding: "0 1.15rem"
    height: "2.75rem"
  button-nav-current:
    backgroundColor: "{colors.archive-gold}"
    textColor: "#101112"
    rounded: "{rounded.control}"
    padding: "0 0.75rem"
    height: "2.75rem"
  button-nav-hover:
    backgroundColor: "{colors.rail-wash}"
    textColor: "#f2f0e9"
    rounded: "{rounded.control}"
    padding: "0 0.75rem"
    height: "2.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "#f2f0e9"
    rounded: "{rounded.control}"
    padding: "0 0.75rem"
    height: "2.75rem"
  button-tool:
    backgroundColor: "transparent"
    textColor: "#f2f0e9"
    rounded: "{rounded.control}"
    padding: "0 0.7rem"
    height: "2.75rem"
  button-tool-danger-hover:
    backgroundColor: "transparent"
    textColor: "{colors.alert-rose}"
    rounded: "{rounded.control}"
    padding: "0 0.7rem"
    height: "2.75rem"
  input-field:
    backgroundColor: "#101112"
    textColor: "#f2f0e9"
    rounded: "{rounded.control}"
    padding: "0.65rem 0.75rem"
    height: "2.75rem"
---

# Rediseño completo de alejandrolinares.co — Guía para Cursor

Actúa como desarrollador frontend senior, diseñador UX/UI y arquitecto web.

Vas a construir desde cero una nueva versión del sitio personal de Alejandro Linares tomando como referencia de contenido el sitio actual:

https://alejandrolinares.co/

## Importante

El sitio actual debe utilizarse únicamente como fuente de:

- información
- trayectoria
- fotografías
- proyectos
- publicaciones
- artículos
- apariciones en medios
- referencias personales
- enlaces
- material audiovisual

**NO copies su diseño actual.**

El objetivo es reconstruir completamente la experiencia.

---

## 1. Objetivo general

Crear un portafolio personal premium para Alejandro Linares.

El sitio debe permitir entender rápidamente:

1. Quién es Alejandro Linares.
2. Cuál ha sido su trayectoria.
3. En qué temas trabaja.
4. Qué proyectos ha liderado.
5. Qué ha publicado.
6. Qué ideas desarrolla.
7. Qué presencia ha tenido en medios.
8. Cómo contactarlo.

La nueva página debe sentirse como una mezcla entre:

- portafolio ejecutivo
- revista editorial
- archivo de trayectoria
- plataforma de pensamiento
- experiencia digital interactiva

No quiero una página corporativa tradicional.

No quiero una plantilla genérica.

No quiero que parezca una página SaaS.

No quiero un dashboard.

No quiero una web genérica de consultoría.

No quiero estética cyberpunk.

No quiero abuso de partículas, circuitos, neón o efectos futuristas cliché.

La personalidad debe surgir de:

**TECNOLOGÍA + GOBIERNO + LIDERAZGO + COMUNICACIÓN + PERSONAS**

---

## 2. Forma de trabajo en Cursor

Antes de modificar código:

1. Revisa todo el repositorio.
2. Identifica qué existe actualmente.
3. Determina qué puede reutilizarse.
4. Detecta dependencias instaladas.
5. Revisa `package.json`.
6. Revisa configuración de Tailwind.
7. Revisa estructura de carpetas.
8. Revisa componentes existentes.
9. Revisa assets existentes.
10. Revisa errores actuales.

No sobrescribas archivos innecesariamente.

No elimines componentes que funcionen sin una razón técnica.

No rehagas todo el proyecto cada vez que recibas una corrección.

Trabaja incrementalmente.

Cuando modifiques una sección existente:

- conserva lo que ya funciona
- modifica únicamente lo necesario
- evita regresiones
- reutiliza componentes
- evita duplicación

Después de cada bloque importante de trabajo:

- ejecuta el proyecto
- ejecuta lint
- revisa errores TypeScript
- revisa errores de consola
- corrige problemas antes de continuar

---

## 3. Stack

Utiliza preferiblemente:

- Next.js
- App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

Puedes utilizar GSAP únicamente cuando Framer Motion no sea suficiente.

Utiliza:

- `next/image`
- `next/font`
- Server Components cuando tenga sentido
- Client Components únicamente cuando sea necesario

Evita dependencias innecesarias.

Si alguna librería nueva resulta necesaria:

1. explica brevemente por qué
2. verifica primero si ya existe una alternativa instalada
3. instala únicamente lo imprescindible

La arquitectura debe quedar preparada para integrar posteriormente un CMS headless como Sanity.

---

## 4. Concepto de diseño

Nombre conceptual:

# ARCHIVO VIVO DIGITAL

La web debe transmitir que la trayectoria de Alejandro es un archivo que continúa evolucionando.

El diseño debe combinar:

- diseño editorial contemporáneo
- fotografía documental
- composición tipográfica
- datos
- fechas
- documentos
- líneas temporales
- interfaces digitales
- espacios amplios
- asimetría controlada
- movimiento elegante

Debe sentirse premium, sobrio y contemporáneo.

---

## 5. Paleta

Utiliza como base:

```css
--background: #101112;
--surface: #161719;
--foreground: #F2F0E9;
--muted: #9A9A9A;
--primary: #3057FF;
--signal: #B8FF3D;
```

Crear variables CSS.

Usar predominantemente:

- grafito
- blanco cálido
- azul eléctrico

El verde debe utilizarse con moderación.

Ejemplos:

```text
● ACTIVO
● 2026
● NUEVO
```

No convertir toda la interfaz en verde neón.

---

## 6. Tipografía

Usar tres lenguajes tipográficos.

### A. Sans Serif

Para:

- H1
- títulos
- navegación
- cifras

Debe ser moderna y contundente.

### B. Serif editorial

Para:

- citas
- manifiestos
- reflexiones
- statements

### C. Monospace

Para:

- años
- índices
- categorías
- metadata
- coordenadas visuales

Ejemplo:

```text
[01]
MANIFIESTO

[2008—2026]
TRAYECTORIA

[CO / LATAM]
```

No utilizar demasiadas fuentes.

Optimizar con `next/font`.

---

## 7. Principios UX

La página debe responder en pocos segundos:

- ¿Quién es Alejandro?
- ¿Qué hace?
- ¿Por qué es relevante?
- ¿Qué ha construido?
- ¿Qué puedo explorar?

Debe existir jerarquía visual muy clara.

Evitar párrafos innecesariamente largos.

Dividir información mediante:

- títulos
- cifras
- fotografías
- citas
- timelines
- bloques editoriales

No abusar de cards.

Antes de crear cualquier grid de tarjetas pregúntate:

> ¿Existe una manera más editorial de representar esta información?

---

## 8. Arquitectura web

Preparar las siguientes rutas:

```text
/
/trayectoria
/proyectos
/ideas
/ideas/[slug]
/publicaciones
/prensa
/contacto
```

Menú principal:

- Alejandro
- Trayectoria
- Proyectos
- Ideas
- Publicaciones
- Prensa
- Contacto

---

## 9. Prioridad inicial

No desarrolles todas las páginas inicialmente.

Primero construir únicamente:

# HOME

Las páginas interiores pueden existir como rutas básicas o placeholders.

Quiero validar primero la identidad visual.

---

## 10. Home — estructura

Home debe construirse como una narrativa.

Orden:

1. Hero
2. Manifesto
3. Trayectoria
4. Áreas de trabajo
5. Proyectos
6. Publicaciones
7. Prensa
8. Ideas
9. Contacto
10. Footer

---

## 11. Hero

Crear una composición editorial de pantalla completa.

Utilizar una fotografía profesional real de Alejandro disponible en el sitio original.

Titular:

```text
ALEJANDRO
LINARES
```

La tipografía puede ocupar aproximadamente entre 30% y 50% del viewport.

Agregar:

```text
Abogado · Gobernanza digital · Tecnología · Liderazgo
```

Texto corto:

> Creo en el poder de la tecnología y las instituciones para generar oportunidades reales en la vida de las personas.

CTA principal:

```text
Explorar trayectoria →
```

CTA secundario:

```text
Conocer mis ideas →
```

Agregar metadata visual discreta:

```text
BOGOTÁ / COLOMBIA
GOBERNANZA DIGITAL
POLÍTICAS PÚBLICAS
TECNOLOGÍA
```

La fotografía puede:

- integrarse con el texto
- romper ligeramente la grilla
- utilizar blanco y negro
- cambiar de contraste al interactuar

Evitar hero centrado convencional.

No quiero:

- foto circular
- título centrado
- botón azul debajo

---

## 12. Manifiesto

Crear un gran bloque editorial.

Texto principal:

> La tecnología no transforma sociedades.  
> Las personas que saben utilizarla, sí.

Usar serif editorial.

Acompañar con texto relacionado con:

- Estado
- ciudadanos
- tecnología
- liderazgo
- comunicación
- transformación

Debe sentirse como una declaración personal.

---

## 13. Trayectoria

Este será uno de los componentes más importantes.

Crear:

```text
CareerTimeline.tsx
```

Utilizar información real disponible en `alejandrolinares.co`.

Cada evento:

```ts
{
  year: "2024",
  title: "...",
  institution: "...",
  description: "...",
  image: "...",
  category: "Formación"
}
```

Desktop:

timeline horizontal o híbrida.

Mobile:

timeline vertical.

El scroll debe poder activar diferentes años.

Implementar:

```text
activeYear
```

Cuando un evento entra en viewport:

- resaltar año
- cambiar imagen
- actualizar estado visual

Animaciones discretas.

---

## 14. Timeline global

Crear:

```text
GlobalTimelineIndicator.tsx
```

En desktop mostrar opcionalmente en lateral derecho.

Ejemplo:

```text
2008
│
●
│
2012
│
●
│
2018
│
●
│
2022
│
●
│
2026
```

Debe reaccionar al scroll.

Debe ser:

- discreto
- minimalista
- no intrusivo

Ocultarlo en móvil si perjudica UX.

---

## 15. Cuatro áreas

Crear:

```text
FocusAreas.tsx
```

Cuatro pilares:

### 01 — Gobernanza digital

Políticas públicas, transformación del Estado, regulación y ciudadanía.

### 02 — Liderazgo

Gestión, equipos, dirección y transformación organizacional.

### 03 — Medios

Televisión pública, contenidos y comunicación.

### 04 — Tecnología

IA, innovación, ciberseguridad y educación.

Utilizar fotografías reales relacionadas cuando estén disponibles.

Diseño:

- gran formato
- fotografía
- tipografía
- número
- hover

No usar cuatro cards estándar idénticas.

---

## 16. Proyectos

Crear:

```text
FeaturedProjects.tsx
```

Tomar contenido real de "Especiales Enlace Trece".

Inicialmente seleccionar cuatro.

Categorías sugeridas:

- Ciberseguridad
- Inteligencia artificial
- Transformación digital
- Empleabilidad / sostenibilidad

Cada proyecto:

```ts
{
  category,
  title,
  description,
  image,
  year,
  url
}
```

Crear composición editorial o grid asimétrico.

CTA:

```text
Ver todos los proyectos →
```

---

## 17. Publicaciones

Crear:

```text
Publications.tsx
```

Utilizar publicaciones reales.

Dar prioridad visual a:

- Tecnología real para personas reales
- Las dos caras del liderazgo

Cada publicación debe mostrar:

- portada
- título
- descripción
- año
- CTA

No diseñarlo como ecommerce.

Debe sentirse como obra intelectual.

---

## 18. Prensa

Crear:

```text
Press.tsx
```

Título:

# EN LOS MEDIOS

Utilizar apariciones reales.

Ejemplos presentes en el sitio:

- Forbes
- Infobae
- El Colombiano
- Semana
- Canal Trece

Mostrar máximo cuatro destacados en Home.

Cada noticia:

```ts
{
  media,
  title,
  date,
  image,
  url
}
```

CTA:

```text
Ver sala de prensa →
```

---

## 19. Ideas

Utilizar el nombre:

# IDEAS

No "Blog" como concepto principal.

Crear:

```text
IdeasPreview.tsx
```

Mostrar tres artículos reales.

Categorías:

- Gobernanza
- Inteligencia Artificial
- Liderazgo
- Transformación Digital
- Medios
- Sociedad

Cada artículo:

```ts
{
  category,
  title,
  excerpt,
  date,
  readingTime,
  image,
  slug
}
```

CTA:

```text
Explorar ideas →
```

---

## 20. Contacto

Crear cierre editorial.

Ejemplo:

> Un mejor futuro es posible cuando las ideas se convierten en acciones.

Título:

```text
Conversemos sobre lo que viene.
```

CTA:

```text
Trabajemos juntos →
```

Utilizar canales reales de contacto o redes existentes.

---

## 21. Footer

Footer minimalista.

Mostrar:

- Alejandro Linares
- Bogotá / Colombia
- navegación
- redes
- copyright

Statement:

```text
Ideas para un futuro más humano y digital.
```

---

## 22. Navegación

Crear:

```text
Header.tsx
MobileMenu.tsx
```

Desktop:

header transparente inicialmente.

Al hacer scroll:

- fondo semitransparente
- blur moderado
- borde inferior discreto

Agregar estado activo.

Mobile:

pantalla completa o panel elegante.

No utilizar un menú móvil genérico sin personalidad.

---

## 23. Animación

Utilizar principalmente Framer Motion.

Animaciones:

- fade
- translate
- stagger
- text reveal
- image reveal
- hover zoom
- line animations
- timeline activation

Duraciones aproximadas:

```text
0.3 s — microinteracciones
0.5 s — componentes
0.8 s — secciones
```

No utilizar animaciones de varios segundos.

No utilizar scroll-jacking.

No modificar comportamiento natural del navegador.

Implementar:

```css
prefers-reduced-motion
```

---

## 24. Microinteracciones

Agregar detalles sutiles:

- links con flecha animada
- líneas que se expanden
- cambio de números
- hover de imágenes
- underline dinámico

Usar cursor normal.

No crear cursor personalizado inicialmente.

---

## 25. Responsive

Comprobar explícitamente:

```text
1440
1280
1024
768
430
390
```

Mobile no debe ser simplemente desktop comprimido.

Replantear:

- timeline
- tipografía
- espaciados
- navegación
- imágenes
- composición

Mantener tap targets adecuados.

---

## 26. SEO

Implementar desde el principio.

Title Home:

```text
Alejandro Linares | Gobernanza digital, tecnología y liderazgo
```

Meta description:

```text
Alejandro Linares es abogado y experto en gobernanza digital, tecnología y políticas públicas. Conoce su trayectoria, proyectos, publicaciones e ideas.
```

Configurar metadata de Next.js.

Crear:

- canonical
- Open Graph
- Twitter Cards
- robots
- sitemap

Structured Data:

- Person
- Article
- Book
- BreadcrumbList
- VideoObject cuando aplique

No generar Schema con información inventada.

---

## 27. Semántica

Utilizar:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Un solo H1.

Jerarquía correcta:

```text
H1
H2
H3
```

---

## 28. Imágenes

Utilizar imágenes disponibles en:

https://alejandrolinares.co/

No sustituirlas innecesariamente por stock.

Guardar localmente cuando sea técnicamente apropiado:

```text
public/images/alejandro/
public/images/projects/
public/images/publications/
public/images/press/
```

Optimizar mediante Next Image.

Si no es posible recuperar alguna imagen:

crear placeholder.

No inventar imágenes personales.

---

## 29. Datos

Crear inicialmente:

```text
data/career.ts
data/projects.ts
data/publications.ts
data/press.ts
data/articles.ts
data/social.ts
```

Separar contenido de presentación.

No introducir toda la información directamente dentro de JSX.

Interfaces TypeScript para cada estructura.

Ejemplo:

```ts
export interface CareerEvent {
  year: string
  title: string
  institution?: string
  description: string
  image?: string
  category?: string
}
```

---

## 30. Componentes

Arquitectura sugerida:

```text
src/
  app/
    page.tsx
    trayectoria/
    proyectos/
    ideas/
    publicaciones/
    prensa/
    contacto/

  components/

    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx

    home/
      Hero.tsx
      Manifesto.tsx
      CareerTimeline.tsx
      FocusAreas.tsx
      FeaturedProjects.tsx
      Publications.tsx
      Press.tsx
      IdeasPreview.tsx
      ContactCTA.tsx

    ui/
      SectionLabel.tsx
      AnimatedText.tsx
      RevealImage.tsx
      TimelineIndicator.tsx
      Button.tsx
      ArticleCard.tsx
      ProjectCard.tsx

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

---

## 31. Calidad del código

Quiero:

- TypeScript estricto
- evitar `any`
- componentes pequeños
- Props tipadas
- código reutilizable
- funciones claras
- no duplicar lógica
- no usar `!important` salvo extrema necesidad
- no abusar de `z-index`
- no hardcodear dimensiones sin razón
- evitar números mágicos

---

## 32. No romper lo que funciona

Regla crítica para futuras iteraciones:

Cuando te pida modificar algo:

**NO reconstruyas toda la sección automáticamente.**

Primero identifica qué componente controla el comportamiento.

Después realiza la modificación mínima necesaria.

Ejemplo:

Si te digo:

> haz más grande la foto del Hero

No debes:

- reconstruir Hero
- cambiar tipografía
- cambiar botones
- cambiar layout completo

Modifica únicamente el tamaño/composición de la fotografía.

---

## 33. Ciclo de validación

Después de cada implementación significativa:

Ejecuta:

```bash
npm run lint
```

Ejecuta compilación:

```bash
npm run build
```

Corrige:

- TypeScript
- ESLint
- imports
- warnings relevantes

Si existe testing configurado:

ejecútalo.

No des por terminada una etapa con errores conocidos.

---

## 34. Navegador

Cuando tengas acceso a navegador o herramientas de preview:

Abre la aplicación.

Comprueba visualmente:

- desktop
- tablet
- mobile

Busca:

- overflow
- elementos cortados
- texto superpuesto
- imágenes deformadas
- problemas de contraste
- animaciones rotas

Corrige antes de continuar.

---

## 35. Lighthouse

Al terminar la Home busca:

```text
Performance > 90
Accessibility > 95
Best Practices > 95
SEO > 95
```

Priorizar especialmente:

- LCP
- CLS
- INP

Evitar que animaciones perjudiquen métricas.

---

## 36. Fases

### FASE 0 — Auditoría

Revisa repositorio.

No cambies código todavía.

Informa brevemente:

- stack encontrado
- estructura
- dependencias
- problemas importantes

Después continúa.

### FASE 1 — Base

Configura:

- layout
- fuentes
- paleta
- Tailwind
- CSS globals
- Header
- Footer
- metadata

### FASE 2 — Primer impacto

Implementa:

- Hero
- Manifesto

Ejecuta aplicación.

Corrige responsive.

### FASE 3 — Identidad

Implementa:

- CareerTimeline
- GlobalTimelineIndicator
- FocusAreas

### FASE 4 — Contenido

Implementa:

- Projects
- Publications
- Press
- Ideas

### FASE 5 — Cierre

Implementa:

- ContactCTA
- Footer

### FASE 6 — Calidad

Revisión:

- responsive
- accesibilidad
- SEO
- performance

---

## 37. Criterio visual

Antes de terminar cada sección pregúntate:

> ¿Esto parece específicamente diseñado para Alejandro Linares?

Si parece una plantilla:

rediseña.

Comprueba:

- ¿La fotografía tiene protagonismo?
- ¿Existe jerarquía?
- ¿Hay suficiente espacio?
- ¿Existe un elemento editorial?
- ¿La sección aporta a la narrativa?

Evitar interfaces con exceso de contenedores.

---

## 38. Uso del sitio original

Antes de introducir datos del sitio actual:

Verifica que realmente aparecen allí.

Puedes utilizar información pública de:

https://alejandrolinares.co/

Extrae únicamente lo necesario.

No inventes:

- fechas
- cargos
- universidades
- premios
- medios
- proyectos
- estadísticas

Si falta algo:

```text
TODO: validar contenido
```

o

```text
Contenido pendiente
```

---

## 39. Entrega de cada fase

Cuando termines una fase:

No me escribas una explicación excesivamente larga.

Indica:

### CAMBIOS REALIZADOS

- ...

### ARCHIVOS PRINCIPALES

- ...

### VALIDACIÓN

```text
Lint: OK / Error
Build: OK / Error
Responsive: revisado / pendiente
```

### PENDIENTE

- ...

Luego espera nuevas instrucciones.

---

# 40. Primera tarea

Comienza ahora.

Primero:

1. Inspecciona el repositorio completo.
2. Comprueba si existe un proyecto Next.js.
3. Revisa dependencias.
4. Revisa assets.
5. Revisa estructura actual.
6. Identifica qué puede mantenerse.

Después construye la FASE 1.

Luego desarrolla FASE 2:

**Hero + Manifesto.**

No continúes todavía con la timeline ni las demás secciones.

Quiero validar primero visualmente:

- paleta
- tipografía
- fotografía
- composición
- navegación
- Hero
- Manifesto

Deja el resto de la Home preparado mediante estructura básica, pero sin desarrollarlo todavía.

Cuando termines:

- ejecuta lint
- ejecuta build
- corrige todos los errores relevantes

y entrégame el resumen del trabajo realizado.

<!-- Panel local: extensión. No sustituye las secciones 1–40 del sitio público. -->

# Panel local de archivo

Lo que sigue documenta solo el panel de administración local. Grafito (`#101112`), surface (`#161719`), marfil (`#F2F0E9`) y muted (`#9A9A9A`) siguen siendo los de la sección 5; aquí no se redefinen.

## Overview

**Creative North Star: "El escritorio de archivo"**

El panel local es el mismo grafito del archivo, usado para corregir fichas que ya existen. Es un escritorio con riel, formulario y una sola acción de asentamiento. La densidad es de formulario. Quien entra lee «Archivo» en serif, escribe dos campos y pulsa Entrar.

El oro es una marca. La sección activa, Entrar y Guardar lo llevan; el resto permanece en marfil, gris y filete. Newsreader no baja de esa única palabra. Al guardar, el botón deja el oro y se asienta en marfil con la etiqueta «Guardado». La nota fija recuerda que GoDaddy cambia solo cuando se publica la exportación.

Estas secciones documentan el panel local. El sistema del sitio público sigue en las secciones 1 a 40. Grafito, surface, marfil y muted siguen siendo los de la paleta ya escrita.

**Key Characteristics:**

- Escritorio de fichas.
- Oro solo en la sección activa, Entrar y Guardar.
- Archivo en etiquetas y campos; Newsreader solo en la palabra Archivo.
- Riel en escritorio, selector en móvil, Guardar anclado abajo.
- Profundidad tonal: filete, surface y barra esmerilada.

## Colors

El panel reutiliza grafito, surface, marfil y muted de la sección 5. Añade un oro de marca, una rosa de alerta y cuatro grafitos de filete.

### Primary

- **Oro de archivo** (`#c9a45c`): fondo de la sección activa, de Entrar y de Guardar. El texto sobre el oro es grafito.
- **Oro claro** (`#d7b56d`): el mismo control al pasar el cursor, mientras no está en «Guardado».

### Tertiary

- **Rosa de alerta** (`#e7b2b2`): texto del aviso de error y, al pasar el cursor, borde y texto de Quitar.

### Neutral

- **Filete** (`#2a2c2e`): borde de campos, herramientas, riel y barra de guardado.
- **Filete marcado** (`#4a4d51`): borde del campo o de la herramienta al pasar el cursor.
- **Lavado del riel** (`#222426`): fondo de una sección inactiva del riel al pasar el cursor.
- **Pozo de previsualización** (`#0c0d0e`): fondo detrás de la fotografía subida.

**The Mark of Gold Rule.** En el panel, el oro solo pinta la sección activa, Entrar y Guardar. Un campo, un lede o un botón de herramienta en oro rompe la marca.

## Typography

**Display Font:** Newsreader (with Georgia, serif), solo en la palabra Archivo.
**Body Font:** Archivo (with Segoe UI, sans-serif)
**Label Font:** Archivo, en tamaño de etiqueta. Este panel no usa mono.

**Character:** Una grotesca de trabajo para todo lo que se lee y se escribe, y una sola palabra en serif para nombrar el escritorio.

### Hierarchy

- **Display** (500, 2.4rem, line-height 1, letter-spacing -0.03em; 1.8rem bajo 1023px): la palabra Archivo, en el login y en el riel.
- **Headline** (500, 1.65rem, letter-spacing -0.02em, Archivo): el nombre de la sección en el área de trabajo.
- **Title** (500, 1rem, Archivo): el título de una ficha.
- **Body** (400, 1rem, line-height 1.45): campos, botones y el lede (muted, medida 42rem).
- **Label** (400, 0.82rem, muted): la etiqueta sobre cada campo. La meta de ficha y la nota de publicación usan 0.85rem.

**The Single Serif Word Rule.** Newsreader se reserva para la palabra Archivo. Títulos de sección, etiquetas y valores permanecen en Archivo.

## Layout

En escritorio el panel son dos columnas: un riel de 15.5rem pegado arriba, a la altura del viewport, en surface y con filete a la derecha, y un área de trabajo hasta 68rem, con padding de 2rem y 7rem abajo para quedar libre de la barra. La barra de guardado es fija, desde el borde del riel hasta la derecha de la ventana: la nota a la izquierda, Guardar a la derecha.

Bajo 1023px el riel se aplana en una barra sticky. La lista desaparece, entra el selector de sección, la palabra Archivo baja a 1.8rem y la barra de guardado ocupa todo el ancho, apilada, con Guardar al 100%. El padding inferior del área pasa a 9rem. La grilla de la ficha y la fila de fuentes pasan a una columna.

El ritmo reutilizado es 0.25rem entre secciones del riel, 0.35rem entre etiqueta y campo, 0.9rem en el stack y en la grilla, 1.5rem de padding de pantalla y 2rem en el área de trabajo. Los controles comparten una altura mínima de 2.75rem.

**The Anchored Save Rule.** Guardar no se desplaza con el formulario. En escritorio queda abajo a la derecha; bajo 1023px, a todo el ancho, con la nota de publicación encima.

## Elevation & Depth

El panel es plano. No hay sombra proyectada. El riel se separa del grafito por ser surface y por un filete. La barra de guardado permanece fija, con surface al 92% y un desenfoque de 10px, más el mismo filete en el borde superior. El foco es un anillo de 2px en marfil, separado 2px del control. Un botón deshabilitado baja al 55% de opacidad y muestra el cursor de espera. El cambio de color es instantáneo.

Con `prefers-reduced-motion` el scroll del panel queda en el comportamiento automático del navegador.

**The Flat Desk Rule.** Si hace falta profundidad, se cambia el tono o se esmerila la barra. No se añade box-shadow.

## Shapes

Esquinas apenas redondeadas (0.25rem) en campos, botones, selector y herramientas. La ficha no es una tarjeta: es un bloque separado por un filete superior, sin radio propio. La fotografía de previsualización es un rectángulo sin radio, alto máximo 9rem, sobre el pozo oscuro.

## Components

### Buttons

- **Shape:** esquinas apenas redondeadas (0.25rem), alto mínimo 2.75rem, sin borde cuando el fondo es oro.
- **Primary:** oro de archivo, texto grafito, peso 600, padding horizontal 1.15rem. Entrar y Guardar comparten esta marca.
- **Hover / Focus:** el oro pasa a oro claro, salvo en «Guardado», que permanece marfil. El foco es el anillo de marfil de 2px.
- **Guardado:** fondo marfil, texto grafito, etiqueta «Guardado». Mientras guarda, el botón se deshabilita y dice «Guardando…».
- **Ghost:** Salir. Fondo transparente, filete, texto marfil, padding horizontal 0.75rem.
- **Tool:** Añadir, Subir y Bajar. Mismo trazo que Salir, con padding horizontal 0.7rem. Quitar, al pasar el cursor, toma la rosa de alerta en borde y texto.

### Navigation

El riel lista las secciones que ya existen, en Archivo, alineadas a la izquierda, sin números. La activa es oro con texto grafito y peso 600. Las demás son transparentes; al pasar el cursor toman el lavado del riel. Bajo 1023px la lista se oculta y un selector a ancho completo ocupa su lugar. Salir permanece en la fila de la palabra Archivo.

### Inputs / Fields

- **Style:** fondo grafito, filete, radio 0.25rem, padding 0.65rem 0.75rem, alto mínimo 2.75rem. La etiqueta muted va encima (0.82rem). El área de texto parte de 4.5rem y crece en vertical.
- **Focus:** anillo de marfil de 2px, separado 2px. Al pasar el cursor el filete pasa a filete marcado.
- **Error:** el aviso usa la rosa de alerta y reserva 1.4rem de alto.
- La casilla es el control nativo, en fila con su etiqueta, alto mínimo 2.75rem.

### Cards / Containers

La ficha es un registro. Filete superior, padding vertical 0.85rem y 1rem, título en peso 500 y meta muted a 0.85rem. Cerrada, el cuerpo no se muestra. El área de trabajo no envuelve el formulario en una tarjeta.

### Barra de guardado

Fija al fondo. La nota, muted a 0.85rem y con medida de 42rem, dice que el sitio de este equipo se actualiza al recargar y que GoDaddy cambia cuando se publica la exportación. Guardar queda a la derecha. Bajo 1023px la nota queda arriba y el botón ocupa todo el ancho.

## Do's and Don'ts

Guardrails del panel local. No reescriben las secciones 1 a 40.

### Do:

- **Do** reutilizar grafito, surface, marfil y muted de la sección 5 sin redefinirlos.
- **Do** reservar el oro de archivo para la sección activa, Entrar y Guardar, y asentar Guardar en marfil cuando el estado es «Guardado».
- **Do** mantener Newsreader en la palabra Archivo y Archivo en etiquetas, campos y títulos de sección.
- **Do** anclar la barra de guardado y, bajo 1023px, cambiar el riel por el selector.

### Don't:

- **Don't** pintar de oro campos, ledes, herramientas o el fondo del riel.
- **Don't** usar Newsreader fuera de la palabra Archivo en este panel.
- **Don't** añadir tarjetas de resumen, un menú numerado ni un control que cree secciones o cambie la maqueta pública.
- **Don't** proyectar sombras. La profundidad del panel es tonal y el desenfoque de la barra.

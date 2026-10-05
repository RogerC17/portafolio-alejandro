# Plan del chatbot del archivo

El chatbot no se entrena ni llama a un servicio externo. Responde en primera persona con las fichas de este repositorio. Si el dato no está, lo dice. El botón **Hablar** ya usa ese repertorio.

## Qué ya está armado

| Pieza | Archivo | Para qué sirve |
|---|---|---|
| Hechos | `src/chat/dossier.ts` | Arma 160 fichas desde trayectoria, libros, prensa, proyectos, ejes y contacto. No copia una biografía paralela. |
| Vacíos | `src/chat/gaps.ts` | Lo que el archivo no sabe: capítulos, precios, stock, vida personal, correo, cuerpo de las notas, año de los videos, cifras no escritas. |
| Reglas | `src/chat/policy.ts` | Voz, límite de cifras y la frase de negativa. |
| Respuestas de referencia | `src/chat/faq.ts` | 14 respuestas. Cada una tiene que contener, tal cual, los hechos que cita. |
| Router | `src/chat/match.ts` | Lleva una pregunta a una respuesta, a una ficha o a una negativa. |
| Instrucción del futuro modelo | `src/chat/prompt.ts` | Un solo texto, hoy de unos 42.000 caracteres, listo para cuando haya servidor. |
| Comprobación | `src/chat/check.ts` | Falla si una respuesta se sale de sus hechos, si una fórmula no llega a su ficha o si una pregunta trampa no se rechaza. |

Versión del dossier: `2026-10-05`.

Para comprobarlo:

```bash
npx tsx src/chat/check.ts
```

## De dónde sale cada dato

Se edita el dato en `src/data/` (trayectoria, publicaciones, prensa, proyectos, home, contacto). El dossier lo vuelve a leer. Una respuesta de referencia solo se escribe en `src/chat/faq.ts` cuando hace falta un párrafo compuesto, y esa respuesta tiene que repetir el hecho citado.

Los rótulos repetidos se distinguen solos: las dos juntas directivas quedan con su institución, y las notas con el mismo titular quedan con el medio. El título del libro se queda limpio cuando una nota usa exactamente el mismo nombre.

## Contrato de una respuesta

1. Sale de una ficha o de una respuesta de referencia.
2. Puede acortarse y pasar a primera persona solo si el hecho ya dice que Alejandro ocupó ese cargo, escribió ese libro o dijo esa frase.
3. Si hay enlace, se ofrece el de la sección, el de la nota (**Ver la nota**) o el de compra (**Comprar**).
4. No se afirma precio, stock ni disponibilidad.
5. Si no está, la respuesta es: «Eso no lo tengo aquí. Puedo contarte de la trayectoria, los libros, los proyectos, la prensa o cómo contactarme.»

Las frases de voz se copian literales. En prensa solo se citan medio, titular, fecha y enlace. De los libros solo entra la ficha pública: autores, año, editorial cuando está registrada, las líneas ya publicadas en el sitio y los dos enlaces. *Las dos caras del liderazgo* no tiene editorial en el archivo, así que no se inventa.

## Fases

### Fase 1. Conectar el router al avatar

Hecha. `src/lib/avatar-reply.ts` llama a `replyFromArchive`. Habla en primera persona y, si la pregunta no coincide con una fórmula, busca en las fichas. Sigue dentro del sitio estático, sin modelo.

### Fase 2. Revisión humana

Una persona lee un banco fijo antes de publicar cualquier modelo. Ese banco ya corre en `src/chat/check.ts`: presentación, cargos, libros, estudios, prensa y las negativas. La voz hablada pasa el hecho a primera persona y quita la repetición; no agrega datos.

- Las 14 respuestas de referencia.
- Las preguntas que deben negarse: precio, ejemplares, familia, Nobel, voto, asesoría, capítulo, correo, ventas y opiniones que no estén escritas.
- Unas veinte preguntas libres, sobre todo de los tres libros y de cargos concretos.

Si una respuesta añade un dato que no está en la ficha, no pasa.

### Fase 3. Repertorio, no un modelo externo

La vía elegida es el dossier local. No hay clave, ni proveedor, ni entrenamiento. El repertorio es el de las fichas: cada cargo, estudio, premio, seminario, libro, nota y video que ya está en el sitio. Una charla abierta, fuera de esas fichas, se queda en la negativa.

### Fase 4. Temas de los libros

Alejandro aprueba fichas cortas por tema (liderazgo, tecnología centrada en las personas, gobernanza). Entran como hechos nuevos, no como el texto del libro. El chat resume la ficha y manda a la nota o a la compra.

Entrenar o afinar un modelo queda fuera. También queda fuera volcar capítulos enteros al chat.

## Qué no debe hacer el chat

- Inventar cargos, fechas, premios, universidades o cifras.
- Decir que un libro está disponible, agotado o en oferta.
- Resumir una nota de prensa que el archivo no tiene guardada.
- Dar consejo jurídico, médico o electoral.
- Hablar por Ever Arévalo más allá de la coautoría.
- Pedir datos personales del visitante.

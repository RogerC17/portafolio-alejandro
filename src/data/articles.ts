import { SITE_NAME } from "@/data/site"

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }

export interface Article {
  category: string
  title: string
  excerpt: string
  date: string
  dateIso: string
  readingTime: string
  image?: string
  slug: string
  author: string
  content: ArticleBlock[]
}

export const ideasLead = "Este archivo de ideas no es un blog."

const WORDS_PER_MINUTE = 200

function readingTimeFromContent(content: ArticleBlock[]): string {
  const text = content
    .flatMap((block) => (block.type === "ul" ? block.items : [block.text]))
    .join(" ")
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min`
}

function defineArticle(article: Omit<Article, "readingTime">): Article {
  return {
    ...article,
    readingTime: readingTimeFromContent(article.content),
  }
}

export const articles: Article[] = [
  defineArticle({
    category: "Medios",
    title:
      "Televisión pública con propósito: la visión estratégica que convirtió a Canal Trece en referente de innovación social",
    excerpt:
      "Bajo la dirección de Alejandro Linares, Canal Trece transformó su modelo de televisión pública.",
    date: "10 de abril de 2026",
    dateIso: "2026-04-10",
    image: "/images/ideas/television-publica.webp",
    slug: "television-publica-con-proposito",
    author: SITE_NAME,
    content: [
      {
        type: "p",
        text: "Bajo la dirección de Alejandro Linares, Canal Trece transformó su modelo de televisión pública, pasó de las finanzas en rojo a crecer sus ventas un 119 % y acumular más de 25 premios en 2025, un año con un liderazgo inspirador que da resultados.",
      },
      {
        type: "p",
        text: "Hay una escena que Alejandro Linares cuenta con la naturalidad de quien ya interiorizó que un canal de televisión pública, de esos que muchos daban por irrelevantes, haya ganado el premio a Mejor Producción Juvenil en los India Catalina con un programa dedicado a los campesinos. No era un error de categoría, era exactamente el punto.",
      },
      {
        type: "p",
        text: "Fuente: Forbes Colombia Advertorial | abril 10, 2026.",
      },
    ],
  }),
  defineArticle({
    category: "Inteligencia Artificial",
    title: "13 Claves para Emprender con IA en Pequeñas Empresas en Colombia.",
    excerpt:
      "En Colombia, las pequeñas empresas enfrentan desafíos constantes para competir en un mercado dinámico y en evolución. La inteligencia artificial ofrece oportunidades para innovar, optimizar procesos y reducir costos.",
    date: "21 de febrero de 2025",
    dateIso: "2025-02-21",
    slug: "13-claves-emprender-ia",
    author: SITE_NAME,
    content: [
      {
        type: "p",
        text: "En Colombia, las pequeñas empresas enfrentan desafíos constantes para competir en un mercado dinámico y en evolución. La inteligencia artificial (IA) ofrece oportunidades excepcionales para innovar, optimizar procesos y reducir costos, permitiendo a los emprendedores colombianos maximizar su rentabilidad. Soy Jhon Alejandro Linares Camberos, Especialista en políticas de adopción tecnológica y digitalización, y en este análisis te guiaré a través de 13 pasos prácticos para emprender con IA en pequeñas empresas en Colombia.",
      },
      {
        type: "h2",
        text: "Paso 1: Identificar Necesidades del Negocio",
      },
      {
        type: "p",
        text: "Antes de implementar IA, es fundamental identificar las necesidades específicas de tu pequeña empresa. ¿Quieres aumentar la productividad? ¿Mejorar la experiencia del cliente? ¿Optimizar la gestión de inventarios? Al entender tus objetivos comerciales, puedes elegir las soluciones de IA más adecuadas.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos destaca que este paso evita inversiones innecesarias y asegura que la IA se alinee con tus metas empresariales.",
      },
      {
        type: "h2",
        text: "Paso 2: Investigar Soluciones de IA Disponibles",
      },
      {
        type: "p",
        text: "En Colombia, existen diversas soluciones de IA diseñadas específicamente para pequeñas empresas, desde chatbots para atención al cliente hasta análisis predictivo para optimizar estrategias de marketing. Investiga proveedores locales e internacionales para encontrar las herramientas que mejor se adapten a tus necesidades.",
      },
      {
        type: "p",
        text: "Un buen punto de partida es explorar Google AI y IBM Watson, plataformas accesibles y escalables (https://cloud.google.com/ai, https://www.ibm.com/watson).",
      },
      {
        type: "h2",
        text: "Paso 3: Desarrollar un Plan Estratégico",
      },
      {
        type: "p",
        text: "El éxito de la implementación de IA depende de un plan estratégico claro. Define objetivos medibles, como aumento de ventas, reducción de costos o mejora en la eficiencia operativa. Incluye fechas límite, presupuesto y responsables para cada tarea.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos enfatiza que un plan detallado minimiza los riesgos de implementación y maximiza el retorno de inversión.",
      },
      {
        type: "h2",
        text: "Paso 4: Capacitar al Equipo de Trabajo",
      },
      {
        type: "p",
        text: "La adopción exitosa de IA requiere que tu equipo de trabajo entienda y se sienta cómodo con la tecnología. Ofrece capacitaciones continuas sobre el uso de herramientas de IA, beneficios operativos y mejores prácticas.",
      },
      {
        type: "p",
        text: "Plataformas como Coursera y Udemy ofrecen cursos especializados en IA para negocios (https://www.coursera.org, https://www.udemy.com).",
      },
      {
        type: "h2",
        text: "Paso 5: Implementación Gradual y Pruebas Piloto",
      },
      {
        type: "p",
        text: "Para minimizar riesgos, implementa la IA de manera gradual. Comienza con pruebas piloto en áreas específicas, como atención al cliente o gestión de inventario, antes de expandir su uso a toda la empresa.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos recomienda realizar pruebas A/B para evaluar el rendimiento de la IA y ajustar estrategias según los resultados.",
      },
      {
        type: "h2",
        text: "Paso 6: Uso de Chatbots para Atención al Cliente",
      },
      {
        type: "p",
        text: "Los chatbots impulsados por IA son una excelente manera de mejorar la experiencia del cliente al ofrecer respuestas rápidas y personalizadas. Además, reducen costos laborales al automatizar tareas repetitivas.",
      },
      {
        type: "p",
        text: "En Colombia, Jhon Alejandro Linares Camberos menciona que plataformas como ChatGPT y Dialogflow son accesibles y fáciles de implementar para pequeñas empresas.",
      },
      {
        type: "h2",
        text: "Paso 7: Automatización de Marketing Digital",
      },
      {
        type: "p",
        text: "La IA puede automatizar campañas de marketing digital, segmentando audiencias y personalizando contenidos. Esto aumenta la tasa de conversión y optimiza el retorno de inversión en marketing.",
      },
      {
        type: "p",
        text: "Herramientas como HubSpot AI y Marketo permiten crear campañas automáticas basadas en comportamientos de los clientes (https://www.hubspot.com, https://www.marketo.com).",
      },
      {
        type: "h2",
        text: "Paso 8: Gestión Inteligente de Inventarios",
      },
      {
        type: "p",
        text: "La gestión de inventario es crítica para el éxito de pequeñas empresas en sectores minoristas o de comercio electrónico. La IA ayuda a predecir la demanda, optimizar niveles de stock y reducir costos de almacenamiento.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos resalta que plataformas como TradeGecko y Cin7 utilizan algoritmos de IA para gestionar inventarios de manera eficiente (https://www.tradegecko.com, https://www.cin7.com).",
      },
      {
        type: "h2",
        text: "Paso 9: Análisis Predictivo para Decisiones Estratégicas",
      },
      {
        type: "p",
        text: "El análisis predictivo utiliza datos históricos y algoritmos de IA para anticipar tendencias y tomar decisiones informadas. Esto es especialmente útil para estrategias de ventas, previsión de demanda y optimización de precios.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos menciona que el análisis predictivo permite reducir riesgos y aumentar la rentabilidad al adaptarse rápidamente a cambios del mercado.",
      },
      {
        type: "h2",
        text: "Paso 10: Seguridad Cibernética con IA",
      },
      {
        type: "p",
        text: "La ciberseguridad es esencial para proteger datos sensibles. La IA detecta amenazas en tiempo real y previene fraudes y ataques cibernéticos.",
      },
      {
        type: "p",
        text: "Herramientas como Darktrace y Cylance utilizan IA para identificar actividades sospechosas y bloquear ataques antes de que causen daños (https://www.darktrace.com, https://www.cylance.com).",
      },
      {
        type: "h2",
        text: "Paso 11: Optimización de Precios Dinámicos",
      },
      {
        type: "p",
        text: "La IA permite ajustar precios de productos y servicios en tiempo real, analizando competencia, demanda y tendencias del mercado. Esto asegura precios competitivos y maximiza el margen de beneficio.",
      },
      {
        type: "h2",
        text: "Paso 12: Automatización de Procesos Administrativos",
      },
      {
        type: "p",
        text: "La IA puede automatizar tareas administrativas como contabilidad, facturación y gestión de nóminas, reduciendo errores humanos y costos operativos.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos subraya que la automatización administrativa permite a los emprendedores enfocarse en la estrategia empresarial.",
      },
      {
        type: "h2",
        text: "Paso 13: Medición y Optimización Continua",
      },
      {
        type: "p",
        text: "Una vez implementada la IA, es crucial medir su rendimiento y optimizar su funcionamiento. Utiliza KPIs específicos y análisis de datos para evaluar el impacto de la IA en tus objetivos comerciales.",
      },
      {
        type: "h2",
        text: "Preguntas y Respuestas de Jhon Alejandro Linares Camberos",
      },
      {
        type: "p",
        text: "¿Cuál es el mayor beneficio de emprender con IA en Colombia? Respuesta: La IA permite a las pequeñas empresas competir en igualdad de condiciones con empresas más grandes al reducir costos, automatizar procesos y mejorar la experiencia del cliente.",
      },
      {
        type: "p",
        text: "¿Cuáles son los principales desafíos? Respuesta: Los desafíos incluyen costos iniciales de implementación, resistencia al cambio y necesidad de capacitación continua. Sin embargo, los beneficios a largo plazo superan estos obstáculos.",
      },
    ],
  }),
  defineArticle({
    category: "Sociedad",
    title:
      "Tecnología y Medio Ambiente en Colombia: Por Jhon Alejandro Linares Camberos sobre Recursos Naturales, Costos y Beneficios",
    excerpt:
      "En un país tan biodiverso y rico en recursos naturales como Colombia, la tecnología juega un papel crucial en la gestión sostenible del medio ambiente.",
    date: "21 de febrero de 2025",
    dateIso: "2025-02-21",
    slug: "tecnologia-y-medio-ambiente",
    author: SITE_NAME,
    content: [
      {
        type: "p",
        text: "En un país tan biodiverso y rico en recursos naturales como Colombia, la tecnología juega un papel crucial en la gestión sostenible del medio ambiente. Desde soluciones innovadoras para energías renovables hasta el uso de inteligencia artificial en la conservación de la biodiversidad, la tecnología no solo ofrece beneficios ambientales, sino también oportunidades económicas. Soy Jhon Alejandro Linares Camberos, Analista en desarrollo digital y gestión de tecnologías en instituciones, y en este análisis exploraremos cómo la tecnología está transformando el uso de recursos naturales en Colombia, evaluando sus costos y beneficios desde una perspectiva ambiental y económica.",
      },
      {
        type: "h2",
        text: "La Importancia de los Recursos Naturales en Colombia",
      },
      {
        type: "p",
        text: "Colombia es uno de los países más biodiversos del mundo, ocupando el segundo lugar en biodiversidad global. Posee ecosistemas únicos, como la Amazonía, la Orinoquía y los Andes, además de amplias reservas de recursos naturales como agua, minerales y energías renovables.",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos destaca que, si bien estos recursos son fundamentales para la economía colombiana, su gestión sostenible es esencial para preservar el medio ambiente y garantizar el bienestar de las futuras generaciones. En este contexto, la tecnología se presenta como una herramienta clave para lograr un equilibrio sostenible entre el desarrollo económico y la conservación ambiental.",
      },
      {
        type: "h3",
        text: "Crecimiento de la Energía Solar y Eólica",
      },
      {
        type: "p",
        text: "En los últimos años, Colombia ha experimentado un crecimiento exponencial en energías renovables, especialmente en energía solar y eólica. El país tiene un potencial solar promedio de 4,5 kWh/m²/día, lo que lo convierte en un escenario ideal para el desarrollo de plantas fotovoltaicas. Además, regiones como La Guajira cuentan con vientos constantes que favorecen la energía eólica.",
      },
      {
        type: "p",
        text: "Según el Plan Energético Nacional, Colombia planea incrementar su capacidad de energía renovable en un 400% para el año 2030 (https://www.minenergia.gov.co/documentos/plan_energetico_nacional_2030.pdf). Esto no solo reduce las emisiones de carbono, sino que también diversifica la matriz energética y reduce los costos de electricidad en comunidades remotas.",
      },
      {
        type: "h3",
        text: "Beneficios y Costos de las Energías Renovables",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos resalta los principales beneficios económicos de las energías renovables:",
      },
      {
        type: "ul",
        items: [
          "Reducción de Costos Operativos: Las plantas solares y eólicas no requieren combustibles costosos y tienen costos de mantenimiento más bajos en comparación con las plantas de energía fósil.",
          "Creación de Empleos Verdes: La expansión de energías renovables ha generado empleos en instalación, operación y mantenimiento, beneficiando a comunidades locales.",
          "Independencia Energética: Al utilizar fuentes de energía locales, Colombia reduce su dependencia de combustibles fósiles importados, mejorando la seguridad energética.",
        ],
      },
      {
        type: "p",
        text: "Sin embargo, también existen costos iniciales significativos en infraestructura y tecnología, aunque estos se ven compensados por los ahorros a largo plazo y los beneficios ambientales.",
      },
      {
        type: "h3",
        text: "Monitoreo Ambiental con IA y Drones",
      },
      {
        type: "p",
        text: "En Colombia, la inteligencia artificial (IA) se utiliza para monitorear y proteger la biodiversidad en reservas naturales y parques nacionales. Mediante el uso de drones equipados con cámaras de alta resolución e IA, es posible rastrear especies en peligro de extinción, detectar actividades ilegales como la deforestación y controlar la calidad del aire y agua.",
      },
      {
        type: "p",
        text: "Por ejemplo, en la Amazonía colombiana, se han implementado drones con IA para detectar en tiempo real incendios forestales y actividades mineras ilegales (https://www.minambiente.gov.co/monitoreo_amazonia.pdf). Esto no solo protege la biodiversidad, sino que también reduce costos operativos al automatizar la vigilancia ambiental.",
      },
      {
        type: "h3",
        text: "Beneficios y Desafíos del Uso de IA en la Conservación",
      },
      {
        type: "p",
        text: "Jhon Alejandro Linares Camberos señala que la IA ofrece múltiples beneficios en la conservación ambiental, tales como:",
      },
      {
        type: "ul",
        items: [
          "Mayor Precisión y Eficiencia: La IA analiza grandes cantidades de datos en tiempo real, permitiendo una respuesta rápida a amenazas ambientales.",
          "Reducción de Costos de Monitoreo: Al utilizar drones y sensores inteligentes, se eliminan los costos asociados con la vigilancia manual en zonas remotas.",
          "Educación y Sensibilización: La información obtenida puede ser utilizada en campañas educativas, aumentando la conciencia ambiental.",
        ],
      },
      {
        type: "p",
        text: "Sin embargo, el costo inicial de la tecnología y la necesidad de capacitación especializada son desafíos a considerar. Además, Jhon Alejandro Linares Camberos advierte sobre preocupaciones éticas relacionadas con la privacidad y el uso de datos en comunidades indígenas.",
      },
      {
        type: "h3",
        text: "Economía Circular y Sostenibilidad Empresarial",
      },
      {
        type: "p",
        text: "La adopción de tecnologías sostenibles ha impulsado el crecimiento de la economía circular en Colombia, promoviendo la reutilización de recursos y la reducción de residuos. Empresas colombianas han implementado tecnologías de reciclaje inteligente y biotecnología para transformar residuos en nuevos productos, generando ingresos adicionales y reduciendo costos operativos.",
      },
      {
        type: "p",
        text: "Un ejemplo destacado es la industria textil colombiana, que utiliza IA para optimizar procesos de producción y reducir el consumo de agua y energía (https://www.mincomercio.gov.co/tecnologia_textil.pdf). Esto no solo aumenta la rentabilidad, sino que también reduce la huella de carbono.",
      },
      {
        type: "h2",
        text: "Preguntas y Respuestas de Jhon Alejandro Linares Camberos",
      },
      {
        type: "p",
        text: "¿Cuáles son los mayores beneficios de las energías renovables en Colombia? Respuesta: Los principales beneficios incluyen reducción de costos operativos, creación de empleos verdes y mayor independencia energética. Además, las energías renovables reducen las emisiones de carbono, ayudando a mitigar el cambio climático.",
      },
      {
        type: "p",
        text: "¿Cuáles son los desafíos en la implementación de IA en la conservación ambiental? Respuesta: Los desafíos incluyen costos iniciales altos, necesidad de capacitación especializada y preocupaciones éticas sobre privacidad y uso de datos. Sin embargo, los beneficios a largo plazo superan estos obstáculos, proporcionando monitoreo ambiental eficiente y económico.",
      },
      {
        type: "h2",
        text: "Conclusión: Un Futuro Sostenible y Tecnológico para Colombia",
      },
      {
        type: "p",
        text: "La tecnología ambiental está transformando la forma en que Colombia maneja sus recursos naturales, proporcionando beneficios económicos, reducción de costos y preservación del medio ambiente. Jhon Alejandro Linares Camberos concluye que la adopción estratégica de energías renovables e inteligencia artificial permitirá a Colombia alcanzar sus metas de sostenibilidad y fortalecer su economía de manera responsable y ecológica.",
      },
    ],
  }),
]

const articlesBySlug = new Map(
  articles.map((article) => [article.slug, article]),
)

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesBySlug.get(slug)
}

export function getRelatedArticles(slug: string): Article[] {
  return articles.filter((article) => article.slug !== slug)
}

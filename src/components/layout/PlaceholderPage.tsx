import Link from "next/link"

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main
      id="contenido"
      className="flex-1 pb-[var(--space-3xl)] pt-[calc(var(--header-offset)+var(--space-2xl))]"
    >
      <div className="editorial-shell">
        <p className="col-span-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted lg:col-span-12">
          Contenido pendiente
        </p>
        <h1 className="col-span-4 mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.03em] lg:col-span-10">
          {title}
        </h1>
        <p className="editorial-measure col-span-4 mt-6 text-foreground lg:col-span-8">
          {description}
        </p>
        <p className="col-span-4 mt-10 lg:col-span-8">
          <Link
            href="/"
            className="text-[0.9375rem] font-medium text-foreground underline-offset-4 hover:underline"
          >
            Volver a Alejandro
          </Link>
        </p>
      </div>
    </main>
  )
}

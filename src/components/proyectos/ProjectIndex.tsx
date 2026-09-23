import type { Project } from "@/data/projects"

type ProjectIndexProps = {
  projects: Project[]
  selectedId: string
  name: string
  legend: string
  onSelect: (id: string) => void
}

export function ProjectIndex({
  projects,
  selectedId,
  name,
  legend,
  onSelect,
}: ProjectIndexProps) {
  return (
    <fieldset className="col-span-4 lg:col-span-12">
      <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
        {legend}
      </legend>
      <ul className="project-index mt-[var(--space-md)] max-h-[min(28rem,52vh)] overflow-y-auto border-y border-[var(--border)]">
        {projects.map((project, index) => {
          const selected = project.id === selectedId
          const position = String(index + 1).padStart(2, "0")

          return (
            <li key={project.id} className="border-b border-[var(--border)] last:border-b-0">
              <label
                id={`proyecto-indice-${project.id}`}
                className="press-row group relative grid min-h-11 cursor-pointer grid-cols-4 items-center gap-[var(--grid-gutter)] py-[var(--space-md)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-4px] has-[:focus-visible]:outline-[var(--ring)] md:grid-cols-8 lg:grid-cols-12"
              >
                <input
                  type="radio"
                  name={name}
                  value={project.id}
                  checked={selected}
                  onChange={() => onSelect(project.id)}
                  aria-controls="proyecto-actual"
                  className="sr-only"
                />
                <span
                  className={`col-span-1 font-mono text-[0.6875rem] tabular-nums tracking-[0.16em] ${
                    selected ? "font-bold text-foreground" : "text-muted"
                  }`}
                >
                  {position}
                </span>
                <span
                  className={`col-span-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] md:col-span-2 lg:col-span-2 ${
                    selected ? "text-foreground" : "text-muted"
                  }`}
                >
                  {project.category}
                </span>
                <span
                  className={`col-span-4 text-[1.0625rem] leading-snug md:col-span-5 lg:col-span-8 ${
                    selected ? "font-semibold text-foreground" : "font-medium text-foreground"
                  }`}
                >
                  {project.title}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

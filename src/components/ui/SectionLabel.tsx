type SectionLabelProps = {
  index: string
  children?: string
}

export function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <p className="font-mono text-[0.6875rem] uppercase leading-[1.3] tracking-[0.16em] text-muted">
      <span className="block tabular-nums">{index}</span>
      {children ? <span className="block">{children}</span> : null}
    </p>
  )
}

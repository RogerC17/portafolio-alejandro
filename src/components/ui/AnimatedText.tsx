type AnimatedTextProps = {
  lines: readonly string[]
  as?: "h1" | "h2"
  id?: string
  className?: string
}

export function AnimatedText({
  lines,
  as: Tag = "h1",
  id,
  className,
}: AnimatedTextProps) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line) => (
        <span key={line} className="hero-line block">
          {line}
        </span>
      ))}
    </Tag>
  )
}

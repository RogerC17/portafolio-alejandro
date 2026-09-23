type IdeaMetaProps = {
  category: string
  date: string
  dateIso: string
  readingTime?: string
  author?: string
  record?: string
}

export function IdeaMeta({
  category,
  date,
  dateIso,
  readingTime,
  author,
  record,
}: IdeaMetaProps) {
  return (
    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
      {record ? (
        <>
          <span className="tabular-nums">{record}</span>
          <span aria-hidden="true"> · </span>
        </>
      ) : null}
      {category}
      <span aria-hidden="true"> · </span>
      <time dateTime={dateIso}>{date}</time>
      {readingTime ? (
        <>
          <span aria-hidden="true"> · </span>
          <span>{readingTime}</span>
        </>
      ) : null}
      {author ? (
        <>
          <span aria-hidden="true"> · </span>
          <span>{author}</span>
        </>
      ) : null}
    </p>
  )
}

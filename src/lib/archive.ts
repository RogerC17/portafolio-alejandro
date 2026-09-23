export function archiveOrdinal(index: number): string {
  return String(index).padStart(2, "0")
}

export function archiveLabel(kind: string, index: number): string {
  return `${kind} ${archiveOrdinal(index)}`
}

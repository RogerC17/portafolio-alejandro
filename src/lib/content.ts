export const PENDING_COPY = "TODO: validar contenido"

export function isPendingCopy(value?: string): boolean {
  return !value || value.startsWith("TODO:")
}

export class ConflictError extends Error {
  constructor(field: string, message?: string) {
    super(message || `Conflict error on field: ${field}`);
  }
}

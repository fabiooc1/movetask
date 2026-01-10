export class UnathorizedError extends Error {
  constructor() {
    super("User is not authorized to perform this action");
  }
}

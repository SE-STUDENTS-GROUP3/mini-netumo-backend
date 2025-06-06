export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
    public details?: any
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
  }
}

export class ValidationError extends APIError {
  constructor(details: any) {
    super(400, "Validation failed", true, details);
  }
}

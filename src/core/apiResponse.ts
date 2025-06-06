import { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  error: Error | APIError,
  statusCode = 500
) {
  const isAPIError = error instanceof APIError;
  res.status(isAPIError ? error.statusCode : statusCode).json({
    success: false,
    message: error.message,
    details: isAPIError ? error.details : undefined,
  });
}

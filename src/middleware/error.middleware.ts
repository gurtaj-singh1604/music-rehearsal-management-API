import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (process.env.NODE_ENV !== "test") {
    console.error("UNHANDLED ERROR:");
    console.error(err);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
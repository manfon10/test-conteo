import { type Response, type NextFunction, type Request } from "express";

import { CustomError } from "../../domain/errors";

export class ErrorHandler {
  public static handleError = (
    error: unknown,
    _: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (error instanceof CustomError) {
      const { message } = error;

      const statusCode = error.statusCode;

      res.status(statusCode).json({ statusCode, message });
    } else {
      const message = "Error interno del servidor";

      const statusCode = 500;

      res.status(statusCode).json({ statusCode, message });
    }

    next();
  };
}

import { NextFunction, Request, Response } from "express";

import { Schema } from "joi";

export const validatorHandler = (schema: Schema, property: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = (req as any)[property];

    try {
      await schema.validateAsync(data, { abortEarly: false });

      next();
    } catch (error) {
      res.status(400).json({ statusCode: 400, message: error });
    }
  };
};

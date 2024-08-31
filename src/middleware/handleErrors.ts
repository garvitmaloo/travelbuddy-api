import type { Request, Response, NextFunction } from "express";

import { logger } from "../utils/logger";

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode ?? 500;

  logger.error(error.stack);

  res.status(statusCode).json({
    error: {
      statusCode,
      message: error.message
    },
    result: null
  });
  next();
};

import { Request, Response, NextFunction } from 'express';
import StatusCode from '../../enums/StatusCodesEnum';
import { HttpErrorResponse } from '../../baseClasses/HttpResponse';
import ApplicationError from './errors/ApplicationError';
import DatabaseError from './errors/DatabaseError';
import ApplicationServiceError from './errors/ApplicationServiceError';

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let errorResponse = new HttpErrorResponse<void>(
    StatusCode.INTERNAL_SERVER_ERROR,
    {
      message: 'Unexpected error',
      errors: undefined,
    }
  );

  if (error instanceof ApplicationError) {
    errorResponse = new HttpErrorResponse<any>(error.status, {
      message: error.message,
      errors: error.errors,
    });
  }

  if (
    error instanceof DatabaseError ||
    error instanceof ApplicationServiceError
  ) {
    if (process.env.NODE_ENV === 'production') {
      errorResponse.body.errors = undefined;
    }
  }

  console.error(error);
  return response.status(errorResponse.statusCode).json(errorResponse.body);
};

export default errorHandler;

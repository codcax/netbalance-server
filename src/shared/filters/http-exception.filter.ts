import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  timestamp: string;
  path?: string;
  message: string;
  errors?: string | Array<string> | object;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const message = exception.message;

    const errorResponse: ErrorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (exception instanceof BadRequestException) {
      const exceptionResponse: any = exception.getResponse();
      errorResponse.errors = exceptionResponse.errors;
    }

    response.status(statusCode).json(errorResponse);
  }
}

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  error?: string | Array<string>;
  path?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const message = exception.message;
    const exceptionResponse: any = exception.getResponse();

    const errorResponse: ErrorResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      message,
      path: request.url,
    };

    if (exception instanceof BadRequestException) {
      const message = exceptionResponse.message;
      errorResponse.error = message;
    }

    response.status(statusCode).json(errorResponse);
  }
}

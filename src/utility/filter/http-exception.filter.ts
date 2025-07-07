/* eslint-disable prettier/prettier */


import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | string[];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as any)?.message || 'Unexpected error occurred';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Network error or unexpected server error';
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}

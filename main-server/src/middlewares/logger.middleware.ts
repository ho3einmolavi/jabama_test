import { LOGGER_MICROSERVICE_NAME } from './../common/constants';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOGGER_MICROSERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;

    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      if (body && body.password) {
        body.password = '***';
      }
      //send log to logger server
      this.client.emit('log', {
        body,
        method,
        originalUrl,
        statusCode,
        userAgent,
        ip,
        date: new Date(),
      });
    });
    next();
  }
}

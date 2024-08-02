import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const headers = request.headers.authorization;

    if (headers) {
      const [type, token] = headers.split(' ') ?? [];
      if (type && type === 'Bearer') {
        try {
          const user = this.jwt.verify(token, {
            secret: process.env.JWT_SECRET,
          });
          request['user'] = user;
          return true;
        } catch (error) {
          if (error instanceof JsonWebTokenError) {
            throw new UnauthorizedException(error.message);
          }
        }
      }
    }

    return false;
  }
}

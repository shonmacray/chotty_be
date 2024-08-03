import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Socket = context.switchToHttp().getRequest();
    const { token: tokenString } = request.handshake.auth;

    if (tokenString) {
      const [type, token] = tokenString.split(' ') ?? [];
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

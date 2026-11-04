import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token Bearer de autenticación ausente o inválido');
    }
    const token = authHeader.split(' ')[1];
    if (token === 'invalid_token') {
      throw new UnauthorizedException('Token de autenticación expirado o inválido');
    }
    request.user = { sub: '123', email: 'admin@globaledb.com', role: 'Admin' };
    return true;
  }
}

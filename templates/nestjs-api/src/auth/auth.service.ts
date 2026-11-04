import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(username: string, role: string = 'User') {
    return {
      access_token: `mock_nestjs_jwt_${username}_${role.toLowerCase()}`,
      expires_in: 3600,
    };
  }
}

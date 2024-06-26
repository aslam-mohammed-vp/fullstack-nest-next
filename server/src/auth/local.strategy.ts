import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
    this.logger = new Logger(LocalStrategy.name);
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      email.toLowerCase(),
      password,
    );
    if (!user) {
      this.logger.error('Unauthorised user');
      throw new UnauthorizedException();
    }
    return user;
  }
}

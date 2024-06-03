import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(private readonly usersService: UserService) {
    this.logger = new Logger(AuthService.name);
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      this.logger.error('User not found');
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      this.logger.log('User found');
      return { fullname: user.fullname, email: user.email, _id: user._id };
    }
    return null;
  }
}

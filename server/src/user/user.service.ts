import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(@InjectModel('user') private readonly user: Model<User>) {
    this.logger = new Logger(UserService.name);
  }
  async createUser(fullname: string, email: string, password: string) {
    const newUser = new this.user({
      fullname,
      email: email.toLowerCase(),
      password,
    });
    await newUser.save();
    return newUser;
  }

  async getUser(email: string) {
    const user = await this.user.findOne({ email: email.toLowerCase() });
    return user;
  }
}

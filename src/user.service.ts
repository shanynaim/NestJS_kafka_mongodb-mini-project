/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async userHandler(name, password): Promise<any> {
    console.log('name is :' + name, ' password is :' + password);
    try {
      const createdUser = await this.userModel.create({ name, password });

      return await createdUser.save();
    } catch (error) {
      console.log(error);
    }
  }
}

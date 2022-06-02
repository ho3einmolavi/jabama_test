import { IUser } from './../schemas/user/user.interface';
import { USER_COLLECTION } from 'src/common/constants';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, Types } from 'mongoose';

interface CreateUser {
  email: string;
  password: string;
}

@Injectable()
export class UserData {
  constructor(
    @InjectModel(USER_COLLECTION) private readonly UserModel: Model<IUser>,
  ) {}

  async create(data: CreateUser): Promise<IUser> {
    const { email, password } = data;
    const createdUser = new this.UserModel({
      email,
      password,
    });
    return createdUser.save();
  }

  async find(user: FilterQuery<IUser>): Promise<IUser> {
    return this.UserModel.findOne(user);
  }

  async update(userId: Types.ObjectId, fields: any): Promise<IUser> {
    return this.UserModel.findByIdAndUpdate(userId, fields, { new: true });
  }
}

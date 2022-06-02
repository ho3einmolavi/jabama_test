import { matchPassword } from './../common/utils';
import { UserStatus } from './../common/enums';
import { EMAIL_MICROSERVICE_NAME } from './../common/constants';
import { UserData } from './../data/user.data';
import { IUser } from '../schemas/user/user.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Types } from 'mongoose';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly accessTokenSecretKey: string =
    process.env.ACCESS_TOKEN_SECRET_KEY;
  private readonly refreshTokenSecretKey: string =
    process.env.REFRESH_TOKEN_SECRET_KEY;
  constructor(
    private readonly userData: UserData,
    @Inject(EMAIL_MICROSERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  async signAccessToken(user: IUser): Promise<string> {
    return JWT.sign(
      {
        email: user.email,
      },
      this.accessTokenSecretKey,
      {
        expiresIn: '1h',
      },
    );
  }

  async signRefreshToken(user: IUser): Promise<string> {
    return JWT.sign(
      {
        email: user.email,
      },
      this.refreshTokenSecretKey,
      {
        expiresIn: '180d',
      },
    );
  }

  async signup(email: string, password: string): Promise<IUser> {
    const existingUser = await this.userData.find({ email });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.userData.create({
      email,
      password,
    });

    //send email to user throw microservice
    this.client.emit('sendEmail', {
      to: createdUser.email,
      subject: 'Please verify your email',
      content: {
        verificationCode: createdUser.verificationToken.value,
      },
    });
    return createdUser;
  }

  async verifyEmail(
    userId: Types.ObjectId,
    code: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userData.find({
      _id: userId,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (user.verificationToken.value !== code) {
      throw new HttpException(
        'Invalid verification code',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.verificationToken.expirationDate < new Date()) {
      throw new HttpException(
        'Verification code expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.status === UserStatus.Verified) {
      throw new HttpException('User already verified', HttpStatus.BAD_REQUEST);
    }

    await this.userData.update(user._id, {
      status: UserStatus.Verified,
    });
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userData.find({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const is_password_match = await matchPassword(password, user.password);
    if (!is_password_match) {
      throw new HttpException(
        "email or password is not match",
        HttpStatus.BAD_REQUEST
      );
    }

    if (user.status !== UserStatus.Verified) {
      throw new HttpException('User is not verified', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);
    return { accessToken, refreshToken };
  }
}

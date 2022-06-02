import { Types } from 'mongoose';
import { LoginDto, UserSignUpDto, VerifyEmailDto } from './../dto/auth.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../interceptors/error.interceptor';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('/api/auth')
@UseInterceptors(new ErrorsInterceptor(), new TransformInterceptor())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'user signed up' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiBody({
    type: UserSignUpDto,
    description: 'sign up user body',
  })
  @ApiOperation({
    summary: 'sign up',
    description: 'sign up user based on email and password',
  })
  @HttpCode(201)
  async signup(@Body() userSignUpDto: UserSignUpDto) {
    let { email, password } = userSignUpDto;
    email = email.toLowerCase();
    return this.authService.signup(email, password);
  }

  @Post('/verify-email')
  @ApiOkResponse({ description: 'user verifies email' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiBody({
    type: VerifyEmailDto,
    description: 'verify email body',
  })
  @ApiOperation({
    summary: 'verify email',
    description: 'verifying email based on verification code and user id',
  })
  @HttpCode(200)
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const { userId, code } = verifyEmailDto;
    return this.authService.verifyEmail(new Types.ObjectId(userId), code);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'user login' })
  @ApiBadRequestResponse({ description: 'validation error' })
  @ApiBody({
    type: LoginDto,
    description: 'login body',
  })
  @ApiOperation({
    summary: 'login',
    description: 'user login based on email and password',
  })
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    let { email, password } = loginDto;
    email = email.toLowerCase().trim();
    return this.authService.login(email, password);
  }
}

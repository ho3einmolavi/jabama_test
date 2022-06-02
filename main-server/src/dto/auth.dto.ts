import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email', required: true })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'Password', required: true })
  password: string;
}
export class VerifyEmailDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'user Id', required: true })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Verification Code',
    required: true,
  })
  code: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email', required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Password', required: true })
  password: string;
}

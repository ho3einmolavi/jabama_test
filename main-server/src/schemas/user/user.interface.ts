import { Document } from 'mongoose';

export interface IVerificationToken extends Document {
  value: string;
  expirationDate: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  status: number;
  verificationToken: IVerificationToken;
}

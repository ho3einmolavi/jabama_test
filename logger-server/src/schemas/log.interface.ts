import { Document } from 'mongoose';

export interface ILog extends Document {
  body: any;
  method: string;
  originalUrl: string;
  statusCode: number;
  userAgent: string;
  ip: string;
  date: Date;
}

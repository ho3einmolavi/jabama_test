import { ILog } from './../schemas/log.interface';
import { LOGS_COLLECTION } from './../common/constants';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LogData {
  constructor(
    @InjectModel(LOGS_COLLECTION) private readonly LogModel: Model<ILog>,
  ) {}

  async create(data: any): Promise<ILog> {
    const log = new this.LogModel(data);
    return log.save();
  }
}

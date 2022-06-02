import { LogData } from './../data/log.data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(private readonly logData: LogData) {}

  async createLog(data: any): Promise<any> {
    return this.logData.create(data);
  }
}

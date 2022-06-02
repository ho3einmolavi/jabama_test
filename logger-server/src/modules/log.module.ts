import { LogData } from './../data/log.data';
import { LogSchema } from './../schemas/log.schema';
import { LOGS_COLLECTION } from './../common/constants';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from '../services/log.service';
import { AppController } from '../controllers/app.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LOGS_COLLECTION, schema: LogSchema }]),
  ],
  controllers: [AppController],
  providers: [LogService, LogData],
})
export class LogModule {}

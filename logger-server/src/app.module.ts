import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './modules/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(`${process.env.DB_HOST}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

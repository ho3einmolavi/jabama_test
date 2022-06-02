import { UserData } from './../data/user.data';
import {
  EMAIL_MICROSERVICE_NAME,
  USER_COLLECTION,
} from './../common/constants';
import { UserSchema } from '../schemas/user/user.schema';
import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_COLLECTION, schema: UserSchema }]),
    ClientsModule.register([
      {
        name: EMAIL_MICROSERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'mails_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserData],
})
export class AuthModule {}

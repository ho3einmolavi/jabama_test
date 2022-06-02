import { SendGridProvider } from './messaging-providers/sendGrid.provider';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { MessagingService } from './services/messaging.service';
import { MailService } from '@sendgrid/mail';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [AppController],
  providers: [MessagingService, SendGridProvider, MailService],
})
export class AppModule {}

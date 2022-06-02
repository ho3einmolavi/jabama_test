import { SendGridProvider } from './../messaging-providers/sendGrid.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  constructor(private readonly messagingProvider: SendGridProvider) {}

  async sendEmail(to: string, subject: string, content: any) {
    return this.messagingProvider.send(to, subject, content);
  }
}

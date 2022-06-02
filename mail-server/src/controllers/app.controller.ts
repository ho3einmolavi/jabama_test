import { MessagingService } from './../services/messaging.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly messagingService: MessagingService) {}

  @EventPattern('sendEmail')
  async sendEmail(@Payload() data, @Ctx() context: RmqContext) {
    try {
      await this.messagingService.sendEmail(data.to, data.subject, {
        verificationCode: data.content.verificationCode,
      });
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      channel.ack(originalMsg);
    } catch (error) {
      console.log(error);
    }
  }
}

import { LogService } from './../services/log.service';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly logService: LogService) {}

  @EventPattern('log')
  async storeLog(@Payload() data, @Ctx() context: RmqContext) {
    try {
      await this.logService.createLog(data);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
      console.log('Log stored');
    } catch (error) {
      console.log(error);
    }
  }
}

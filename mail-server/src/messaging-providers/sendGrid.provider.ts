import { IProvider } from './provider.interface';
import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { getSendGridApiKey } from 'src/common/utils';

@Injectable()
export class SendGridProvider implements IProvider {
  private readonly from: string;
  constructor(private readonly sendGrid: MailService) {
    const apiKey = getSendGridApiKey()
    this.sendGrid.setApiKey(apiKey);
    this.from = process.env.SENDGRID_NOREPLY_EMAIL;
  }

  async send(to: string, subject: string, content: any): Promise<void> {
    await this.sendGrid.send({
      to,
      subject,
      from: this.from,
      html: `<h1>verification code ${content.verificationCode}</h1>`,
    });
    console.log(`Message sent to: ${to}`);
  }
}

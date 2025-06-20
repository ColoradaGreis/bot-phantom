import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendWhatsAppMessage(to: string, message: string) {
    return await this.client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // número de Twilio sandbox
      to: `whatsapp:${to}`,
    });
  }
}

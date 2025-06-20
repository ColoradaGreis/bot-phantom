import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    console.log('Twilio Service initialized with SID:', accountSid);

    this.client = new Twilio(accountSid, authToken);
  }

  async sendWhatsAppMessage(to: string, message: string) {
    const client = await this.client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // número de Twilio sandbox
      to: `whatsapp:${to}`,
    });
    console.log('WhatsApp message sent:', client.sid);
    return client;
  }

  async replyMessage(to: string, message: string) {
    return await this.client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // tu sandbox
      to,
    });
  }
}

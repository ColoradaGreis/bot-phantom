import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('whatsapp')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return this.twilioService.sendWhatsAppMessage(body.to, body.message);
  }
}

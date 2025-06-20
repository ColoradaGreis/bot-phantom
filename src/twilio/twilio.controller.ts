import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from './twilio.service';

interface TwilioWebhookDto {
  Body: string;
  From: string;
}

@Controller('whatsapp')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return this.twilioService.sendWhatsAppMessage(body.to, body.message);
  }

  @Post('webhook')
  async handleWebhook(@Body() body: TwilioWebhookDto) {
    const msg = body.Body ?? '';
    const from = body.From ?? '';

    console.log('📩 Mensaje recibido:', msg);
    console.log('👤 De:', from);

    await this.twilioService.replyMessage(
      from,
      'Hola! Soy tu bot. ¿En qué puedo ayudarte?',
    );

    return '<Response></Response>';
  }
}

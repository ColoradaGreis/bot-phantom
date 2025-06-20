import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Response } from 'express';

@Controller('whatsapp')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('send')
  async sendMessage(@Body() body: { to: string; message: string }) {
    return this.twilioService.sendWhatsAppMessage(body.to, body.message);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const msg: string = req.body?.Body ?? '';
    const from: string = req.body?.From ?? '';

    console.log('📩 Mensaje recibido:', msg);
    console.log('👤 De:', from);

    // Respuesta simple
    const reply = await this.twilioService.replyMessage(
      from,
      'Hola! Soy tu bot. ¿En qué puedo ayudarte?',
    );

    res.status(200).send('<Response></Response>');
  }
}

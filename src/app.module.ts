import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule } from './twilio/twilio.module';
import { TwilioController } from './twilio/twilio.controller';

@Module({
  imports: [TwilioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

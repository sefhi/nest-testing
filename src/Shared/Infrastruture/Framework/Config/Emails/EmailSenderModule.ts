import { Module } from '@nestjs/common';
import { EMAIL_SENDER } from '../../../../Domain/Emails/EmailSender';
import { ConsoleEmailSender } from '../../../Email/ConsoleEmailSender';

@Module({
  providers: [
    {
      provide: EMAIL_SENDER,
      useClass: ConsoleEmailSender,
    },
  ],
  exports: [EMAIL_SENDER],
})
export class EmailSenderModule {}

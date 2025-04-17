import { Module } from '@nestjs/common';
import { EVENT_BUS } from '../../../../Domain/Buses/EventBus';
import { InMemoryEventBus } from '../../../Buses/InMemoryEventBus';
import { SendMailUserCreatedWelcomeHandler } from '../../../../../Users/Application/Events/UserCreated/SendMailUserCreatedWelcomeHandler';
import { EventHandler } from '../../../../Domain/Buses/EventHandler';
import { EmailSenderModule } from '../Emails/EmailSenderModule';

const eventHandlers = [
  SendMailUserCreatedWelcomeHandler,
  //Add more handlers here ...
];

@Module({
  imports: [EmailSenderModule],
  providers: [
    ...eventHandlers,
    {
      provide: EVENT_BUS,
      useFactory: (...handlers: EventHandler[]) => {
        return new InMemoryEventBus(handlers);
      },
      inject: [...eventHandlers],
    },
  ],
  exports: [EVENT_BUS],
})
export class EventHandlersModule {}

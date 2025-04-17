import { Module } from '@nestjs/common';
import { EVENT_BUS } from '../../../../Domain/Buses/EventBus';
import { InMemoryEventBus } from '../../../Buses/InMemoryEventBus';
import { SendMailUserCreatedWelcomeHandler } from '../../../../../Users/Application/Events/UserCreated/SendMailUserCreatedWelcomeHandler';

const eventHandlers = [
  SendMailUserCreatedWelcomeHandler,
  //Add more handlers here ...
];

@Module({
  providers: [
    ...eventHandlers,
    {
      provide: EVENT_BUS,
      useFactory: (...handlers) => {
        return new InMemoryEventBus(handlers);
      },
      inject: [...eventHandlers],
    },
  ],
  exports: [EVENT_BUS],
})
export class EventHandlersModule {}

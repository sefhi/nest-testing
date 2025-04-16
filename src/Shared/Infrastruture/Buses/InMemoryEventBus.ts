import { EventBus } from '../../Domain/Buses/EventBus';
import { DomainEvent } from '../../Domain/Events/DomainEvent';
import { EventHandler } from '../../Domain/Buses/EventHandler';

export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, EventHandler[]>;

  constructor(handlers: EventHandler[] = []) {
    this.handlers = new Map();
    this.registerHandlers(handlers);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const eventName = this.getEventName(event);
      const handlers = this.handlers.get(eventName) || [];

      for (const handler of handlers) {
        try {
          await handler.handle(event);
        } catch (error) {
          console.error(
            `Error al ejecutar el handler para ${eventName}:`,
            error,
          );
        }
      }
    }
  }

  registerHandlers(handlers: EventHandler[]): void {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  registerHandler(handler: EventHandler): void {
    const subscribedEvents = handler.subscribedTo();

    subscribedEvents.forEach((eventClass) => {
      const eventName = eventClass.EVENT_NAME;

      if (!this.handlers.has(eventName)) {
        this.handlers.set(eventName, []);
      }

      const eventHandlers = this.handlers.get(eventName)!;
      if (!eventHandlers.includes(handler)) {
        eventHandlers.push(handler);
      }
    });
  }

  private getEventName(event: DomainEvent): string {
    const eventClass = event.constructor as any;
    return eventClass.EVENT_NAME;
  }
}

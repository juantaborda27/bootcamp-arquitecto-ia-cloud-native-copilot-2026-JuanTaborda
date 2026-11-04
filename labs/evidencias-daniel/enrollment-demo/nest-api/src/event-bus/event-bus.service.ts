import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class EventBusService {
  private emitter = new EventEmitter();

  publish(eventName: string, payload: any) {
    // In a real app this would push to a message broker (Kafka, RabbitMQ, etc.)
    console.log(`Event published: ${eventName}`, payload);
    this.emitter.emit(eventName, payload);
  }

  on(eventName: string, listener: (...args: any[]) => void) {
    this.emitter.on(eventName, listener);
  }
}

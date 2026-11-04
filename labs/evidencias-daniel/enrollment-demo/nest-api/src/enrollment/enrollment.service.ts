import { Injectable, ConflictException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EventBusService } from '../event-bus/event-bus.service';
import { EnrollmentCreatedEvent } from './events/enrollment-created.event';

interface EnrollmentRecord {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class EnrollmentService {
  private store = new Map<string, EnrollmentRecord>();
  private idCounter = 1;

  constructor(private readonly eventBus: EventBusService) {}

  create(dto: CreateEnrollmentDto) {
    const key = dto.email.toLowerCase();
    if (this.store.has(key)) {
      throw new ConflictException('Student already enrolled');
    }

    const record: EnrollmentRecord = { id: this.idCounter++, name: dto.name, email: dto.email };
    this.store.set(key, record);

    const event = new EnrollmentCreatedEvent(record.id, record.name, record.email);
    this.eventBus.publish('EnrollmentCreated', event);

    return record;
  }

  findAll() {
    return Array.from(this.store.values());
  }
}

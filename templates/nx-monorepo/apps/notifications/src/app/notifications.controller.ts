import { Controller } from '@nestjs/common';
import { EnrollmentCreatedEvent } from '@enrollment-hub/contracts';

@Controller()
export class NotificationsController {
  private processedEvents = new Set<string>();

  processEnrollmentCreated(event: EnrollmentCreatedEvent): { status: string; eventId: string; correlationId: string } {
    if (this.processedEvents.has(event.eventId)) {
      console.log(`[Notifications Worker] Evento id=${event.eventId} omitido por idempotencia (ya procesado)`);
      return { status: 'DUPLICATE_SKIPPED', eventId: event.eventId, correlationId: event.correlationId };
    }

    this.processedEvents.add(event.eventId);
    console.log(`[Notifications Worker] Notificación enviada para estudiante=${event.studentId}, eventId=${event.eventId}, correlationId=${event.correlationId}`);
    return { status: 'PROCESSED', eventId: event.eventId, correlationId: event.correlationId };
  }
}

import { NotificationsController } from './app/notifications.controller';
import { EnrollmentCreatedEvent } from '@enrollment-hub/contracts';

describe('NotificationsController - Consumidor Idempotente', () => {
  let controller: NotificationsController;

  beforeEach(() => {
    controller = new NotificationsController();
  });

  it('debe procesar el primer evento exitosamente', () => {
    const event: EnrollmentCreatedEvent = {
      eventId: 'EVT-999',
      correlationId: 'CORR-999',
      studentId: 'STD-100',
      courseId: 'CRS-200',
      occurredAt: new Date().toISOString(),
    };

    const res = controller.processEnrollmentCreated(event);
    expect(res.status).toBe('PROCESSED');
    expect(res.eventId).toBe('EVT-999');
  });

  it('debe ignorar eventos duplicados manteniendo idempotencia', () => {
    const event: EnrollmentCreatedEvent = {
      eventId: 'EVT-999',
      correlationId: 'CORR-999',
      studentId: 'STD-100',
      courseId: 'CRS-200',
      occurredAt: new Date().toISOString(),
    };

    controller.processEnrollmentCreated(event);
    const secondTry = controller.processEnrollmentCreated(event);

    expect(secondTry.status).toBe('DUPLICATE_SKIPPED');
    expect(secondTry.eventId).toBe('EVT-999');
  });
});

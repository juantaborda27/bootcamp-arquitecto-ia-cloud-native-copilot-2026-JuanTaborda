import { CreateEnrollmentDto, EnrollmentResponseDto, EnrollmentCreatedEvent } from '@enrollment-hub/contracts';

export class EnrollmentDomainService {
  static createEnrollment(dto: CreateEnrollmentDto, correlationId?: string): { response: EnrollmentResponseDto; event: EnrollmentCreatedEvent } {
    if (!dto.studentId || !dto.courseId) {
      throw new Error('studentId y courseId son requeridos para la inscripción');
    }

    const enrollmentId = `ENR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const eventId = `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();

    const response: EnrollmentResponseDto = {
      enrollmentId,
      studentId: dto.studentId,
      courseId: dto.courseId,
      status: 'CONFIRMED',
      createdAt: now,
    };

    const event: EnrollmentCreatedEvent = {
      eventId,
      correlationId: correlationId || eventId,
      studentId: dto.studentId,
      courseId: dto.courseId,
      occurredAt: now,
    };

    return { response, event };
  }
}

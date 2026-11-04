// Librería agnóstica de contratos DTO y Eventos (Sin dependencias de NestJS/Next.js/TypeORM)

export interface CreateEnrollmentDto {
  studentId: string;
  courseId: string;
}

export interface EnrollmentResponseDto {
  enrollmentId: string;
  studentId: string;
  courseId: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
  createdAt: string;
}

export interface EnrollmentCreatedEvent {
  eventId: string;
  correlationId: string;
  studentId: string;
  courseId: string;
  occurredAt: string;
}

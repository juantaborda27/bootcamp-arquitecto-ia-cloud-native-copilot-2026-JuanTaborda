import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

interface EnrollmentRecord extends CreateEnrollmentDto {
  createdAt: string;
}

@Injectable()
export class EnrollmentsService {
  private byEmail = new Map<string, EnrollmentRecord>();
  private byStudentId = new Map<string, EnrollmentRecord>();

  create(dto: CreateEnrollmentDto): EnrollmentRecord {
    const { email, studentId } = dto;
    if (this.byEmail.has(email) || this.byStudentId.has(studentId)) {
      throw new ConflictException('Enrollment already exists');
    }

    const rec: EnrollmentRecord = { ...dto, createdAt: new Date().toISOString() };
    this.byEmail.set(email, rec);
    this.byStudentId.set(studentId, rec);

    // Publish EnrollmentCreated (simulated) — in real app use message broker/event bus
    // Here we log the event so it can be observed by integrators or tests.
    const event = { type: 'EnrollmentCreated', payload: rec };
    console.log('[EVENT]', JSON.stringify(event));

    return rec;
  }

  findAll(): EnrollmentRecord[] {
    return Array.from(this.byStudentId.values());
  }
}

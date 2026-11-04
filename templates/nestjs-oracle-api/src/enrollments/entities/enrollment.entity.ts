import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';

@Entity('ENROLLMENTS')
@Unique('UQ_STUDENT_COURSE', ['studentId', 'courseId'])
@Index('IDX_ENROLLMENT_STUDENT_STATUS', ['studentId', 'status'])
export class Enrollment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'STUDENT_ID', length: 50 })
  studentId: string;

  @Column({ name: 'COURSE_ID', length: 50 })
  courseId: string;

  @Column({ name: 'STATUS', length: 20, default: 'CONFIRMED' })
  status: string;

  @Column({ name: 'CREATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

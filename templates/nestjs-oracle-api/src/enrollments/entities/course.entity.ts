import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('COURSES')
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'CODE', length: 50, unique: true })
  code: string;

  @Column({ name: 'TITLE', length: 150 })
  title: string;
}

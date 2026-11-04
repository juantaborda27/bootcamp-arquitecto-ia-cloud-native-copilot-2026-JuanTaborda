import { Module } from '@nestjs/common';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [EnrollmentModule],
})
export class AppModule {}

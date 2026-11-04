import { Module } from '@nestjs/common';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [EnrollmentsModule]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';

@Module({
  imports: [],
  controllers: [EnrollmentController],
  providers: [],
})
export class AppModule {}

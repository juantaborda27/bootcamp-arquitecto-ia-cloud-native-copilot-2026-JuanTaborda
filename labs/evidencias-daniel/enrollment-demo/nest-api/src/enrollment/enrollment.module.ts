import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { EventBusService } from '../event-bus/event-bus.service';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EventBusService],
})
export class EnrollmentModule {}

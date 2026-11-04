import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateEnrollmentDto, EnrollmentResponseDto } from '@enrollment-hub/contracts';
import { EnrollmentDomainService } from '@enrollment-hub/domain-enrollment';

@Controller('enrollments')
export class EnrollmentController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEnrollmentDto): EnrollmentResponseDto {
    const { response, event } = EnrollmentDomainService.createEnrollment(dto);
    console.log(`[API NestJS] Evento emitido EnrollmentCreated: eventId=${event.eventId}, correlationId=${event.correlationId}`);
    return response;
  }
}

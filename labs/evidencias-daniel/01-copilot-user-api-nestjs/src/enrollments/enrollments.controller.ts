import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly svc: EnrollmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEnrollmentDto) {
    return this.svc.create(dto);
  }

  @Get()
  getAll() {
    return this.svc.findAll();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClassValidatorTestDto } from './validators/ClassValidatorTestDto';
import { ZodTest } from './validators/ZodTest';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-class-validator')
  classValidator(@Body() body: ClassValidatorTestDto) {
    return body;
  }

  @Post('test-zod')
  zod(@Body() body: any) {
    return ZodTest.safeParse(body);
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    // 시작 api
    return 'homepage';
  }
}

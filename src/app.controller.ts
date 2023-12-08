/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // Render -Decorator indicating that the root method should render a view named 'index'.
  @Render('index')
  root() {
    return { message: 'Hello!' };
  }

  @Post('message')
  message(@Body() body: Body) {
    return this.appService.messageHandler(body['message']);
  }

  // }
}

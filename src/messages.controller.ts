/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello!' };
  }

  @Post('send')
  message(@Body() body: Body) {
    const resultMessage = this.messagesService.messageHandler(body['message']);

    return resultMessage;
  }
}

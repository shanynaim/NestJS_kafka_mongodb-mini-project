/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';

function printObjectKeysAndValues(obj: any): void {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log(`${key}: ${obj[key]}`);
    }
  }
}
@Controller('message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @UseGuards(AuthGuard('auth0'))
  @Render('index')
  root(@Req() req) {
    if (!req.isAuthenticated() || !req.user) {
      return 'Authentication failed!';
    } else {
      printObjectKeysAndValues(req.user);
      return { message: `please enter your message here` };
    }
  }

  @Post('send')
  async message(@Body() body: Body) {
    const resultMessage = await this.messagesService.messageHandler(
      body['message'],
    );

    return resultMessage;
  }
}

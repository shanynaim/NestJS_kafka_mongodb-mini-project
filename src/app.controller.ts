// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Body, Controller, Get, Post, Render } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   @Render('index')
//   root() {
//     return { message: 'Hello!' };
//   }

//   @Post('message')
//   message(@Body() body: Body) {
//     return this.appService.messageHandler(body['message']);
//   }
//   // @Get()
//   // getHello(): string {
//   //   return this.appService.getHello();
//   // }
// }

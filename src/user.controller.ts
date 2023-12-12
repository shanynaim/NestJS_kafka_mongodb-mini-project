/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private userId: any;

  @Get()
  @Render('userDetails')
  root() {
    return {};
  }

  @Post('signin')
  async getDetails(@Body() body: { name: string; password: string }) {
    try {
      const user = await this.userService.userHandler(body.name, body.password);
      if (user) {
        return 'success, user signin with name: ' + user.name;
      }
    } catch (err) {
      return 'error';
    }
  }
}

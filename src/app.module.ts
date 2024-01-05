import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MessagesModule } from './message/messages.module';
import { config } from 'dotenv';
config();

import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shany215sn:9i6dpOi2qYODeMxp@cluster0.fk1u4fq.mongodb.net/decisionApp?retryWrites=true&w=majority',
    ),

    AuthModule,
    UserModule,
    MessagesModule,
  ],
})
export class AppModule {}

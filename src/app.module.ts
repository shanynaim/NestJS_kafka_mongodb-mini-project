import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user.module';
import { MessagesModule } from './messages.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shany215sn:9i6dpOi2qYODeMxp@cluster0.fk1u4fq.mongodb.net/decisionApp?retryWrites=true&w=majority',
    ),

    UserModule,
    MessagesModule,
  ],
})
export class AppModule {}

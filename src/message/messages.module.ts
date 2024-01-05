/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Messages, MessagesSchema } from '../../schemas/message.schema';
import { ProducerKafka } from '../../kafka/producerKafka';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Messages.name, schema: MessagesSchema },
    ]),

    AuthModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, ProducerKafka],
})
export class MessagesModule {}

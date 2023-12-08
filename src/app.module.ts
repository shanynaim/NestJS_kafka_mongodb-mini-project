import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerKafka } from 'kafka/producerKafka';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Messages, MessagesSchema } from '../schemas/message.schema'; // Assuming the correct path

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shany215sn:9i6dpOi2qYODeMxp@cluster0.fk1u4fq.mongodb.net/decisionApp?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: Messages.name, schema: MessagesSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ProducerKafka, MessagesService],
})
export class AppModule {}

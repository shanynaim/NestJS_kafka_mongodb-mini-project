/* eslint-disable @typescript-eslint/no-unused-vars */
// messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages, MessagesDocument } from '../schemas/message.schema';
import { ProducerKafka } from '../kafka/producerKafka';
import { UserService } from './user.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly userService: UserService,
    private readonly producerKafka: ProducerKafka,
    @InjectModel(Messages.name)
    private readonly messagesModel: Model<MessagesDocument>,
  ) {}

  async messageHandler(message: string) {
    console.log('in message handler');
    try {
      await this.producerKafka.produce({
        topic: 'incomingMessages',
        messages: [
          {
            value: message,
          },
        ],
      });

      console.log('message: ' + message + ' sent');

      const saved = await this.addDataToDB(message);

      return 'messsage ' + saved + ' saved';
    } catch (error) {
      console.log(error);
    }
  }

  async addDataToDB(message): Promise<any> {
    console.log('adding message to db :' + message);
    try {
      const createdMessage = new this.messagesModel({ message });
      console.log('message ' + createdMessage['message'] + ' created');
      createdMessage
        .save()
        .then((savedDocument) => {
          console.log('Document saved:', savedDocument);
        })
        .catch((error) => {
          console.error('Error saving document:', error);
        });

      return createdMessage['message'];
    } catch (error) {
      console.log(error);
    }
  }
}

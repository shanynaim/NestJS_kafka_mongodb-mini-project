/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProducerKafka } from '../kafka/producerKafka';
import { MessagesService } from './messages.service';

@Injectable() //@Injectable(): Decorator applied to the AppService class, indicating that it can be injected with dependencies.
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    private readonly producerKafka: ProducerKafka,
    private readonly messagesService: MessagesService,
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
    } catch (error) {
      console.log(error);
    }

    this.addDataToDB(message);
  }

  async addDataToDB(message): Promise<any> {
    console.log('adding message to db :' + message);
    const createdMessage = await this.messagesService.createMessage(message);
    console.log('Created message:', createdMessage);
  }
}

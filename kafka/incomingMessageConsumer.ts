import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerKafka } from './consumerKafka';

@Injectable()
export class IncomingMessagesConsumer implements OnModuleInit {
  constructor(private readonly consumerKafka: ConsumerKafka) {}

  public arrivedMessage: string = '';

  async onModuleInit() {
    console.log('init mmessageconsumer onModuleInit');
    try {
      await this.consumerKafka.consume(
        { topics: ['incomingMessages'] },
        {
          eachMessage: async ({ topic, partition, message }) => {
            console.log({
              value: message.value.toString(),
              topic: topic.toString(),
              partition: partition.toString(),
            });
            this.arrivedMessage = message.value.toString();
            console.log(this.arrivedMessage);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}

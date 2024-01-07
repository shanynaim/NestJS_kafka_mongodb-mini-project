/* eslint-disable prettier/prettier */
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerKafka implements OnApplicationShutdown {
  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  private readonly consumerConfig: ConsumerConfig = {
    groupId: 'nestjs-consumer',
  };

  private readonly consumer: Consumer = this.kafka.consumer(
    this.consumerConfig,
  );

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    await this.consumer.connect();
    await this.consumer.subscribe(topic);
    await this.consumer.run(config);
  }
}

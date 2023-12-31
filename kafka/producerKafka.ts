/* eslint-disable prettier/prettier */
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerKafka implements OnModuleInit, OnApplicationShutdown {
  async onApplicationShutdown() {
    console.log('kafka producer shutdown');
    await this.producer.disconnect();
  }

  async onModuleInit() {
    console.log('kafka producer on module init');
    await this.producer.connect();
  }

  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();

  async produce(record: ProducerRecord) {
    console.log('in produce message');
    await this.producer.send(record);
    console.log('message sent from producer');
  }
}

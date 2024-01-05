/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProducerKafka } from '../../kafka/producerKafka';

import { MessagesService } from './messages.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MessagesDocument, MessagesSchema } from '../../schemas/message.schema';
import mongoose, { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

describe('messagesService', () => {
  let messagesService: MessagesService;
  let producerKafkaMock: jest.Mocked<ProducerKafka>;
  let messagesModelMock: Model<MessagesDocument>;

  beforeEach(async () => {
    producerKafkaMock = { produce: jest.fn() } as any;
    messagesModelMock = {} as Model<MessagesDocument>;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/test'),
        MongooseModule.forFeature([
          { name: 'Messages', schema: MessagesSchema },
        ]),
      ],
      providers: [
        MessagesService,
        { provide: ProducerKafka, useValue: producerKafkaMock },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
  });

  it('should send message to kafka and save to db', async () => {
    const message = 'Test message';
    const expectedResult = 'message ' + message + ' saved';

    producerKafkaMock.produce.mockResolvedValueOnce();

    try {
      const result = await messagesService.messageHandler(message);

      expect(producerKafkaMock.produce).toHaveBeenCalledWith({
        topic: 'incomingMessages',
        messages: [{ value: message }],
      });

      expect(result).toBe(expectedResult);
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //write an it function the check scenario of failure:
  it('should failed to send message to kafka and return undefined', async () => {
    //make message to send
    const msg = 'this is test';

    //mock the produce of kafka to return reject
    producerKafkaMock.produce.mockRejectedValueOnce(msg);
    try {
      //call messagehandler
      const result = await messagesService.messageHandler(msg);
      //expect that producer kafka eas called withthe right parameters
      expect(producerKafkaMock.produce).toHaveBeenCalledWith({
        topic: 'incomingMessages',
        message: [{ value: msg }],
      });
      //expect that result is undefined
      expect(result).toBe(undefined);
    } catch (error) {
      console.log(error);
    }
  });
});

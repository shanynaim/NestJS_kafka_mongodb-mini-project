import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('messagesController', () => {
  let messagesController: MessagesController;
  let messagesServiceMock: jest.Mocked<MessagesService>;

  beforeEach(async () => {
    messagesServiceMock = { messageHandler: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    })
      .overrideProvider(MessagesService)
      .useValue(messagesServiceMock)
      .compile();

    messagesController = module.get<MessagesController>(MessagesController);
  });

  it('should handle message and return result', async () => {
    const mockMessage = 'Test message';

    const requestPayload = {
      message: mockMessage,
    };

    messagesServiceMock.messageHandler.mockResolvedValue(
      'message ' + mockMessage + ' saved',
    );

    // Pass the request payload to the controller method
    try {
      //@ts-expect-error requestPayload has a type mismatch
      const result = await messagesController.message(requestPayload);

      expect(messagesServiceMock.messageHandler).toHaveBeenCalledWith(
        mockMessage,
      );

      expect(result).toBe('message ' + mockMessage + ' saved');
    } catch (error) {
      console.log('error in test', error);
    }
  });
});

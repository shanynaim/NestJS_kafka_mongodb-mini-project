// messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages, MessagesDocument } from '../schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name)
    private readonly messagesModel: Model<MessagesDocument>,
    //This indicates that the model deals with documents conforming to the MessagesDocument type.
  ) {}

  async createMessage(message: string): Promise<MessagesDocument> {
    const createdMessage = new this.messagesModel({ message });
    return createdMessage.save();
  }
}

// messages.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Messages {
  @Prop({ required: true })
  message: string;
}

export type MessagesDocument = Messages & Document;
export const MessagesSchema = SchemaFactory.createForClass(Messages);

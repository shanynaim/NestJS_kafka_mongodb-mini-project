// messages.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Messages {
  @Prop({ required: true })
  message: string;
}

export type MessagesDocument = Messages & Document;
//export type MessagesDocument = Messages & Document;: This line exports a type alias MessagesDocument, which is a combination of the Messages class and the Document type. This type is used to represent documents in Mongoose.
//MessagesDocument. In TypeScript, you can use type aliases to create a new name for a type. In this case, MessagesDocument is intended to represent a document (a record or entry) in MongoDB associated with the Messages schema.
//By combining these two types, MessagesDocument is now a type that inherits properties from both the Messages class (representing your schema structure) and the Document type (providing methods and properties related to Mongoose documents). This type can then be used in your code to represent instances of documents in your MongoDB collection that adhere to the Messages schema. For example, if you were querying your MongoDB collection using Mongoose, the result of the query might have a type of MessagesDocument[].
export const MessagesSchema = SchemaFactory.createForClass(Messages);

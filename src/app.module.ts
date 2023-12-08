import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerKafka } from 'kafka/producerKafka';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Messages, MessagesSchema } from '../schemas/message.schema'; // Assuming the correct path

@Module({
  //decorator to the AppModule class. This decorator is used to define metadata for the module.

  //An array of other modules that should be imported into this module. Here, MongooseModule.forRoot is used to set up the MongoDB connection, and MongooseModule.forFeature is used to specify the Mongoose model (Messages) and its associated schema.
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shany215sn:9i6dpOi2qYODeMxp@cluster0.fk1u4fq.mongodb.net/decisionApp?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: Messages.name, schema: MessagesSchema },
    ]),

    //{ name: Messages.name, schema: MessagesSchema }: This object associates the Messages model with the MessagesSchema.
    //name: Messages.name: Mongoose automatically infers the model name from the class name (Messages).
    //schema: MessagesSchema: It specifies the schema to be used for the Messages model.
  ],
  controllers: [AppController],
  providers: [AppService, ProducerKafka, MessagesService],
})
export class AppModule {}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { join } from 'path';

//asynchronous function used to start the Nest.js application.
async function bootstrap() {
  //creates an instance of the Nest.js application by calling the create method of NestFactory. specifies the root module (AppModule) and the type of application (NestExpressApplication).
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // sets the base directory for views. It uses the join function to construct an absolute path to the 'views' directory relative to the current file.
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  //sets the view engine to 'hbs', which stands for Handlebars. Handlebars is a templating engine that allows you to embed variables in your HTML templates.
  app.setViewEngine('hbs');

  await app.listen(3000);

  // Create microservice
  // const microserviceApp =
  //   await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['localhost:9092'],
  //       },
  //     },
  //   });

  // // Start microserviceApp
  // await microserviceApp.listen();
}

bootstrap();

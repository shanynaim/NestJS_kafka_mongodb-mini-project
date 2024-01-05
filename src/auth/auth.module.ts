/* eslint-disable @typescript-eslint/no-unused-vars */
// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Auth0Strategy } from './auth0-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'auth0' }),
  ],
  providers: [Auth0Strategy],
})
export class AuthModule {}

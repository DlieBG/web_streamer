import { Module } from '@nestjs/common';
import { StreamModule } from './stream/stream.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
      },
      {
        path: 'stream',
        module: StreamModule
      }
    ]),
    DbModule,
    ApiModule,
    StreamModule
  ]
})
export class AppModule {}

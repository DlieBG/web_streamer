import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stream } from 'stream';
import { StreamSchema } from './schemas/stream.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Stream.name, schema: StreamSchema }
        ])
    ],
    exports: [
        MongooseModule
    ]
})
export class DbModule {}

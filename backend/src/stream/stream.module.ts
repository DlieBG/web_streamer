import { Module } from '@nestjs/common';
import { StreamController } from './controllers/stream/stream.controller';
import { StreamService } from './services/stream/stream.service';

@Module({
  controllers: [StreamController],
  providers: [StreamService]
})
export class StreamModule {}

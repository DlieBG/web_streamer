import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { StreamController } from './controllers/stream/stream.controller';
import { StreamService } from './services/stream/stream.service';

@Module({
  controllers: [StreamController],
  providers: [StreamService],
  imports: [DbModule]
})
export class StreamModule {}

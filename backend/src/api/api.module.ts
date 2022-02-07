import { Module } from '@nestjs/common';
import { StreamController } from './controllers/stream/stream.controller';
import { ViewerService } from './services/viewer/viewer.service';
import { SynchronizationService } from './services/synchronization/synchronization.service';
import { ChatController } from './controllers/chat/chat.controller';
import { ChatService } from './services/chat/chat.service';
import { StreamService } from './services/stream/stream.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [StreamController, ChatController],
  providers: [ViewerService, SynchronizationService, ChatService, StreamService],
  imports: [DbModule]
})
export class ApiModule {}

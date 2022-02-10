import { Module } from '@nestjs/common';
import { StreamController } from './controllers/stream/stream.controller';
import { ViewerService } from './services/viewer/viewer.service';
import { SynchronizationGateway } from './gateways/synchronization/synchronization.gateway';
import { ChatController } from './controllers/chat/chat.controller';
import { ChatService } from './services/chat/chat.service';
import { StreamService } from './services/stream/stream.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [StreamController, ChatController],
  providers: [ViewerService, SynchronizationGateway, ChatService, StreamService],
  imports: [DbModule]
})
export class ApiModule {}

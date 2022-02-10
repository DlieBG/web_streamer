import { WebSocketGateway, WebSocketServer, SubscribeMessage } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*'}, path: '/ws/' })
export class SynchronizationGateway {

  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage('subscribe')
  private onSubscription(client: Socket, id: string) {
    client.join(id);
  }

  synchronize(id: string, time: number) {
    this.server.to(id).emit('synchronize', time);
  }

}
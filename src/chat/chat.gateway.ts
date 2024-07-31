import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'group' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoinRequest(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('message')
  handleMessage(_: any, payload: { message: string; room: string }): void {
    console.log(payload);
    this.server.to(payload.room).emit('member', payload.message);
  }
}

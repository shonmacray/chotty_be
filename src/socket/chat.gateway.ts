import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { randomUUID } from 'crypto';

@WebSocketGateway({ namespace: 'group', cors: true })
export class ChatGateway {
  constructor(private chat: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoinRequest(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('message')
  handleMessage(_: any, payload: any): void {
    payload.id = randomUUID();

    this.server.to(payload.room).emit('member', payload);
    this.chat.saveChat({
      user_id: parseInt(payload.user_id),
      group_id: parseInt(payload.group_id),
      text: payload.text,
    });
  }
}

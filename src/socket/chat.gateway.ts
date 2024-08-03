import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat/chat.service';
import { randomUUID } from 'crypto';
import { UseGuards } from '@nestjs/common';
import { SocketGuard } from 'src/guards/socket.guard';

@WebSocketGateway({ namespace: 'group', cors: true })
export class ChatGateway {
  constructor(private chat: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoinRequest(client: Socket, room: string | string[]) {
    client.join(room);
  }

  @UseGuards(SocketGuard)
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    payload.id = randomUUID();
    this.server.to(payload.room).emit('member', payload);
    this.chat.saveChat({
      user_id: client.user.sub,
      group_id: parseInt(payload.group_id),
      text: payload.text,
    });
  }
}

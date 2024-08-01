import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
  imports: [ChatModule, PrismaModule],
})
export class SocketModule {}

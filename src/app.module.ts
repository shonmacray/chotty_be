import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ChatModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SocketModule,
    AuthModule,
  ],
})
export class AppModule {}

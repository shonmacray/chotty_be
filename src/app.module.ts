import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ChatModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}

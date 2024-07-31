import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [ChatModule, UserModule],
  providers: [ChatGateway],
})
export class AppModule {}

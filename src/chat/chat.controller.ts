import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chat: ChatService) {}

  @Get()
  async getAllGroups() {
    return this.chat.getAll();
  }

  @Get(':id')
  getAllChats(@Param('id') id: string) {
    return this.chat.getChats(id);
  }

  @Post()
  createGroup(@Body() data: any) {
    return this.chat.create(data);
  }

  @Post('join/:id')
  joinGroup(@Param('id') id: string, @Body() data: any) {
    return this.chat.join(id, data);
  }
}

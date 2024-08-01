import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chat: ChatService) {}

  @Get()
  async getAllGroups() {
    return this.chat.getAll();
  }
  // get all chats in a room
  @Get(':groupId')
  getAllChats(@Param('groupId', new ParseIntPipe()) id: number) {
    return this.chat.getChats(id);
  }

  @Post()
  createGroup(@Body() data: any) {
    return this.chat.create(data);
  }

  @Post('join/:groupId')
  joinGroup(
    @Param('groupId', new ParseIntPipe()) id: number,
    @Body() data: any,
  ) {
    return this.chat.join({ ...data, group_id: id });
  }
}

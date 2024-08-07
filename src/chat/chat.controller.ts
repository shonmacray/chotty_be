import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { CreateDto } from './dto/create.dto';

@Controller('chat')
export class ChatController {
  constructor(private chat: ChatService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllGroups(@Req() req: Request) {
    const { sub } = req['user'];
    return this.chat.getAll(sub);
  }
  // get all chats in a room
  @Get(':groupId')
  getAllChats(@Param('groupId', new ParseIntPipe()) id: number) {
    return this.chat.getChats(id);
  }

  @Post()
  createGroup(@Body() data: CreateDto) {
    return this.chat.create(data);
  }

  @Post('join/:groupId')
  @UseGuards(AuthGuard)
  joinGroup(
    @Param('groupId', new ParseIntPipe()) id: number,
    @Req() req: Request,
  ) {
    return this.chat.join({ user_id: req['user'].sub, group_id: id });
  }
}

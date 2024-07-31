import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async getAll() {
    return { groups: [] };
  }
  async create(data: any) {
    console.log(data);
    return { id: 'group id' };
  }
  async join(id: string, data: any) {
    console.log(id, data);
    return { id: 'user id' };
  }
  async saveChat(message: any) {
    console.log(message);
  }
  async getChats(id: string) {
    console.log(id);
    return { chats: [] };
  }
}

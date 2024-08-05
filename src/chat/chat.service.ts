import { Injectable } from '@nestjs/common';
import { Chat, Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number): Promise<Group[]> {
    const mysubscriptions = await this.prisma.userGroup.findMany({
      where: { user_id: userId },
    });
    const ids = mysubscriptions.map((sub) => sub.group_id);

    return await this.prisma.group.findMany({ where: { id: { notIn: ids } } });
  }
  async create(data: any) {
    console.log(data);
    return { id: 'group id' };
  }
  async join(data: any): Promise<{ created: boolean }> {
    const created = await this.prisma.userGroup.create({ data });
    if (created) {
      return { created: true };
    }
    return { created: false };
  }
  async saveChat(data: any) {
    await this.prisma.chat.create({ data });
  }
  async getChats(id: number): Promise<Chat[]> {
    return await this.prisma.chat.findMany({
      where: { group_id: id },
      orderBy: { created_at: 'asc' },
      include: { user: true },
    });
  }
}

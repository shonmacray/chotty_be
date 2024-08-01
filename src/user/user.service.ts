import { Injectable } from '@nestjs/common';
import { UserGroup, Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMyGroups(id: number): Promise<UserGroup[] & { group: Group }[]> {
    return await this.prisma.userGroup.findMany({
      where: { user_id: id },
      include: { group: true },
    });
  }
}

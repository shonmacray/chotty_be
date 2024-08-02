import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserGroup, Group, User, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({ where });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(`${error.meta.target[0]} already exists`);
      }
    }
  }

  async getMyGroups(id: number): Promise<UserGroup[] & { group: Group }[]> {
    return await this.prisma.userGroup.findMany({
      where: { user_id: id },
      include: { group: true },
    });
  }
}

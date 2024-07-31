import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getMyGroups(id: string) {
    console.log(id);

    return { groups: [] };
  }
}

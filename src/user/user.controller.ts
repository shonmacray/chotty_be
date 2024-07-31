import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @Get('groups')
  getGroups() {
    return this.user.getMyGroups('id');
  }
}

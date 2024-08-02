import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @UseGuards(AuthGuard)
  @Get('groups')
  getGroups(@Req() req: Request) {
    const { sub } = req['user'];
    return this.user.getMyGroups(sub);
  }
}

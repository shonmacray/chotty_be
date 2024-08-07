import { Controller, Get, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @UseGuards(AuthGuard)
  @Get('groups')
  getGroups(@Req() req: Request) {
    const { sub } = req['user'];
    return this.user.getMyGroups(sub);
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateUser(@Req() req: Request, @Body() data: UpdateDto) {
    const { sub } = req['user'];
    return this.user.updateUser({ id: sub }, data);
  }
}

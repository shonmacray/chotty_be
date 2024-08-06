import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private user: UserService,
    private jwt: JwtService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.user.getUser({ email_address: data.email_address });
    if (!user) {
      throw new NotFoundException();
    }

    const isMatch = await verify(user.hash, data.password);
    if (isMatch) {
      const payload = { sub: user.id, email_adress: user.email_address };
      return {
        user: { id: user.id },
        access_token: await this.jwt.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }

  @Post('signup')
  async signup(@Body() data: SignupDto) {
    const passwordHash = await hash(data.password);

    const { email_address, id } = await this.user.create({
      hash: passwordHash,
      first_name: data.first_name,
      last_name: data.last_name,
      email_address: data.email_address,
    });

    const payload = { sub: id, email_address };

    return {
      user: { id },
      access_token: await this.jwt.signAsync(payload),
    };
  }
}

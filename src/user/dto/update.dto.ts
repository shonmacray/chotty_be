import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum Color {
  blue = 'blue',
  green = 'green',
  orange = 'orange',
  yellow = 'yellow',
  lime = 'lime',
  teal = 'teal',
  cyan = 'cyan',
  violet = 'violet',
  pink = 'pink',
  rose = 'rose',
}

export class UpdateDto {
  @IsString()
  @IsOptional()
  first_name: string;
  @IsString()
  @IsOptional()
  last_name: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email_address: string;
  @IsEnum(Color)
  @IsOptional()
  color: Color;
}

import { IsString, IsEmail, IsOptional } from 'class-validator';

export class SyncUserDto {
  @IsString()
  sub: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  picture?: string;
}

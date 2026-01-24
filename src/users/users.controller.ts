import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { SyncUserDto } from './dto/sync-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sync')
  async syncUser(@Body() syncUserDto: SyncUserDto, @Request() req) {
    // Use Auth0 ID from JWT token, fallback to body for backward compatibility
    const auth0Id = req.user?.userId || syncUserDto.sub;
    const userData = {
      sub: auth0Id,
      email: syncUserDto.email || req.user?.email,
      name: syncUserDto.name || req.user?.name,
      picture: syncUserDto.picture || req.user?.picture,
    };
    return this.usersService.syncUser(userData);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SyncUserDto } from './dto/sync-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async syncUser(syncUserDto: SyncUserDto): Promise<User> {
    const { sub, email, name, picture } = syncUserDto;

    // Check if user exists by Auth0 ID
    let user = await this.usersRepository.findOne({ where: { auth0_id: sub } });

    if (user) {
      // Update existing user
      user.email = email;
      user.name = name;
      user.picture = picture;
      user = await this.usersRepository.save(user);
    } else {
      // Create new user
      user = this.usersRepository.create({
        auth0_id: sub,
        email,
        name,
        picture,
      });
      user = await this.usersRepository.save(user);
    }

    return user;
  }

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { auth0_id: auth0Id } });
  }
}

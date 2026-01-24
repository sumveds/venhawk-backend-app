import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    // Extract Auth0 user ID from JWT token
    const auth0UserId = req.user.userId; // This comes from the JWT token
    return this.projectsService.create(createProjectDto, auth0UserId);
  }
}

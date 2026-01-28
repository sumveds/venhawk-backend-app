import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { ClientIndustry } from './entities/client-industry.entity';
import { ProjectCategory } from './entities/project-category.entity';
import { ProjectFile } from '../files/entities/project-file.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ClientIndustry, ProjectCategory, ProjectFile]),
    UsersModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}

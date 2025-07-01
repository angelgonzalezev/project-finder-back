import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Organization } from './entities/project-organization.entity';
import { Position } from './entities/project-position.entity';
import { ProjectFaq } from './entities/project-faq.entity';
import { ProjectGoal } from './entities/project-goal.entity';
import { ProjectLeader } from './entities/project-leader.entity';
import { Skill } from './entities/project-skill.entity';
import { Specialty } from './entities/project-specialty.entity';
import { Budget } from './entities/project-budget.entity';
import { Subcategory } from './entities/project-subcategory.entity';
import { Industry } from './entities/project-industry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Organization,
      Position,
      ProjectFaq,
      ProjectGoal,
      ProjectLeader,
      Skill,
      Specialty,
      Budget,
      Subcategory,
      Industry,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

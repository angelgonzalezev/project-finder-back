import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';
import { Organization } from './projects/entities/project-organization.entity';
import { Position } from './projects/entities/project-position.entity';
import { ProjectFaq } from './projects/entities/project-faq.entity';
import { ProjectGoal } from './projects/entities/project-goal.entity';
import { ProjectLeader } from './projects/entities/project-leader.entity';
import { Skill } from './projects/entities/project-skill.entity';
import { Specialty } from './projects/entities/project-specialty.entity';
import { Budget } from './projects/entities/project-budget.entity';
import { Category } from './projects/entities/project-category.entity';
import { Subcategory } from './projects/entities/project-subcategory.entity';
import { Industry } from './projects/entities/project-industry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config accessible everywhere
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Category,
        Subcategory,
        Project,
        Organization,
        Position,
        ProjectFaq,
        ProjectGoal,
        ProjectLeader,
        Skill,
        Specialty,
        Budget,
        Industry,
      ],
    }),
    ProjectsModule,
  ],
})
export class AppModule {}

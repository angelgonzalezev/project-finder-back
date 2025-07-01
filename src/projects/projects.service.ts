import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import getProjectDetailsByIdQuery from './db/queries/getProjectDetailsById.query';
import { Position } from './entities/project-position.entity';
// import getProjectsQuery from './db/queries/getProjects.query';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,

    private readonly dataSource: DataSource,
  ) {}

  async getProjects(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: [
        'budget',
        'category',
        'faqs',
        'goals',
        'projectLeader',
        'organization',
        'positions',
        'positions.skills',
        'positions.specialties',
      ],
    });
  }

  async getPositions(): Promise<Position[]> {
    return this.positionRepository.find({
      relations: [
        'project',
        'skills',
        'specialties',
        'project.organization',
        'project.category',
        'project.subcategory',
        'project.budget',
      ],
    });
  }

  // async getProjects(): Promise<Project[]> {
  //   const result = await this.dataSource.query(getProjectsQuery);
  //   return result;
  // }

  async getProjectById(id: number): Promise<Project> {
    const result: Project[] = await this.dataSource.query(
      getProjectDetailsByIdQuery,
      [id],
    );
    return result[0];
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Project } from './entities/project-entity';
import getProjectDetailsByIdQuery from './db/queries/getProjectDetailsById.query';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly dataSource: DataSource,
  ) {}

  async getProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getProjectById(id: number): Promise<Project> {
    const result: Project[] = await this.dataSource.query(
      getProjectDetailsByIdQuery,
      [id],
    );
    return result[0];
  }
}

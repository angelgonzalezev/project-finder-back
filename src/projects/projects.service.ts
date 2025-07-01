import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import getProjectDetailsByIdQuery from './db/queries/getProjectDetailsById.query';
import { Position } from './entities/project-position.entity';
import { ProjectResponseDto, ProjectStatus } from './dto/project-response.dto';
import { Subcategory } from './entities/project-subcategory.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,

    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,

    private readonly dataSource: DataSource,
  ) {}

  private getSubcategories = async () => this.subcategoryRepository.find();

  async getProjects(): Promise<ProjectResponseDto[]> {
    const allProjects = await this.projectRepository.find({
      where: { status: ProjectStatus.PUBLISHED },
      relations: [
        'budget',
        'category',
        'faqs',
        'goals',
        'projectLeader',
        'organization',
        'organization.industry',
        'positions',
        'positions.skills',
        'positions.specialties',
      ],
    });

    const subcategories = await this.getSubcategories();

    const fixedProjects = allProjects.map((project: Project) => {
      const projectSubcategoryId = project.subcategory;
      const projectCategoryId = project.category.id;

      const subcategoryId = projectCategoryId * 100 + projectSubcategoryId;

      const _subcategory = subcategories.find(
        (subcat) => subcat.id === subcategoryId,
      );

      return { ...project, subcategory: _subcategory ?? null };
    });

    return fixedProjects;
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

  async getProjectById(id: number): Promise<Project> {
    const result: Project[] = await this.dataSource.query(
      getProjectDetailsByIdQuery,
      [id],
    );
    return result[0];
  }
}

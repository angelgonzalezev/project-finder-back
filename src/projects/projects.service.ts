import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Project } from './entities/project.entity';
import { Position } from './entities/project-position.entity';
import { ProjectResponseDto, ProjectStatus } from './dto/project-response.dto';
import { Subcategory } from './entities/project-subcategory.entity';
import { FilterGroupDto, FiltersRequestDto } from './dto/filters-request.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,

    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  private getSubcategories = async () => this.subcategoryRepository.find();

  private createBaseProjectQuery(): SelectQueryBuilder<Project> {
    return this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.budget', 'budget')
      .leftJoinAndSelect('project.category', 'category')
      .leftJoinAndSelect('project.faqs', 'faqs')
      .leftJoinAndSelect('project.goals', 'goals')
      .leftJoinAndSelect('project.projectLeader', 'projectLeader')
      .leftJoinAndSelect('project.organization', 'organization')
      .leftJoinAndSelect('organization.industry', 'industry')
      .leftJoinAndSelect('project.positions', 'positions')
      .leftJoinAndSelect('positions.skills', 'skills')
      .leftJoinAndSelect('positions.specialties', 'specialties')
      .where('project.status = :status', { status: ProjectStatus.PUBLISHED });
  }

  private applyFiltersToQuery(
    query: SelectQueryBuilder<Project>,
    filters: FilterGroupDto[],
  ): SelectQueryBuilder<Project> {
    const map: Record<string, string> = {
      skills: 'skills.id',
      specialties: 'specialties.id',
      categories: 'category.id',
      industries: 'industry.id',
    };

    for (const group of filters) {
      const ids = group.selectedFilters.map((f) => f.id);
      const operator = group.operator[0]?.name || 'o';
      const column = map[group.name];

      if (!column || ids.length === 0) continue;

      if (operator === 'o') {
        query.andWhere(`${column} IN (:...ids_${group.name})`, {
          [`ids_${group.name}`]: ids,
        });
      } else if (operator === 'y') {
        ids.forEach((id, i) => {
          query.andWhere(`${column} = :id_${group.name}_${i}`, {
            [`id_${group.name}_${i}`]: id,
          });
        });
      }
    }

    return query;
  }

  async getProjects(
    filtersDto?: FiltersRequestDto,
  ): Promise<ProjectResponseDto[]> {
    const filters = filtersDto?.filters ?? [];
    const order = filtersDto?.order ?? 'DESC';

    const query = this.createBaseProjectQuery();
    this.applyFiltersToQuery(query, filters);
    query.orderBy('project.publishedAt', order);

    const allProjects = await query.getMany();
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

  async getProjectById(id: number): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.find({
      where: { id },
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

    const fixedProject = project.map((project: Project) => {
      const projectSubcategoryId = project.subcategory;
      const projectCategoryId = project.category.id;

      const subcategoryId = projectCategoryId * 100 + projectSubcategoryId;

      const _subcategory = subcategories.find(
        (subcat) => subcat.id === subcategoryId,
      );

      return { ...project, subcategory: _subcategory ?? null };
    });

    return fixedProject[0];
  }
}

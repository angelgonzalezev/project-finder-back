import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ResponseDto } from 'src/dto/response.dto';
import { Project } from './entities/project.entity';
import { Position } from './entities/project-position.entity';

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('all')
  async getAllProjects(): Promise<ResponseDto<Project[]>> {
    try {
      const projects = await this.projectsService.getProjects();
      return { success: true, data: projects };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching projects',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  @Get('positions')
  async getPositions(): Promise<ResponseDto<Position[]>> {
    try {
      const projects = await this.projectsService.getPositions();
      return { success: true, data: projects };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching projects',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  @Get(':id')
  async getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<Project>> {
    try {
      const project = await this.projectsService.getProjectById(id);
      return { success: true, data: project };
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching project details',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

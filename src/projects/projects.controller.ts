import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ResponseDto } from 'src/dto/response.dto';
import { Position } from './entities/project-position.entity';
import { ProjectResponseDto } from './dto/project-response.dto';
import { FiltersRequestDto } from './dto/filters-request.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async getFilteredProjects(
    @Body() filtersDto: FiltersRequestDto,
  ): Promise<ResponseDto<ProjectResponseDto[]>> {
    try {
      const projects = await this.projectsService.getProjects(filtersDto);
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
  ): Promise<ResponseDto<ProjectResponseDto>> {
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

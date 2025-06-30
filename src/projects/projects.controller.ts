/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getAllProjects(): Promise<ResponseDto<any>> {
    try {
      const projects = await this.projectsService.getProjects();
      return { success: true, data: projects };
    } catch (error: any) {
      return { success: false, message: 'Error fetching projects', error };
    }
  }
}

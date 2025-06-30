import { Injectable } from '@nestjs/common';
import mockProjects from 'src/mockData/mockProjects';
import { Project } from './dto/project';

@Injectable()
export class ProjectsService {
  private projects = mockProjects;

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }
}

import { ProjectGoal } from '../entities/project-goal.entity';
import { Industry } from '../entities/project-industry.entity';
import { Category } from './category';
import { Skill } from './skill';
import { Specialty } from './specialty';
import { SubCategory } from './subcategory';

export interface ProjectResponseDto {
  id: number;
  title: string;
  organization: ProjectOrganization;
  projectLeader: ProjectLeader;
  category: Category;
  subcategory?: SubCategory | null;
  startDate: Date;
  budget: ProjectBudget;
  totalHours: number;
  description: string;
  goals: ProjectGoal[];
  faqs: ProjectFaq[];
  status: string;
  creationDate: Date;
  positions: ProjectPosition[];
  totalApplicationsAmount: number;
  publishedAt: Date | null;
}

export interface ProjectPosition {
  id: number;
  project?: any;
  title: string;
  skills: Skill[];
  specialties: Specialty[];
  referralBonus: number | string | null;
}

export interface ProjectFaq {
  question: string;
  answer: string;
}

export interface ProjectBudget {
  hourFrom: number | null;
  hourTo: number | null;
  total: number | null;
}

export interface ProjectLeader {
  id: number;
  name: string;
  lastName: string;
}

export interface ProjectOrganization {
  id: number;
  name: string;
  logo: string;
  industry: Industry;
}

export enum ProjectStatus {
  PUBLISHED = 'PUBLISHED',
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

import { Category } from './category';
import { SubCategory } from './subcategory';

export interface Project {
  id: number;
  title: string;
  organization: ProjectOrganization;
  projectLeader: ProjectLeader;
  category: Category;
  subcategory: SubCategory;
  startDate: string;
  budget: ProjectBudget;
  totalHours: number;
  description: string;
  goals: string[];
  faqs: ProjectFaq[];
  status: string;
  creationDate: string;
  positions: ProjectPosition[];
  totalApplicationsAmount: number;
  publishedAt: string | null;
}

export interface ProjectPosition {
  id: number;
  title: string;
  skills: number[];
  specialties: number[];
  referralBonus: number | null;
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
  industry: number;
}

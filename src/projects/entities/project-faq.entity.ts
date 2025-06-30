import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('project_faqs')
export class ProjectFaq {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.faqs)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  question: string;

  @Column()
  answer: string;
}

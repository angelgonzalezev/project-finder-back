import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project-entity';

@Entity()
export class ProjectFaq {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.faqs)
  project: Project;

  @Column()
  question: string;

  @Column()
  answer: string;
}

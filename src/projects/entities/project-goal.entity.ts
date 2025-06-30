import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project-entity';

@Entity()
export class ProjectGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.goals)
  project: Project;

  @Column('text')
  goal: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('project_goals')
export class ProjectGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.goals)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column('text')
  goal: string;
}

import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('budgets')
export class Budget {
  @PrimaryColumn({ name: 'project_id' })
  projectId: number;

  @OneToOne(() => Project, (project) => project.budget, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'hour_from' })
  hourFrom: number;

  @Column({ name: 'hour_to' })
  hourTo: number;

  @Column('decimal')
  total: number;
}

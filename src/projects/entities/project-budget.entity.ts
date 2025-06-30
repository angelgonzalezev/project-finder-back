import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project-entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Project, (project) => project.budget)
  @JoinColumn()
  project: Project;

  @Column()
  hourFrom: number;

  @Column()
  hourTo: number;

  @Column('decimal')
  total: number;
}

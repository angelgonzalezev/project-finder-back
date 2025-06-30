import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from './project-entity';
import { Skill } from './project-skill.entity';
import { Specialty } from './project-specialty.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.positions)
  project: Project;

  @Column()
  title: string;

  @Column('decimal')
  referralBonus: number;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @ManyToMany(() => Specialty)
  @JoinTable()
  specialties: Specialty[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Skill } from './project-skill.entity';
import { Specialty } from './project-specialty.entity';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.positions)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  title: string;

  @Column('decimal', { name: 'referral_bonus' })
  referralBonus: number;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'position_skills',
    joinColumn: { name: 'position_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'position_specialties',
    joinColumn: { name: 'position_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialty_id', referencedColumnName: 'id' },
  })
  specialties: Specialty[];
}

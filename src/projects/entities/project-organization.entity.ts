import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { Industry } from './project-industry.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToOne(() => Industry)
  @JoinColumn({ name: 'industry_id' })
  industry: Industry;

  @OneToMany(() => Project, (project) => project.organization)
  projects: Project[];
}

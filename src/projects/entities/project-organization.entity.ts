import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from './project.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ name: 'industry_id', nullable: true })
  industryId: number;

  @OneToMany(() => Project, (project) => project.organization)
  projects: Project[];
}

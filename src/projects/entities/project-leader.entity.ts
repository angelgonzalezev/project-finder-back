import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from './project.entity';

@Entity('project_leaders')
export class ProjectLeader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @OneToMany(() => Project, (project) => project.projectLeader)
  projects: Project[];
}

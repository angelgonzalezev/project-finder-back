import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from './project-entity';

@Entity()
export class ProjectLeader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => Project, (project) => project.projectLeader)
  projects: Project[];
}

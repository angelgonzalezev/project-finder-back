import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Organization } from './project-organization.entity';

@Entity('industries')
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Organization, (org) => org.industry)
  industry: Organization[];
}

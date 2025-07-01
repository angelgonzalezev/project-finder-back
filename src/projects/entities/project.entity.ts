import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Organization } from './project-organization.entity';
import { ProjectLeader } from './project-leader.entity';
import { Budget } from './project-budget.entity';
import { ProjectGoal } from './project-goal.entity';
import { ProjectFaq } from './project-faq.entity';
import { Position } from './project-position.entity';
import { Category } from './project-category.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Organization, (org) => org.projects)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => ProjectLeader, (leader) => leader.projects)
  @JoinColumn({ name: 'project_leader_id' })
  projectLeader: ProjectLeader;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'subcategory_id' })
  subcategory: number;

  @Column({ name: 'start_date', type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @Column('text')
  description: string;

  @Column()
  status: string;

  @Column({ name: 'total_hours', nullable: true })
  totalHours: number;

  @Column({ name: 'total_applications_amount', nullable: true })
  totalApplicationsAmount: number;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;

  @OneToOne(() => Budget, (b) => b.project)
  budget: Budget;

  @OneToMany(() => ProjectGoal, (g) => g.project)
  goals: ProjectGoal[];

  @OneToMany(() => ProjectFaq, (f) => f.project)
  faqs: ProjectFaq[];

  @OneToMany(() => Position, (pos) => pos.project)
  positions: Position[];
}

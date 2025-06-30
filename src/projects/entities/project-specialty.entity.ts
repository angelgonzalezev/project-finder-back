import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}

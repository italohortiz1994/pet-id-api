import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('health_records')
export class HealthRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  petId!: string;

  @Column()
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string | null;

  @Column()
  type!: string; // VACCINE | EXAM | CONSULTATION

  @Column({ type: 'timestamp', nullable: true })
  date!: Date | null;

  @Column({ type: 'varchar', nullable: true })
  fileUrl!: string | null; // exame, receita, etc

  @CreateDateColumn()
  createdAt!: Date;
}

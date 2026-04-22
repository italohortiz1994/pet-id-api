import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaccines')
export class Vaccine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  petId!: string;

  @Column()
  name!: string;

  @Column({ type: 'timestamp' })
  applicationDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextDoseDate!: Date | null;

  @Column({ type: 'varchar', nullable: true })
  veterinarianName!: string | null;

  @Column({ type: 'varchar', nullable: true })
  clinicName!: string | null;

  @Column({ type: 'varchar', nullable: true })
  notes!: string | null;
}

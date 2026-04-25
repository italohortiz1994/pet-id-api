import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pet_news')
export class PetNews {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  petId!: string | null;

  @Column()
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  summary!: string | null;

  @Column({ type: 'text', nullable: true })
  content!: string | null;

  @Column({ type: 'varchar', nullable: true })
  imageUrl!: string | null;

  @Column({ type: 'varchar', nullable: true })
  category!: string | null;

  @Column({ type: 'varchar', nullable: true })
  sourceName!: string | null;

  @Column({ type: 'varchar', nullable: true })
  sourceUrl!: string | null;

  @Column({ type: 'boolean', default: true })
  isPublished!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

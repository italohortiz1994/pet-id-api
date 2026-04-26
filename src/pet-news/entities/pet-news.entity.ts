import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PetComment } from '../../pet-comments/entities/pet-comment.entity';
import { PetNewsImage } from '../../pet-news-images/entities/pet-news-image.entity';
import { Pet } from '../../pets/entities/pet.entity';
import { PetNewsLike } from './pet-news-like.entity';

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

  @Column({ type: 'integer', default: 0 })
  likesCount!: number;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @ManyToOne(() => Pet, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'petId' })
  pet!: Pet | null;

  @OneToMany(() => PetComment, (comment) => comment.news)
  commentItems!: PetComment[];

  @OneToMany(() => PetNewsImage, (image) => image.news)
  images!: PetNewsImage[];

  @OneToMany(() => PetNewsLike, (like) => like.news)
  likeItems!: PetNewsLike[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetNews } from '../../pet-news/entities/pet-news.entity';

@Entity('pet_news_images')
export class PetNewsImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  newsId!: number;

  @Column()
  imageUrl!: string;

  @Column({ type: 'varchar', nullable: true })
  caption!: string | null;

  @Column({ default: 0 })
  sortOrder!: number;

  @ManyToOne(() => PetNews, (news) => news.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'newsId' })
  news!: PetNews;

  @CreateDateColumn()
  createdAt!: Date;
}

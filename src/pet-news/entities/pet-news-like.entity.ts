import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PetNews } from './pet-news.entity';

@Entity('pet_news_likes')
@Unique('UQ_pet_news_likes_news_user', ['newsId', 'userId'])
export class PetNewsLike {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  newsId!: number;

  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => PetNews, (news) => news.likeItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'newsId' })
  news!: PetNews;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from '../../pets/entities/pet.entity';
import { PetFriendshipStatus } from '../enums/pet-friendship-status.enum';

@Entity('pet_friendships')
export class PetFriendship {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid' })
  requesterPetId!: string;

  @Column({ type: 'uuid' })
  addresseePetId!: string;

  @Column({
    type: 'varchar',
    default: PetFriendshipStatus.PENDING,
  })
  status!: PetFriendshipStatus;

  @ManyToOne(() => Pet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'requesterPetId' })
  requesterPet!: Pet;

  @ManyToOne(() => Pet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'addresseePetId' })
  addresseePet!: Pet;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

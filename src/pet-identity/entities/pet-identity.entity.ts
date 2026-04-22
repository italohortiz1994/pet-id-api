import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pet_identities')
export class PetIdentity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  publicId!: string; // as PET-ABC123

  @Column()
  petId!: string; // reference to the pet

  @Column({ default: true })
  isPublic!: boolean;

  @Column({ default: 'ACTIVE' })
  status!: 'ACTIVE' | 'LOST' | 'FOUND';

  @Column({ nullable: true })
  qrCodeUrl!: string;

  @Column({ nullable: true })
  publicUrl!: string;

  @Column({ default: false })
  showOwnerContact!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

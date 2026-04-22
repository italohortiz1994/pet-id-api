import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn('identity')
  id!: string;

  @Column()
  name!: string;

  @Column()
  breed!: string;

  @Column()
  age!: number;

  @Column()
  gender!: string;

  @CreateDateColumn()
  createdAt!: Date;
}

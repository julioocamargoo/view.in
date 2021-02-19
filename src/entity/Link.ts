import {
  Entity, PrimaryGeneratedColumn, Column, Index,
} from 'typeorm';

@Entity()
export default class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  alias!: string;

  @Column()
  url!: string;
}

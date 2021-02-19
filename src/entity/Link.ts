import {
  Entity, PrimaryGeneratedColumn, Column, Index,
} from 'typeorm';

@Entity('links')
export default class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  alias!: string;

  @Column()
  url!: string;
}

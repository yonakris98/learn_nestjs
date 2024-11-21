//TypeORM entity for Books table

import { Rental } from 'src/rentals/rentals.entities/rentals.entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn() // will be an auto-incrementing integer (e.g., 1, 2, 3, ...).
  // @PrimaryGeneratedColumn('uuid') -> When 'uuid' is specified, id will be a UUID (e.g., 550e8400-e29b-41d4-a716-446655440000).
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @Column({ default: 0 })
  borrowed_count: number;

  @OneToMany(() => Rental, (rental) => rental.book)
  rentals: Rental[];
}

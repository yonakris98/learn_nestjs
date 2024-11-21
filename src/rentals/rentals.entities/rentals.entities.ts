import { Book } from 'books/entities/book.entity';
import { User } from 'users/entities/users.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

/* 

This line defines a Many-to-One relationship between the Rental entity and the Book entity. Here's a simple explanation:

@ManyToOne: Means that many rentals can be associated with one book. For example, many users can rent the same book.

(() => Book): Specifies the related entity, which is Book.

(book) => book.rentals: Refers to the rentals property in the Book entity. This defines the reverse relation (a book can have multiple rentals).

{ onDelete: 'CASCADE' }: Ensures that if a book is deleted, all related rentals are automatically deleted as well.
example : All rows in the Rentals table where book_id = 1 will also be deleted.
*/

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.rentals, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, (book) => book.rentals, { onDelete: 'CASCADE' })
  book: Book;

  @Column({ type: 'timestamp' })
  rental_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  return_date: Date;
}

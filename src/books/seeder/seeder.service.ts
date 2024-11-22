//Seeder for populating books

/* 
  Constructor:
    The constructor is a special method in a class that gets called when an instance of the class is created. In this case, it initializes the service with the Book repository.

    @InjectRepository(Book):
    This decorator tells NestJS to inject a TypeORM repository for the Book entity.
    The InjectRepository decorator works with the TypeOrmModule.forFeature([Book]) import in the module to provide the repository.

    private readonly bookRepository: Repository<Book>:
    The injected Repository<Book> is assigned to the bookRepository property.
    The Repository<Book> is a TypeORM repository, which provides methods to interact with the database (e.g., find, save, delete, etc.).
  */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'books/entities/book.entity';
import { User } from 'users/entities/users.entities';
import { Rental } from 'rentals/rentals.entities/rentals.entities';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async seed(): Promise<void> {
    // Seed books
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        stock: 10,
        borrowed_count: 5,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        stock: 8,
        borrowed_count: 2,
      },
      { title: '1984', author: 'George Orwell', stock: 15, borrowed_count: 7 },
      {
        title: 'Moby Dick',
        author: 'Herman Melville',
        stock: 5,
        borrowed_count: 1,
      },
    ];

    const users: Partial<User>[] = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'active',
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        status: 'inactive',
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        status: 'active',
      },
      {
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        status: 'inactive',
      },
      {
        name: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        status: 'active',
      },
    ];

    for (const book of books) {
      const existingBook = await this.bookRepository.findOne({
        where: { title: book.title },
      });
      if (!existingBook) {
        await this.bookRepository.save(book);
      }
    }

    for (const user of users) {
      const existingUser = await this.userRepository.findOne({
        where: { name: user.name },
      });
      if (!existingUser) {
        await this.userRepository.save(user);
      }
    }

    const rentalData = [
      {
        userName: 'John Doe',
        bookTitle: 'The Great Gatsby',
        rentalDate: new Date('2024-01-01T10:00:00Z'),
        returnDate: new Date('2024-01-08T10:00:00Z'),
      },
      {
        userName: 'Jane Smith',
        bookTitle: 'To Kill a Mockingbird',
        rentalDate: new Date('2024-02-01T14:00:00Z'),
        returnDate: new Date('2024-02-07T14:00:00Z'),
      },
      {
        userName: 'Alice Johnson',
        bookTitle: '1984',
        rentalDate: new Date('2024-03-01T09:30:00Z'),
        returnDate: new Date('2024-03-06T09:30:00Z'),
      },
    ];

    for (const rental of rentalData) {
      const user = await this.userRepository.findOne({
        where: { name: rental.userName },
      });
      const book = await this.bookRepository.findOne({
        where: { title: rental.bookTitle },
      });

      if (user && book) {
        const existingRental = await this.rentalRepository.findOne({
          where: {
            user: { id: user.id },
            book: { id: book.id },
          },
        });

        if (!existingRental) {
          await this.rentalRepository.save({
            user,
            book,
            rental_date: rental.rentalDate,
            return_date: rental.returnDate,
          });
        }
      }
    }

    console.log('Seeding completed for Books, Users, and Rentals!');
  }
}
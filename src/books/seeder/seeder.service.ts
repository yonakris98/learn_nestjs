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
import { Book } from '../entities/book.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async seed(): Promise<void> {
    // Data awal untuk tabel Books
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

    for (const book of books) {
      // Cek apakah buku sudah ada
      const existingBook = await this.bookRepository.findOne({
        where: { title: book.title },
      });
      if (!existingBook) {
        await this.bookRepository.save(book);
      }
    }

    console.log('Books seeding completed!');
  }
}

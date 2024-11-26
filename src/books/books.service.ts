// Service for business logic

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/users.entities';
import { Rental } from 'rentals/rentals.entities/rentals.entities';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getBooks(): Promise<Book[]> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    return await queryBuilder.getMany();
  }
}

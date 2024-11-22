// Service for business logic

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { QueryBuilder, Repository } from 'typeorm';

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

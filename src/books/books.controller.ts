//Controller for handling requests

import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks(
    @Query('status') status?: string,
    @Query('stock') stock?: string,
  ) {
    return this.bookService.getBooks();
  }
}

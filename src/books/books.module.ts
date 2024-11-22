// Module file that encapsulates the books feature

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { BooksController } from './books.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {} // acts as a container for organizing and grouping related components, such as services and entities.
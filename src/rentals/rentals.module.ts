import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rentals.entities/rentals.entities';
import { RentalsService } from './rentals.service';
import { Book } from 'books/entities/book.entity';
import { User } from 'users/entities/users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Rental,Book,User])],
  providers: [RentalsService],
  exports : [RentalsService],
})
export class RentalsModule {}

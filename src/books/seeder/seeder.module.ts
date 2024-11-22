import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Book } from '../entities/book.entity';
import { User } from 'users/entities/users.entities';
import { Rental } from 'rentals/rentals.entities/rentals.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Rental])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {} //acts as a container for organizing and grouping related components, such as services and entities.

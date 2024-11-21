import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Book } from '../entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {} //acts as a container for organizing and grouping related components, such as services and entities.

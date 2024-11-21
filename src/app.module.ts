import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederModule } from './books/seeder/seeder.module';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';
import { TestModule } from './test/test.module';
import { Book } from 'books/entities/book.entity';
import { Rental } from 'rentals/rentals.entities/rentals.entities';
import { User } from 'users/entities/users.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'postgres',
      entities: [Book, Rental, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book, Rental, User]),
    SeederModule,
    UsersModule,
    RentalsModule,
    BooksModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

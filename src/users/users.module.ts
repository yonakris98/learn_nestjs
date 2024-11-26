import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entities';
import { Rental } from 'rentals/rentals.entities/rentals.entities';

@Module({
  providers: [UsersService],
  controllers: [UserController],
  imports : [TypeOrmModule.forFeature([User,Rental])],
})
export class UsersModule {}

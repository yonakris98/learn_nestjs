import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  getUsers(arg0: { status: string; name: string; }) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(filter: { status?: string; name?: string }) {
    const query = this.userRepository.createQueryBuilder('user');

    if (filter.status) {
      query.andWhere('user.status = :status', { status: filter.status });
    }

    if (filter.name) {
      query.andWhere('user.name = :name', { name: filter.name });
    }

    query.orderBy('user.id', 'ASC');

    return query.getMany();
  }
}

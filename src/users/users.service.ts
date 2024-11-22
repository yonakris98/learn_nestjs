import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';

/*
GetUsersFilterDto: This is a simple interface that defines the optional query parameters status and name that can be used to filter the results.
getUsers method:

This method takes the filters object, which contains status and name.

It uses TypeORM's createQueryBuilder to construct a dynamic query.

If status is provided, it filters by status.

If name is provided, it filters by name using a LIKE query to allow partial matches.

Finally, it executes the query using getMany() to return an array of users that match the filters.
*/

interface GetUsersFilterDto {
  status?: string;
  name?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(filters: GetUsersFilterDto): Promise<User[]> {
    const { status, name } = filters;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (status) {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    if (name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    return await queryBuilder.getMany();
  }

  async getUserWithRentals(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['rentals'], // nama di @Entity
    });
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> { // Promise = future
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    }); //check duplicate
  
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
  
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user); // if user exist update, not exist insert
  }
  

  async editUser(createUserDto: CreateUserDto, id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({id});

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    Object.assign(user,createUserDto);
    return this.userRepository.save(user);
  }
}

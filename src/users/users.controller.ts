import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('status') status?: string, // Optional status filter
    @Query('name') name?: string,     // Optional name filter
  ) {
    return this.userService.getUsers({ status, name });
  }
}
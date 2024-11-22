import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('status') status?: string, // Optional status filter
    @Query('name') name?: string, // Optional name filter
  ) {
    return this.userService.getUsers({ status, name });
  }

  @Get('rentals/:id')
  async getUserWithRentalDetails(@Param('id') userId: number) {
    return this.userService.getUserWithRentals(userId);
  }

  @Post('add')
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Put('edit/:id')
  async editUser(
    @Body() createUserDto: CreateUserDto,
    @Param('id') userId: number,
  ) {
    return this.userService.editUser(createUserDto, userId);
  }
}

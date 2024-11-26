import { Body, Controller, Get, Post } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentBookDto } from './dto/rent-book.dto';
import { RentListDto } from './dto/rent-list.dto';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalService: RentalsService) {}

  @Post()
  async addRental(@Body() createRentalDto: RentBookDto) {
    return this.rentalService.addRental(createRentalDto);
  }

  @Get()
  async getDashboard() {
    return this.rentalService.getDashboardData();
  }

  @Get('list')
  async listRental(@Body() rentListDto: RentListDto) {
    return this.rentalService.getRental(rentListDto);
  }

  @Get('late')
  async getUsersWithLateReturns() {
    return this.rentalService.getLateReturnStats();
  }
}

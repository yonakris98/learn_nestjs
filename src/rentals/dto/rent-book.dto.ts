import { IsDateString, IsNumber } from 'class-validator';

export class RentBookDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;

  @IsDateString()
  rental_date: string;
}

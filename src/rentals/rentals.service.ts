import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rentals.entities/rentals.entities';
import { Repository } from 'typeorm';
import { RentBookDto } from './dto/rent-book.dto';
import { User } from 'users/entities/users.entities';
import { Book } from 'books/entities/book.entity';
import { RentListDto } from './dto/rent-list.dto';
import { FilterStatusDto } from 'global_variable';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async addRental(createRentalDto: RentBookDto): Promise<Rental> {
    const { userId, bookId, rental_date } = createRentalDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    console.log(user);

    // Find book
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    console.log(book);

    // Ensure the book is available
    if (
      await this.rentalRepository.findOne({
        where: { book, return_date: null },
      })
    ) {
      throw new BadRequestException(
        `Book with ID ${bookId} is already rented by other user`,
      );
    }

    // Create and save rental
    const rental = this.rentalRepository.create({
      user,
      book,
      rental_date: new Date(rental_date),
    });

    console.log(rental);

    return this.rentalRepository.save(rental);
  }

  async getRental(rentListDto: RentListDto): Promise<Rental[]> {
    const queryBuilder = this.rentalRepository.createQueryBuilder('rental');

    // Filter by user
    //   if (userId) {
    //     queryBuilder.andWhere('rental.userId = :userId', { userId });
    //   }

    // Filter by start_date
    if (rentListDto.start_date) {
      const convertStartDate = new Date(rentListDto.start_date);
      queryBuilder.andWhere('rental.rental_date >= :start_date', {
        start_date: convertStartDate,
      });
    }

    // Filter by end_date
    if (rentListDto.end_date) {
      const convertEndDate = new Date(rentListDto.end_date);
      queryBuilder.andWhere('rental.return_date <= :end_date', {
        end_date: convertEndDate,
      });
    }

    // Filter by status
    if (rentListDto.status) {
      switch (rentListDto.status) {
        case FilterStatusDto.expired:
          queryBuilder.andWhere('rental.return_date < CURRENT_TIMESTAMP');
          break;
        case FilterStatusDto.on_schedule:
          queryBuilder.andWhere('rental.rental_date > CURRENT_TIMESTAMP');
          break;
        case FilterStatusDto.on_time:
          queryBuilder.andWhere(
            'rental.rental_date <= CURRENT_TIMESTAMP AND rental.return_date >= CURRENT_TIMESTAMP',
          );
          break;
        case FilterStatusDto.borrowing:
          queryBuilder.andWhere('rental.return_date IS NULL');
          break;
        case FilterStatusDto.done:
          queryBuilder.andWhere('rental.return_date IS NOT NULL');
          break;
        default:
          break;
      }
    }

    return await queryBuilder.getMany();
  }

  async getLateReturnStats(): Promise<{
    countUserLateReturn: number;
    shortestLateDays: number;
    longestLateDays: number;
  }> {
    const query = `
      SELECT
        COUNT(DISTINCT r.user_id) AS "countUserLateReturn",
        MIN(EXTRACT(DAY FROM r.return_date - r.due_date)) AS "shortestLateDays",
        MAX(EXTRACT(DAY FROM r.return_date - r.due_date)) AS "longestLateDays"
      FROM rentals r
      WHERE r.return_date > r.due_date;
    `;

    const result = await this.rentalRepository.query(query);
    return {
      countUserLateReturn: parseInt(result[0]?.countUserLateReturn || 0),
      shortestLateDays: parseFloat(result[0]?.shortestLateDays || 0),
      longestLateDays: parseFloat(result[0]?.longestLateDays || 0),
    };
  }

  async getDashboardData(): Promise<{
    lateLessThanAWeek: number;
    onTime: number;
    stillBorrowed: number;
  }> {
    /* 
    SELECT
        -- Count of users who returned books less than a week late
        COUNT(DISTINCT CASE
            WHEN r.return_date IS NOT NULL AND r.return_date > r.due_date AND r.return_date <= r.due_date + INTERVAL '7 days'
            THEN r.user_id
        END) AS "countUsersLateLessThanWeek",
        
        -- Count of users who returned books on time (or earlier)
        COUNT(DISTINCT CASE
            WHEN r.return_date IS NOT NULL AND r.return_date <= r.due_date
            THEN r.user_id
        END) AS "countUsersOnTime",
        
        -- Count of books not returned yet
        COUNT(CASE
            WHEN r.return_date IS NULL
            THEN r.book_id
        END) AS "countBooksNotReturned"
        FROM rentals r;
    */
    const query = `
    SELECT
      COUNT(DISTINCT CASE
        WHEN r.return_date IS NOT NULL AND r.return_date > r.due_date AND r.return_date <= r.due_date + INTERVAL '7 days'
        THEN r.user_id
      END) AS "countUsersLateLessThanWeek",
      COUNT(DISTINCT CASE
        WHEN r.return_date IS NOT NULL AND r.return_date <= r.due_date
        THEN r.user_id
      END) AS "countUsersOnTime",
      COUNT(CASE
        WHEN r.return_date IS NULL
        THEN r.book_id
      END) AS "countBooksNotReturned"
    FROM rentals r;
  `;

    const result = await this.rentalRepository.query(query);
    return result[0];
  }
}

import { IsString } from 'class-validator';
import { FilterStatusDto } from 'global_variable';

export class RentListDto {
  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  status: FilterStatusDto;
}

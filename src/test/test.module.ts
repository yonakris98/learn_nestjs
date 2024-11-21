import { Module } from '@nestjs/common';
import { SeederModuleService } from './seeder.module/seeder.module.service';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rental } from 'rentals/rentals.entities/rentals.entities';

enum CardinalDirections {
  North,
  East,
  South,
  West
}

@Module({
  providers: [SeederModuleService]
})
@Entity('test')
export class TestModule {
  @PrimaryGeneratedColumn()
  id : number;

  @Column({type : 'timestamp'})
  test_date : Date;

  @Column({type : 'varchar', length : 255})
  name : string

  @Column({type : 'enum' , enum: CardinalDirections, default : CardinalDirections.East})
  direction : CardinalDirections;

  @ManyToMany(()=> Rental, (rental) => rental.user)
  rentals : Rental[]
}

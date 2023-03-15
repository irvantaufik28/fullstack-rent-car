import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  id: number;

  @IsOptional()
  total_price: number;

  @IsNotEmpty({ message: 'start_rent_at cannot be empty' })
  // @IsDate({ message: 'start_rent_at must be a valid Date' })
  start_rent_at: Date;

  @IsNotEmpty({ message: 'finish_rent_at cannot be empty' })
  // @IsDate({ message: 'finish_rent_at must be a valid Date' })
  finish_rent_at: Date;

  @IsOptional()
  status: Boolean;

  @IsOptional()
  slip: string;

  @IsOptional()
  UserId: number

  @IsOptional()
  CarId: number
}
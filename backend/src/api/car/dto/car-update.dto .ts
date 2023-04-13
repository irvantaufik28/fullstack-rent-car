import { IsIn, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsOptional ()
  id: number;

  @IsOptional({ message: 'Category cannot be empty' })
  name: string;

  @IsOptional({ message: 'Category cannot be empty' })
  @IsIn(['small', 'medium', 'large'], {
    message: 'Category must be small, medium, or large',
  })

  @IsOptional ()
  category: string;

  @IsOptional()
  status: boolean

  @IsOptional({ message: 'Price cannot be empty' })
  price: number;

  @IsOptional()
  image: string;
  
}

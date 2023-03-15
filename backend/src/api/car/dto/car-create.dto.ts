import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsOptional ()
  id: number;

  @IsNotEmpty({ message: 'Category cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsIn(['small', 'medium', 'large'], {
    message: 'Category must be small, medium, or large',
  })

  @IsOptional ()
  category: string;

  @IsOptional()
  status: boolean

  @IsNotEmpty({ message: 'Price cannot be empty' })
  price: number;

  @IsOptional()
  image: string;
  
}

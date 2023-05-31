import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSlipDto {
  @IsOptional ()
  id: number;

  @IsOptional()
  user_id : number

  @IsNotEmpty()
  order_id : number

  @IsOptional ()
  url_slip: string

  
}

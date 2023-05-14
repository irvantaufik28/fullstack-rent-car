import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Order } from "./constants/enum";

export class PageOrderOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly take?: number = 10;

  @Type(()=> String)
  @IsOptional()
  readonly q?:string;

  @Type(()=> String)
  @IsOptional()
  readonly email?:string;
 
  @Type(()=> String)
  @IsOptional()
  readonly start_rent_at?:string;

  @Type(()=> String)
  @IsOptional()
  readonly finish_rent_at?:string;
  
  @Type(()=> String)
  @IsOptional()
  readonly category?:string;
  
  @Type(()=> String)
  @IsOptional()
  readonly total_price?:string;
    
  @Type(()=> String)
  @IsOptional()
  readonly orderBy?:string;
  
  @Type(()=> String)
  @IsOptional()
  readonly createdAt?:string;
  
  @Type(()=> String)
  @IsOptional()
  readonly updateAt?:string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
import { IsOptional} from "class-validator";

export class UpdateCustomerAddressDto {
    @IsOptional()
    id: number;

    @IsOptional()
    address_type_id: number;

    @IsOptional()
    city_id: number;

    @IsOptional()
    is_main_address: boolean

    @IsOptional()
    detail_address: string


}
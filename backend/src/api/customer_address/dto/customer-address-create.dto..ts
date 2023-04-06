import { IsNotEmpty, IsOptional} from "class-validator";

export class CreateCustomerAddressDto {
    @IsOptional()
    id: number;

    @IsOptional()
    user_detail_id: number;

    @IsNotEmpty()
    address_type_id: number;

    @IsNotEmpty()
    city_id: number;

    @IsNotEmpty()
    is_main_address: boolean

    @IsNotEmpty()
    detail_address: string


}
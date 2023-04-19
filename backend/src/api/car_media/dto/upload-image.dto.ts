import { IsNotEmpty, IsOptional } from "class-validator";

export class UploadImageDto {
    @IsNotEmpty()
    car_id: number

    @IsOptional()
    is_main_image: boolean

    @IsOptional()
    image_url: string
}
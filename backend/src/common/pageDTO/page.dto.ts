import { IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "./page-meta.dto";

export class PageDto<T> {
    @IsArray()
    @ApiProperty({isArray: true})
    readonly cars: T[]

    @ApiProperty({type: () => PageMetaDto})
    readonly meta: PageMetaDto

    constructor(data: T[], meta: PageMetaDto) {
        this.meta = meta
        this.cars = data;
    }
    
}
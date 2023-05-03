import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { CarResponseInterceptor } from 'src/common/interceptorts/transform/car-response.interceptors';
import { PageCarOptionsDto } from 'src/common/pageDTO/page-car-options.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { CarProducerService } from 'src/jobs/queue/producer/car.produce.service';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/car-create.dto';
import { UpdateCarDto } from './dto/car-update.dto ';

@Controller('car')
@UseInterceptors(ClassSerializerInterceptor)
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly carProducerService: CarProducerService,
  ) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async createCar(
    @Body() payload: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateCarDto> {
    const car = await this.carService.createCar(payload, file);
    return car;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(CarResponseInterceptor, ClassSerializerInterceptor)
  async getCarPagination(
    @Query() pageOptionDto: PageCarOptionsDto,
  ): Promise<PageDto<CreateCarDto>> {
    return await this.carService.getAllCarPage(pageOptionDto);
  }

  @Get('/:id')
  async getCarById(@Param('id') id: number): Promise<any> {
    const result = await this.carProducerService.getById(id);
    return result.data;
  }

  @Put('/:id')
  @Roles(SecurityType.STAF)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwGuard, RolesGuard)
  async updateCar(
    @Param('id') id: number,
    @Body() payload: UpdateCarDto,
    @UploadedFile() file: Express.Multer.File[],
  ): Promise<void> {
    return this.carService.updateCar(id, payload, file);
  }

  
  @Delete('/:id')
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async deleteCar(@Param('id') id: number): Promise<any> {
    const result = this.carService.deleteCar(id);
    return result;
  }
}

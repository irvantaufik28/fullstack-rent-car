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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { PageOptionsDto } from 'src/common/pageDTO/page-options.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { CarProducerService } from '../queue/producer/car.produce.service';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/car-create.dto';

@Controller('car')
@UseInterceptors(ClassSerializerInterceptor)
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly carProducerService : CarProducerService
    ) {}
  @Post()
  // @Roles(SecurityType.STAF)
  // @UseGuards(JwGuard, RolesGuard)
  async createCar(@Body() payload: CreateCarDto): Promise<CreateCarDto> {
    const car = await this.carService.createCar(payload);
    return car;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCarPagination(
    @Query() pageOptionDto: PageOptionsDto,
  ): Promise<PageDto<CreateCarDto>> {
    return await this.carService.getAllCarPage(pageOptionDto);
  }

  @Get('/:id')
  async getCarById(@Param('id') id: number): Promise<any> {
    const result = await this.carProducerService.getById(id)
    return result.data
  }

  @Put('/:id')
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async updateCar(
    @Param('id') id: number,
    @Body() payload: CreateCarDto,
  ): Promise<void> {
    return this.carService.updateCar(id, payload);
  }
  @Delete('/:id')
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async deleteCar(@Param('id') id: number): Promise<any> {
    const result = this.carService.deleteCar(id);
    return result
  }
}

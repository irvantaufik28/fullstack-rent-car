import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { GetUser } from 'src/common/decorator/get-user.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { PageOptionsDto } from 'src/common/pageDTO/page-options.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { OrderProducerService } from 'src/jobs/queue/producer/order.produce.service'; 
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { PageOrderOptionsDto } from 'src/common/pageDTO/page-order-options.dto';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderProduceService: OrderProducerService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async gerOrderPagination(
    @Query() pageOptionsDto: PageOrderOptionsDto,
  ): Promise<PageDto<CreateOrderDto>> {
    console.log(pageOptionsDto)
    return this.orderService.adminGetAllOrderPage(pageOptionsDto);
  }

  @Post()
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async createOrderService(
    @Body() payload: CreateOrderDto,
    @GetUser() request: UserEntity,
  ): Promise<any> {
    // const order = await this.orderProduceService.createOrder(
    //   payload,
    //   request.id,
    // );
    const order = await this.orderService.createOrder(
      payload,
      request.id,
    );
return order
  }

  @Get('report')
  async getOrderReport(
    @Query('from') from?: string,
    @Query('until') until?: string
  ): Promise<any> {
    return await this.orderService.getOrderReport({from, until})
  }
}

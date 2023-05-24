import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { OrderEntity } from 'src/database/entities/order.entity';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderProduceService: OrderProducerService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  // @Roles(SecurityType.STAF)
  // @UseGuards(JwGuard, RolesGuard)
  async adminGetOrderPagination(
    @Query() pageOptionsDto: PageOrderOptionsDto,
  ): Promise<PageDto<CreateOrderDto>> {
    return this.orderService.adminGetAllOrderPage(pageOptionsDto);
  }

  @Get('/customer/list')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async customerGetOrderPagination(
    @Query() pageOptionsDto: PageOrderOptionsDto, @GetUser() request: UserEntity 
  ): Promise<PageDto<CreateOrderDto>> {
    return this.orderService.customerGetAllOrderPage(pageOptionsDto, request.id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async customerGetOrder(@Param('id') id: number) :Promise <OrderEntity> {
    const result = await this.orderService.customerGetOrder(id)
    return result
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

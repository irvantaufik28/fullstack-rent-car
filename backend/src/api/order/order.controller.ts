import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { UpdateOrderDto } from './dto/update-order.dto ';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderProduceService: OrderProducerService,
  ) {}

  // ADMIN CONTROLLER

  @Get('/admin')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async adminGetOrderPagination(
    @Query() pageOptionsDto: PageOrderOptionsDto,
  ): Promise<PageDto<CreateOrderDto>> {
    return this.orderService.adminGetAllOrderPage(pageOptionsDto);
  }

  @Get('/admin/report')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async getOrderReport(
    @Query('from') from?: string,
    @Query('until') until?: string,
  ): Promise<any> {
    return await this.orderService.adminGetOrderReport({ from, until });
  }

  @Get('/admin/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async adminGetOrder(@Param('id') id: number): Promise<OrderEntity> {
    const result = await this.orderService.adminGetOrder(id);
    return result;
  }
  @Patch('/admin/update/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async adminUpdateStatusOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    return await this.orderService.adminUpdateStatusOrder(id, updateOrderDto);
  }

  @Delete('/admin/delete/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async adminDeleteOrder(@Param('id') id: number): Promise<OrderEntity> {
    return await this.orderService.adminDeleteOrder(id);
  }

  // CUSTOMER CONTROLLER

  @Get('/customer/list')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async customerGetOrderPagination(
    @Query() pageOptionsDto: PageOrderOptionsDto,
    @GetUser() request: UserEntity,
  ): Promise<PageDto<CreateOrderDto>> {
    return this.orderService.customerGetAllOrderPage(
      pageOptionsDto,
      request.id,
    );
  }

  @Get('/customer/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async customerGetOrder(
    @Param('id') id: number,
    @GetUser() request: UserEntity,
  ): Promise<OrderEntity> {
    return await this.orderService.customerGetOrder(id, request.id);
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
    const order = await this.orderService.customerCreateOrder(
      payload,
      request.id,
    );
    return order;
  }

  @Patch('/customer/update/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async customerUpdateStatusOrder(
    @Param('id') id: number,
    @GetUser() request: UserEntity,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<void> {
    return await this.orderService.customerUpdateOrder(
      id,
      request.id,
      updateOrderDto, 
    );
  }

  @Delete('/customer/delete/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async customerDeleteOrder(
    @Param('id') id: number,
    @GetUser() request: UserEntity,
  ): Promise<void> {
    return await this.orderService.customerDeleteOrder(id, request.id);
  }
}

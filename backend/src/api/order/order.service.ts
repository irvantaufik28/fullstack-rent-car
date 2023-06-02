import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/common/pageDTO/page-options.dto';
import { CarRepository } from '../car/repository/car.repository';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { NotificationService } from '../notification/notification.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './repository/order.repository';
import { OrderStatus } from '../../common/internal/const/orderStatus';
import { OrderEntity } from 'src/database/entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto ';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly carRepository: CarRepository,
    private readonly notificationService: NotificationService,
  ) {}

  // ADMIN SERVICE
  async adminGetAllOrderPage(pageOptionsDto: PageOptionsDto): Promise<any> {
    const order = await this.orderRepository.adminGetAllOrderPagination(
      pageOptionsDto,
    );
    const res = {
      page: order.meta.page,
      pageSize: order.meta.take,
      pageCount: order.meta.pageCount,
      Count: order.meta.itemCount,
      orders: order.orders,
    };
    return res;
  }

  async adminGetOrder(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new HttpException('Order not Found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async adminUpdateStatusOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<any> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new HttpException('Order not Found', HttpStatus.NOT_FOUND);
    }

    return await this.orderRepository.updateOrder(id, updateOrderDto);
  }

  async adminGetOrderReport(params): Promise<any> {
    const orders = await this.orderRepository.orderReport(params);

    const orderCountByDate = {};
    for (const order of orders) {
      const orderDate = new Date(order.createdAt)
        .toISOString()
        .substring(0, 10);
      if (orderCountByDate[orderDate]) {
        orderCountByDate[orderDate]++;
      } else {
        orderCountByDate[orderDate] = 1;
      }
    }

    const result = Object.entries(orderCountByDate).map(
      ([date, orderCount]) => ({
        date,
        orderCount: orderCount,
      }),
    );

    return result;
  }

  async adminDeleteOrder(id: number): Promise<any> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await this.orderRepository.delete(id);
  }

  // CUSTOMER SERVICE

  async customerGetAllOrderPage(
    pageOptionsDto: PageOptionsDto,
    user_id: number,
  ): Promise<any> {
    const order = await this.orderRepository.customerGetAllOrdersPagination(
      pageOptionsDto,
      user_id,
    );
    const res = {
      page: order.meta.page,
      pageSize: order.meta.take,
      pageCount: order.meta.pageCount,
      Count: order.meta.itemCount,
      orders: order.orders,
    };
    return res;
  }

  async customerGetOrder(id: number, user_id: any): Promise<OrderEntity> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order || order.user_id !== user_id) {
      throw new HttpException('Order not Found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async customerCreateOrder(
    createOrderDto: CreateOrderDto,
    user_id: number,
  ): Promise<CreateOrderDto> {
    const car = await this.carRepository.getCarById(createOrderDto.car_id);
    console.log(car);
    if (!car) {
      const createNotificationDto: CreateNotificationDto = {
        recipient_id: 2,
        sender_id: user_id,
        content: `gagal ${user_id}`,
      };
      return await this.notificationService.createNotif(createNotificationDto);
    }
    if (car.status) {
      throw new HttpException('car not available', HttpStatus.NOT_FOUND);
    }

    const startDate = new Date(createOrderDto.start_rent_at);
    const finishDate = new Date(createOrderDto.finish_rent_at);
    const currentDate = new Date();

    if (startDate <= currentDate || finishDate <= currentDate) {
      throw new HttpException(
        "Can't place an order on a date earlier than today",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (startDate.getTime() >= finishDate.getTime()) {
      throw new HttpException(
        'Finish date should be greater than start date',
        HttpStatus.BAD_REQUEST,
      );
    }

    const milisecond = finishDate.getTime() - startDate.getTime();
    const days = Math.ceil(milisecond / (24 * 60 * 60 * 1000));
    const total_price = days * car.price;

    const order = await this.orderRepository.createOrder({
      ...createOrderDto,
      user_id,
      total_price,
      status: OrderStatus.PENDING,
    });

    const createNotificationDto: CreateNotificationDto = {
      recipient_id: 2,
      sender_id: user_id,
      content: `Ada Pesanan dari ${user_id}`,
    };
    await this.notificationService.createNotif(createNotificationDto);

    return order;
  }

 

  async customerDeleteOrder(id: number, user_id: any): Promise<void> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order || order.user_id !== user_id) {
      throw new HttpException('Order not Found', HttpStatus.NOT_FOUND);
    }
    await this.orderRepository.delete(id);
  }
  async customerUpdateOrder(
    id: number,
    user_id: any,
    updateOrderDto: UpdateOrderDto,
  ): Promise<void> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order || order.user_id !== user_id) {
      throw new HttpException('Order not Found', HttpStatus.NOT_FOUND);
    }
    return await this.orderRepository.updateOrder(id, updateOrderDto);
  }


}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/common/pageDTO/page-options.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { CarRepository } from '../car/repository/car.repository';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { NotificationService } from '../notification/notification.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly carRepository: CarRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async adminGetAllOrderPage(
    pageOptionsDto: PageOptionsDto,
  ): Promise<any> {
    const order = await this.orderRepository.adminGetAllOrderPagination(pageOptionsDto);
    const res = {
      page: order.meta.page,
      pageSize: order.meta.take,
      pageCount: order.meta.pageCount,
      Count: order.meta.itemCount,
      orders: order.orders
    }
    return res;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<CreateOrderDto> {
    const car = await this.carRepository.getCarById(createOrderDto.CarId);
    if (!car) {
      const createNotificationDto: CreateNotificationDto = {
        recipient_id: 2,
        sender_id: userId,
        content: `gagal ${userId}`,
      };

      await this.notificationService.createNotif(createNotificationDto);
    }
    if (car.status === true) {
      throw new HttpException('car not available', HttpStatus.NOT_FOUND);
    }
    createOrderDto.UserId = userId;
    createOrderDto.total_price = car.price;
    createOrderDto.status = false;
    createOrderDto.slip = 'ini slip';
    const order = await this.orderRepository.createOrder(createOrderDto);

    const updateCar = {
      status: true,
      start_rent_at: order.start_rent_at,
      finish_rent_at: order.finish_rent_at,
    };
    await this.carRepository.update(car.id, updateCar);

    const createNotificationDto: CreateNotificationDto = {
      recipient_id: 2,
      sender_id: userId,
      content: `Ada Pesanan dari ${userId}`,
    };

    await this.notificationService.createNotif(createNotificationDto);
    return order;
  }

  async getOrderReport(params): Promise<any> {
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
}

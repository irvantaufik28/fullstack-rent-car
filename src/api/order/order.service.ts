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

  async getAllOrderPage(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateOrderDto>> {
    const result = this.orderRepository.getAllOrderPagination(pageOptionsDto);
    return result;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<CreateOrderDto> {
    const car = await this.carRepository.getCarById(createOrderDto.CarId);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }
    // if (car.status === true) {
    //   throw new HttpException('car not available', HttpStatus.NOT_FOUND);
    // }
    createOrderDto.UserId = userId;
    createOrderDto.total_price = car.price;
    createOrderDto.status = true;
    createOrderDto.slip = 'ini slip';
    const order = await this.orderRepository.createOrder(createOrderDto);

    const updateCar = {
      status: true,
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
}

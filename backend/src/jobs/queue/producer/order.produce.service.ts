import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateOrderDto } from 'src/api/order/dto/create-order.dto';

@Injectable()
export class OrderProducerService {
  constructor(@InjectQueue('order-queue') private queue: Queue) {}

  async createOrder(createOrderDto: CreateOrderDto, user_id: number) {
    const payload = {
      data: createOrderDto,
      user_id,
    };
    const job = await this.queue.add('createOrder-job', payload);
    return job.id;
  }
}

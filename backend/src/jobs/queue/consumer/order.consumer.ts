import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateOrderDto } from 'src/api/order/dto/create-order.dto';
import { OrderService } from 'src/api/order/order.service';


@Processor('order-queue')
export class OrderCounsumer {
  constructor(private readonly orderService : OrderService){}
  @Process('createOrder-job')
  @Process('createOrder-job')
  async createOrder(
    job: Job<{ data: CreateOrderDto; user_id: number }>,
  )
  {
    const { user_id, data: createOrderDto } = job.data;
    
   await this.orderService.createOrder(createOrderDto, user_id);

  }
}

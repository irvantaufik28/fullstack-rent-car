import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlipEntity } from 'src/database/entities/slip.entity';
import { Repository } from 'typeorm';
import { CreateSlipDto } from './dto/create-slip.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { OrderRepository } from '../order/repository/order.repository';
import { OrderStatus } from '../../common/internal/const/orderStatus';
import { UpdateOrderDto } from '../order/dto/update-order.dto ';

@Injectable()
export class SlipService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly orderRepository: OrderRepository,
    @InjectRepository(SlipEntity)
    private readonly slipRepository: Repository<SlipEntity>,
  ) {}

  async createSlip(
    createSlipDto: CreateSlipDto,
    user_id: number,
    file: any,
  ): Promise<CreateSlipDto> {
    const order = await this.orderRepository.getOrderById(
      createSlipDto.order_id,
    );
    if (order.slip) {
      throw new HttpException(
        'slip is already sumbit, please wait for confirmations',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!file) {
      throw new HttpException('please insert file', HttpStatus.BAD_REQUEST);
    }
    const imageUrl = await this.cloudinaryService.uploadImage(file.buffer);
    createSlipDto.url_slip = imageUrl.url;
    createSlipDto.user_id = user_id;
    const slip = await this.slipRepository.save(createSlipDto);
    const updateOrderDto: UpdateOrderDto = {
      status: OrderStatus.SUBMITED,
    };

    await this.orderRepository.updateOrder(slip.order_id, updateOrderDto);

    return slip;
  }
}

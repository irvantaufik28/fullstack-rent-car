import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/pageDTO/page-meta.dto';
import { PageOptionsDto } from 'src/common/pageDTO/page-options.dto';
import { PageOrderOptionsDto } from 'src/common/pageDTO/page-order-options.dto';
import { PageOrderDto } from 'src/common/pageDTO/page-order.dto ';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { Raw, Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entity/order.entity';

export class OrderRepository extends Repository<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {
    super(
      orderRepository.target,
      orderRepository.manager,
      orderRepository.queryRunner,
    );
  }

  adminGetAllOrderPagination = async (
    pageOptionsDto: PageOrderOptionsDto,
  ): Promise<PageOrderDto<CreateOrderDto>> => {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    queryBuilder.leftJoinAndSelect('order.user', 'user')
    queryBuilder.where('user.id = order.UserId')
    queryBuilder.leftJoinAndSelect('order.car', 'car')
    queryBuilder.where('car.id = order.CarId')

    queryBuilder
      .orderBy('order.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageOrderDto(entities, pageMetaDto);
  };

  createOrder = async (
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderDto> => {
    const {
      total_price,
      start_rent_at,
      finish_rent_at,
      status,
      UserId,
      CarId,
    } = createOrderDto;
    const order = createOrderDto;

    order.total_price = total_price;
    order.start_rent_at = start_rent_at;
    order.finish_rent_at = finish_rent_at;
    order.status = status;
    order.UserId = UserId;
    order.CarId = CarId;
    return await this.orderRepository.save(order);
  };

  orderReport = async (params: {
    from: string;
    until: string;
  }): Promise<any> => {
    let filter = {};

    if (params.from !== '' && params.until !== '') {
      filter = {
        createdAt: Raw(
          (alias) => `DATE(${alias}) >= :date AND DATE(${alias}) <= :to`,
          {
            date: params.from,
            to: params.until,
          },
        ),
      };
    }
    const order = this.orderRepository.find({
      where: filter,
    });
    return order;
  };
}

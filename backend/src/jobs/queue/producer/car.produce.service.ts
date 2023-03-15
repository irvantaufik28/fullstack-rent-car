import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CarService } from 'src/api/car/car.service';

@Injectable()
export class CarProducerService {
  constructor(
    @InjectQueue('car-queue') private queue: Queue,
    private readonly carService: CarService,
  ) {}

  async getById(id: number) {
    const car = await this.carService.getCarById(id);
    const result = await this.queue.add('getAll-job', {
      data: car,
    });

    return result.data;
  }
}

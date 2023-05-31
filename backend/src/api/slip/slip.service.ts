import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlipEntity } from 'src/database/entities/slip.entity';
import { Repository } from 'typeorm';
import { CreateSlipDto } from './dto/create-slip.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class SlipService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(SlipEntity)
    private readonly slipRepository: Repository<SlipEntity>,
  ) {}

  async createSlip(
    createSlipDto: CreateSlipDto,
    user_id: number,
    file: any,
  ): Promise<CreateSlipDto> {
    if (!file) {
        throw new HttpException('please insert file', HttpStatus.BAD_REQUEST)
    }
    const imageUrl = await this.cloudinaryService.uploadImage(file.buffer);
    createSlipDto.url_slip = imageUrl.url;
    createSlipDto.user_id = user_id;
    return await this.slipRepository.save(createSlipDto);
  }
}

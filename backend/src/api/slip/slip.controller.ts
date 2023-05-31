import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SlipService } from './slip.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSlipDto } from './dto/create-slip.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('slip')
export class SlipController {
  constructor(private readonly slipService: SlipService) {}

  @Post('/post')
  @Roles(SecurityType.CUSTOMER)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwGuard, RolesGuard)
  async createSlip(
    @Body() payload: CreateSlipDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() request: UserEntity,
  ): Promise<any> {
    
    payload.user_id = request.id
    return this.slipService.createSlip(payload, request.id, file);
  }
}

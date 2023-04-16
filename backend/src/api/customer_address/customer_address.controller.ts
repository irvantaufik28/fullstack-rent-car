import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { CreateCustomerAddressDto } from './dto/customer-address-create.dto.';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { UserEntity } from 'src/database/entities/user.entity';
import { CustomerAddressService } from './customer_address.service';
import { CustomerAddressEntity } from 'src/database/entities/customer-address.entity';
import { UpdateCustomerAddressDto } from './dto/customer-address-update.dto.';

@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Get('main-address')
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async getMainAddress(@GetUser() request: UserEntity): Promise<any> {
    const getMainAddress = await this.customerAddressService.getMainAddress(
      request.id,
    );
    return getMainAddress;
  }

  @Get()
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async getAllCustomerAddress(
    @GetUser() request: UserEntity,
  ): Promise<CustomerAddressEntity[]> {
    return await this.customerAddressService.getAllUserAddress(request.id);
  }

  @Post()
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async createCustomerAddress(
    @Body() payload: CreateCustomerAddressDto,
    @GetUser() request: UserEntity,
  ): Promise<any> {
    const customeAddress =
      await this.customerAddressService.createCustomerAddress(
        payload,
        request.id,
      );
    return customeAddress;
  }

  @Put('/:id')
  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwGuard, RolesGuard)
  async updateCustomerAddress(
    @Param('id') address_id: number,
    @Body() payload: UpdateCustomerAddressDto,
    @GetUser() request: UserEntity,
  ): Promise<any> {
    return await this.customerAddressService.updateAddress(
      request.id,
      address_id,
      payload,
    );
  }
}

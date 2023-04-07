import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { CreateCustomerAddressDto } from './dto/customer-address-create.dto.';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { UserEntity } from 'src/database/entities/user.entity';
import { CustomerAddressService } from './customer_address.service';

@Controller('customer-address')
export class CustomerAddressController {
    constructor(
        private readonly customerAddressService: CustomerAddressService
    ) {}

    @Post()
    @Roles(SecurityType.CUSTOMER)
    @UseGuards(JwGuard, RolesGuard)
    async createCustomerAddress(
        @Body() payload: CreateCustomerAddressDto, 
        @GetUser() request: UserEntity): Promise<any> {
            const customeAddress = await this.customerAddressService.createCustomerAddress(payload, request.id)
            return customeAddress
        }
}

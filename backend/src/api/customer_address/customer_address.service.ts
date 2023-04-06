import { Injectable } from '@nestjs/common';
import { CustomerAddressRepository } from './repository/customer_address.repository';
import { CreateCustomerAddressDto } from './dto/customer-address-create.dto.';
import { UserService } from '../user/user.service';

@Injectable()
export class CustomerAddressService {
    constructor(
        private readonly customerAddressReopistory : CustomerAddressRepository,
        private readonly userService: UserService
    ) {}

    async createCustomerAddress(createCustomerAddressDto: CreateCustomerAddressDto, user_id: number):Promise<CreateCustomerAddressDto>  {
        const inculde: object = {
            user_detail: true,
          };
      
        const user = await this.userService.getUserById(user_id)
        console.log(user)
        createCustomerAddressDto.user_detail_id = user.user_detail.id
        return await this.customerAddressReopistory.createCustomerAddress(createCustomerAddressDto)
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerAddressRepository } from './repository/customer_address.repository';
import { CreateCustomerAddressDto } from './dto/customer-address-create.dto.';
import { UserService } from '../user/user.service';
import { CustomerAddressEntity } from 'src/database/entities/customer-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateCustomerAddressDto } from './dto/customer-address-update.dto.';

@Injectable()
export class CustomerAddressService {
  constructor(
    private readonly customerAddressCostumeReopistory: CustomerAddressRepository,
    private readonly userService: UserService,
    @InjectRepository(CustomerAddressEntity)
    private readonly customerAddressRepository: Repository<CustomerAddressEntity>,
  ) {}

  async createCustomerAddress(
    createCustomerAddressDto: CreateCustomerAddressDto,
    user_id: number,
  ): Promise<CreateCustomerAddressDto> {
    const user = await this.userService.getUserById(user_id);

    const customerAddress = await this.getAllUserAddress(user_id);
    if (customerAddress.length >= 3) {
      throw new HttpException(
        'cannot add address more then 3',
        HttpStatus.BAD_REQUEST,
      );
    }
    const mainAddress = await this.getMainAddress(user.id);
    if (mainAddress) {
      createCustomerAddressDto.is_main_address = false;
    } else {
      createCustomerAddressDto.is_main_address = true;
    }

    createCustomerAddressDto.user_detail_id = user.user_detail.id;
    return await this.customerAddressCostumeReopistory.createCustomerAddress(
      createCustomerAddressDto,
    );
  }

  async getMainAddress(user_id: number): Promise<CustomerAddressEntity> {
    const user = await this.userService.getUserById(user_id);
    const address = await this.customerAddressRepository.findOne({
      where: {
        user_detail_id: user.user_detail.id,
        is_main_address: true,
      },
    });
    if (!address) {
      throw new HttpException('main address not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }

  async getAllUserAddress(user_id: number): Promise<CustomerAddressEntity[]> {
    const user = await this.userService.getUserById(user_id);
    return await this.customerAddressRepository.find({
      where: {
        user_detail_id: user.user_detail.id,
      },
    });
  }

  async getAddressById(id: number): Promise<CustomerAddressEntity> {
    const address = await this.customerAddressRepository.findOneBy({
      id,
    });
    if (!address) {
      throw new HttpException('address not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }

  async updateAddress(
    user_id: number,
    address_id: number,
    payload: UpdateCustomerAddressDto,
  ): Promise<any> {
    const user = await this.userService.getUserById(user_id);
    const customerAddresses = await this.getAllUserAddress(user.user_detail.id);
    const address = await this.getAddressById(address_id);

    if (user.user_detail.id !== address.user_detail_id) {
      throw new HttpException('user not have access', HttpStatus.FORBIDDEN);
    }

    if (payload.is_main_address && customerAddresses.length > 1) {
      const mainAddress = await this.getMainAddress(user.user_detail.id);
      const { id, address_type_id, city_id, detail_address } = mainAddress;

      const updateMainAddress: UpdateCustomerAddressDto = {
        id,
        address_type_id,
        city_id,
        detail_address,
        is_main_address: false,
      };
      await this.customerAddressCostumeReopistory.updateCustomerAddress(
        mainAddress.id,
        updateMainAddress,
      );
    } else if (payload.is_main_address === false) {
      if (customerAddresses.length === 1) {
        throw new HttpException(
          'Cannot change primary address, there must be at least two addresses',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.customerAddressCostumeReopistory.updateCustomerAddress(
      address_id,
      payload,
    );
  }

  async deleteCustomerAddress(
    user_id: number,
    address_id: number,
  ): Promise<DeleteResult> {
    const user = await this.userService.getUserById(user_id);

    const address = await this.getAddressById(address_id);
    if (address.is_main_address === true) {
      throw new HttpException(
        'cannot delete main address',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.user_detail.id !== address.user_detail_id) {
      throw new HttpException('user not have access', HttpStatus.FORBIDDEN);
    }

    return await this.customerAddressRepository.delete({ id: address_id });
  }
}

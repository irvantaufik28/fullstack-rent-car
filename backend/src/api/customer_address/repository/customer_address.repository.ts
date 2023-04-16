import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAddressEntity } from 'src/database/entities/customer-address.entity';
import { Repository } from 'typeorm';
import { CreateCustomerAddressDto } from '../dto/customer-address-create.dto.';
import { UpdateCustomerAddressDto } from '../dto/customer-address-update.dto.';

export class CustomerAddressRepository extends Repository<CustomerAddressEntity> {
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private customerAddressRepository: Repository<CustomerAddressEntity>,
  ) {
    super(
      customerAddressRepository.target,
      customerAddressRepository.manager,
      customerAddressRepository.queryRunner,
    );
  }

  createCustomerAddress = async (createCustomerAddressDto: CreateCustomerAddressDto): Promise<CreateCustomerAddressDto> => {
    const {user_detail_id, city_id, is_main_address, detail_address, address_type_id} = createCustomerAddressDto

    const customeAddress = createCustomerAddressDto
    customeAddress.city_id = city_id
    customeAddress.is_main_address= is_main_address
    customeAddress.detail_address= detail_address
    customeAddress.user_detail_id = user_detail_id
    customeAddress.address_type_id = address_type_id

    return await this.customerAddressRepository.save(customeAddress)
  
  }
  
  updateCustomerAddress = async (id: number ,updateCustomerAddressDto: UpdateCustomerAddressDto): Promise<any> => {
    const {city_id, is_main_address, detail_address, address_type_id} = updateCustomerAddressDto

    const updateAddress = {
      city_id, is_main_address, detail_address, address_type_id
    }
    return await this.customerAddressRepository.update(id, updateAddress)
    
  }  



  
}

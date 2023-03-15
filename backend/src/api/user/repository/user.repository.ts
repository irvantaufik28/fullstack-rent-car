import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(createUSerDto: CreateUserDto): Promise<CreateUserDto> {
    const { email, password, confirm_password } = createUSerDto;
    const user = createUSerDto;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);
    user.confirm_password = confirm_password;

    if (!bcrypt.compareSync(user.confirm_password, user.password)) {
      throw new HttpException(
        'password and confirm password not match',
        HttpStatus.FORBIDDEN,
      );
    }
    const savedUser = await this.userRepository.save(user);
    delete savedUser.confirm_password;
    delete savedUser.password;

    return savedUser;
  }

  async findById(id: number, option: object = {}): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'email', 'role_name'],
      relations: option,
    });
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

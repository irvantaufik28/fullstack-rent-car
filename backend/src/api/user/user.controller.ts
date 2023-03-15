import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { SecurityType } from 'src/common/enum/enum'; 
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() payload: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userService.createUser(payload);
    return user;
  }

  @Get('profile')
  @Roles(SecurityType.CUSTOMER) 
  @UseGuards(JwGuard, RolesGuard)
  async getUserById(@GetUser() request: UserEntity): Promise<UserEntity> {
    const user = await this.userService.getUserById(request.id);

    return user;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const { userId, ...addressData } = createAddressDto;

    const user = await this.userService.findOne(userId).catch(() => undefined);

    if (!user) {
      throw new BadRequestException('Usuário informado não existe.');
    }

    const address = await this.prisma.address.create({
      data: {
        ...addressData,
        userId,
      },
      select: {
        id: true,
        street: true,
        number: true,
        zipCode: true,
        neighborhood: true,
        complement: true,
        state: true,
        userId: true,
      },
    });

    return address;
  }
}

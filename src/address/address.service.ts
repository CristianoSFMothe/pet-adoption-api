import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateAddressDto } from './dto/update-address.dto';

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

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) {
      throw new NotFoundException('Endereço não encontrado.');
    }

    if (updateAddressDto.userId) {
      const user = await this.userService
        .findOne(updateAddressDto.userId)
        .catch(() => undefined);
      if (!user) {
        throw new BadRequestException('Usuário informado não existe.');
      }
    }

    return this.prisma.address.update({
      where: { id },
      data: { ...updateAddressDto },
    });
  }

  async findAll() {
    return this.prisma.address.findMany({
      select: {
        id: true,
        street: true,
        number: true,
        zipCode: true,
        neighborhood: true,
        complement: true,
        state: true,
        user: {
          select: {
            name: true,
            email: true,
            phones: {
              select: {
                phoneNumber: true,
                isWhatsapp: true,
                isPrimary: true,
              },
            },
          },
        },
        pets: {
          select: {
            name: true,
            type: true,
            breed: true,
            isAvailableForAdoption: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      select: {
        id: true,
        street: true,
        number: true,
        zipCode: true,
        neighborhood: true,
        complement: true,
        state: true,
        user: {
          select: {
            name: true,
            email: true,
            phones: {
              select: {
                phoneNumber: true,
                isWhatsapp: true,
                isPrimary: true,
              },
            },
          },
        },
        pets: {
          select: {
            name: true,
            type: true,
            breed: true,
            isAvailableForAdoption: true,
          },
        },
      },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado ou não existe.');
    }

    return address;
  }
}

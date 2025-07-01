import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  async create(createPetDto: CreatePetDto) {
    const { ownerId, ownerAddressId, ...petData } = createPetDto;

    // Valida se o usuário existe
    await this.userService.findOne(ownerId).catch(() => {
      throw new BadRequestException(
        'Usuário informado não existe ou não foi encontrado.',
      );
    });

    // Valida se o endereço existe
    await this.addressService.findOne(ownerAddressId).catch(() => {
      throw new BadRequestException(
        'Endereço informado não existe ou não foi encontrado.',
      );
    });

    const pet = await this.prisma.pet.create({
      data: {
        ...petData,
        coatType: petData.coatType ?? null,
        ownerId,
        ownerAddressId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        breed: true,
        isPurebred: true,
        color: true,
        coatType: true,
        age: true,
        description: true,
        isAvailableForAdoption: true,
        imageUrl: true,
        ownerId: true,
        ownerAddressId: true,
      },
    });

    return pet;
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PhoneService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createPhoneDto: CreatePhoneDto) {
    const { userId, phoneNumber, ...phoneData } = createPhoneDto;

    const user = await this.userService.findOne(userId).catch(() => undefined);
    if (!user) {
      throw new BadRequestException(
        'Usuário informado não existe ou não encontrado.',
      );
    }

    const existingPhone = await this.prisma.phone.findFirst({
      where: { userId, phoneNumber },
    });

    if (existingPhone) {
      throw new ConflictException(
        'Este usuário já possui o número de telefone informado.',
      );
    }

    if (phoneData.isPrimary) {
      await this.prisma.phone.updateMany({
        where: { userId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    const phone = await this.prisma.phone.create({
      data: {
        ...phoneData,
        phoneNumber,
        userId,
      },
      select: {
        id: true,
        phoneNumber: true,
        isWhatsapp: true,
        isPrimary: true,
        userId: true,
      },
    });

    return phone;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    const { userId, ...phoneData } = updatePhoneDto;

    const phone = await this.prisma.phone.findUnique({ where: { id } });
    if (!phone) {
      throw new NotFoundException('Telefone não encontrado.');
    }

    await this.userService.findOne(userId).catch(() => {
      throw new BadRequestException(
        'Usuário informado não existe ou não encontrado.',
      );
    });

    if (phone.userId !== userId) {
      throw new BadRequestException(
        'Este telefone não pertence ao usuário informado.',
      );
    }

    return this.prisma.phone.update({
      where: { id },
      data: { ...phoneData },
      select: {
        id: true,
        phoneNumber: true,
        isWhatsapp: true,
        isPrimary: true,
        userId: true,
      },
    });
  }
}

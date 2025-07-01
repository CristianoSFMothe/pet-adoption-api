import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException(' Usuário ou senha incorretos.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        addresses: {
          select: {
            id: true,
            street: true,
            number: true,
            zipCode: true,
            neighborhood: true,
            complement: true,
            state: true,
          },
        },
        phones: {
          select: {
            id: true,
            phoneNumber: true,
            isWhatsapp: true,
            isPrimary: true,
          },
        },
      },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        addresses: {
          select: {
            id: true,
            street: true,
            number: true,
            zipCode: true,
            neighborhood: true,
            complement: true,
            state: true,
          },
        },
        phones: {
          select: {
            id: true,
            phoneNumber: true,
            isWhatsapp: true,
            isPrimary: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado ou não existe.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado ou não existe.');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailInUse = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailInUse) {
        throw new ConflictException('E-mail já está em uso por outro usuário.');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return updatedUser;
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado ou não existe.');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário removido com sucesso.' };
  }
}

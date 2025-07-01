import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [PrismaModule, UserModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

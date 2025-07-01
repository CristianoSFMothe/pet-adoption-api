import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [PrismaModule, UserModule, AddressModule, PhoneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

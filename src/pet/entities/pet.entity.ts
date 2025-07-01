import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { CoatType } from 'src/common/enums/coat-type.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  isPurebred: boolean;
  color: string;
  coatType: CoatType;
  age: number;
  description: string;
  isAvailableForAdoption: boolean;
  imageUrl: string;
  ownerId: string;
  owner?: CreateUserDto;
  ownerAddressId: string;
  ownerAddress?: CreateAddressDto;
  createdAt: Date;
  updatedAt: Date;
}

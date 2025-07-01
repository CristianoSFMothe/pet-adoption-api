import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post()
  create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phoneService.create(createPhoneDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phoneService.update(id, updatePhoneDto);
  }
}

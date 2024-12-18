import { Injectable } from '@nestjs/common';

import { CreateDiskDto } from './dto/create-disk.dto';
import { UpdateDiskDto } from './dto/update-disk.dto';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private readonly powerService: PowerService) {}

  getData() {
    console.log('Drawing 20 watts of power form PowerService');
    return 'Data!';
  }

  create(createDiskDto: CreateDiskDto) {
    return 'This action adds a new disk';
  }

  findAll() {
    return `This action returns all disk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disk`;
  }

  update(id: number, updateDiskDto: UpdateDiskDto) {
    return `This action updates a #${id} disk`;
  }

  remove(id: number) {
    return `This action removes a #${id} disk`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { CpuService } from '../cpu/cpu.service';
import { DiskService } from '../disk/disk.service';

@Injectable()
export class ComputerService {
  constructor(
    private readonly cpuService: CpuService,
    private readonly diskService: DiskService,
  ) {}

  run() {
    return [this.cpuService.compute(3, 5), this.diskService.getData()];
  }

  create(createComputerDto: CreateComputerDto) {
    return 'This action adds a new computer';
  }

  findAll() {
    return `This action returns all computer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} computer`;
  }

  update(id: number, updateComputerDto: UpdateComputerDto) {
    return `This action updates a #${id} computer`;
  }

  remove(id: number) {
    return `This action removes a #${id} computer`;
  }
}

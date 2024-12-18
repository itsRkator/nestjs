import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiskService } from './disk.service';
import { CreateDiskDto } from './dto/create-disk.dto';
import { UpdateDiskDto } from './dto/update-disk.dto';

@Controller('disk')
export class DiskController {
  constructor(private readonly diskService: DiskService) {}

  @Post()
  create(@Body() createDiskDto: CreateDiskDto) {
    return this.diskService.create(createDiskDto);
  }

  @Get()
  findAll() {
    return this.diskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiskDto: UpdateDiskDto) {
    return this.diskService.update(+id, updateDiskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diskService.remove(+id);
  }
}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComputerModule } from './computer/computer.module';
import { CpuModule } from './cpu/cpu.module';
import { PowerModule } from './power/power.module';
import { DiskModule } from './disk/disk.module';

@Module({
  imports: [ComputerModule, CpuModule, PowerModule, DiskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

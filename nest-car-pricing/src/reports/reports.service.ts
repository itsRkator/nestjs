import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto, user: User): Promise<Report> {
    const { price, make, model, year, mileage, lat, lng } = createReportDto;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const report = this.reportRepository.create({
      price,
      make,
      model,
      year,
      mileage,
      lat,
      lng,
      user,
    });

    await this.reportRepository.save(report);
    return report;
  }

  findAll() {
    return this.reportRepository.find();
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id}, data to be updated are ${JSON.stringify(updateReportDto)} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}

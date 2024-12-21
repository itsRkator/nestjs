import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { User } from '../users/entities/user.entity';
import { ApproveReportDto } from './dto/approve-report.dot';
import { GetEstimateDto } from './dto/get-estimate.dto';

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

  createEstimate(getEstimateDto: GetEstimateDto) {
    const { make, model, year, mileage, lat, lng } = getEstimateDto;

    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .andWhere('approved IS TRUE')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  findAll() {
    return this.reportRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id}, data to be updated are ${JSON.stringify(updateReportDto)} report`;
  }

  async updateApproval(id: number, approveReportDto: ApproveReportDto) {
    const { approved } = approveReportDto;
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    await this.reportRepository.save(report);

    return report;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}

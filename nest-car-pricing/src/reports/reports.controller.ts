import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { User } from '../users/entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportResponseDto } from './dto/report-response.dto';
import { ApproveReportDto } from './dto/approve-report.dot';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportResponseDto)
  createReport(
    @Body() createReportDto: CreateReportDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.reportsService.create(createReportDto, currentUser);
  }

  @Get('estimate')
  getEstimate(@Query() getEstimateDto: GetEstimateDto) {
    return this.reportsService.createEstimate(getEstimateDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Serialize(ReportResponseDto)
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Serialize(ReportResponseDto)
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Patch('approve/:id')
  @UseGuards(AdminGuard)
  @Serialize(ReportResponseDto)
  approveReport(
    @Param('id') id: string,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.reportsService.updateApproval(+id, approveReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}

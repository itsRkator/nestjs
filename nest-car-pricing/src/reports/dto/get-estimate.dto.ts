import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @IsNotEmpty()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsLongitude()
  lng: number;
}

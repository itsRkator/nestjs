import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1950)
  @Max(2050)
  year: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @IsLongitude()
  lng: number;
}

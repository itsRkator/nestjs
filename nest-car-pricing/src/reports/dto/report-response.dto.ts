import { Expose, Transform } from 'class-transformer';

export class ReportResponseDto {
  @Expose()
  id: number;

  @Expose()
  price: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => ({
    id: obj.user.id,
    name: obj.user.name,
  }))
  @Expose()
  user: {
    id: number;
    name: string;
  };
}

import { Expose } from 'class-transformer';

export class UserInfoDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

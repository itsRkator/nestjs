import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  make: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  model: string;

  @Column({ type: 'int', nullable: false })
  @IsNumber()
  @Min(1886) // The first car was invented in 1886
  @Max(new Date().getFullYear())
  @IsNotEmpty()
  year: number;

  @Column({ type: 'double', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  mileage: number;

  @Column({ type: 'double', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @Column({ type: 'double', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  lng: number;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  approved: boolean;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty()
  user: User;
}

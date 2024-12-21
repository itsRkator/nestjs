import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  make: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  model: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  year: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  mileage: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lat: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lng: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

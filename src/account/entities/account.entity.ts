import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from 'src/enum';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 55 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  PhoneNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ type: 'enum', enum: UserRole })
  roles: UserRole;
  @OneToMany(() => DoctorDetail, (doctorDetail) => doctorDetail.account)
  doctorDetail: DoctorDetail[];

  @OneToMany(() => UserDetail, (userDetail) => userDetail.account)
  userDetail:UserDetail[];
  

  @Column({ nullable: true })
  CreateDateColumn: string;
}

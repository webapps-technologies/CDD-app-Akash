import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
@Entity()
export class CaseHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  UserName: string;
  @Column({ type: 'text', nullable: true })
  DoctorName: string;

  @Column({ type: 'uuid', nullable: true })
  doctorId: string;
  
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({type: 'varchar', length: 50, nullable: true })
  UserAge: string;

  @Column({ type: 'text', nullable: true })
  UserGender: string;

  @ManyToOne(() => DoctorDetail, (doctorDetail) => doctorDetail.caseHistory)
  doctorDetail: DoctorDetail;

  @ManyToOne(() => UserDetail, (userDetail) => userDetail.caseHistory)
  userDetail: UserDetail;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  prescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

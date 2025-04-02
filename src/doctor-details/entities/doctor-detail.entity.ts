import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'src/enum';
import { Account } from 'src/account/entities/account.entity';
import { CaseHistory } from 'src/case-history/entities/case-history.entity';
@Entity()
export class DoctorDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  dob: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  specialization?: string;

  @Column({ nullable: true })
  collegeName?: string;

  @Column({ nullable: true })
  studyYear?: string;

  @Column({ nullable: true })
  clinicName?: string;

  @Column({ nullable: true })
  experienceYears?: number;

  @Column({ type: 'text', nullable: true })
  profileimage: string;

  @Column({ type: 'text', nullable: true })
  imagePath: string;

  @ManyToOne(() => Account, (account) => account.doctorDetail)
  account: Account;

  @OneToMany(() => CaseHistory, (caseHistory) => caseHistory.doctorDetail)
  caseHistory: CaseHistory[];
  
}

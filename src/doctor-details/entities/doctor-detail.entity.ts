import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'src/enum';
import { Account } from 'src/account/entities/account.entity';
import { CaseHistory } from 'src/case-history/entities/case-history.entity';
@Entity()
export class DoctorDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 55, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 55, nullable: true })
  email: string;

  @Column({ type: 'date',nullable: true  })
  dob: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @Column({  type: 'varchar', length: 55, nullable: true })
  designation: string;

  @Column({  type: 'varchar', length: 55, nullable: true })
  specialization: string;

  @Column({  type: 'varchar', length: 55, nullable: true})
  collegeName: string;

  @Column({ nullable: true })
  studyYear?: string;

  @Column({ nullable: true })
  clinicName?: string;

  @Column({type:'int', nullable: true})
  experienceYears: number;

  @Column({ type: 'text', nullable: true })
  profileimage: string;

  @Column({ type: 'text', nullable: true })
  profileimagePath: string;

  @ManyToOne(() => Account, (account) => account.doctorDetail)
  account: Account;

  @OneToMany(() => CaseHistory, (caseHistory) => caseHistory.doctorDetail)
  caseHistory: CaseHistory[];
  
}

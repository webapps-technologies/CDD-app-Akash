import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserGender, UserRole } from 'src/enum';

import { Account } from 'src/account/entities/account.entity';
import { CaseHistory } from 'src/case-history/entities/case-history.entity';

@Entity()
export class UserDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(({ type: 'varchar', length: 55, nullable: true }))
  name: string;

  @Column(({ type: 'varchar', length: 55, nullable: true }))
  email: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @Column({type: 'varchar', length: 50, nullable: true })
  age: string;

  @Column({ type: 'enum', enum: UserGender }) 
  gender: UserGender;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address : string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.userDetail)
  account: Account;

  @OneToMany(() => CaseHistory, (caseHistory) => caseHistory.userDetail)
    caseHistory: CaseHistory[];

  
}

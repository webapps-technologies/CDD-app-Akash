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

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: UserGender })
  gender: UserGender;

  @Column({ nullable: true })
  address : string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.userDetail)
  account: Account;

  @OneToMany(() => CaseHistory, (caseHistory) => caseHistory.userDetail)
    caseHistory: CaseHistory[];
  UserGender: string | undefined;
}

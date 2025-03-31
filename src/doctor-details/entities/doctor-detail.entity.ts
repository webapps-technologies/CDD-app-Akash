import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/enum";
import { Account } from "src/account/entities/account.entity";
@Entity()
export class DoctorDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column({ type: 'enum', enum:UserRole,  })  
    roles: UserRole;

    @Column({ type: 'date' })
    dob: string;
  
    @Column({ type: 'uuid', nullable: true })
    accountId: string;

    @Column({nullable:true})
    designation:string;
  
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

      @ManyToOne(() => Account, (account) => account.doctorDetail)
      account: Account;
}


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserRole } from 'src/enum';


@Entity()
export class UserDetail {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
    @Column()
    name: string;

    @Column()
    email: string;

  @Column({ type: 'enum', enum:UserRole,  })  
   roles: UserRole;

   @Column({ type: 'uuid', nullable: true })
   accountId: string;
  
    @Column()
    age: number;
    
    @Column()
    gender: 'Male' | 'Female' | 'Other';
  
  @Column({ nullable: true })
    contact: string;
  
 @Column({ nullable: true })
 medicalHistory: string;

    
  @CreateDateColumn()
  createdAt: Date; 

}

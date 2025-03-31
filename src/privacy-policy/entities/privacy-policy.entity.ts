import { DefaultStatus } from 'src/enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class PrivacyPolicy {
      @PrimaryGeneratedColumn('uuid')
      id: string;
    
      @Column({ type: 'text', nullable: false })
      title: string;
    
      @Column({ type: 'text', nullable: false })
      content: string;
    
    
      @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.PENDING })
      status: DefaultStatus;
    
      @CreateDateColumn()
      createdAt: Date;
    
      @UpdateDateColumn()
      updatedAt: Date;
    }
    


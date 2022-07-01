import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Ad from './Ad';
import Session from './Session';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  godMode: boolean;

  @CreateDateColumn({ select: false })
  created: Date;

  @UpdateDateColumn({ select: false })
  updated: Date;

  @DeleteDateColumn({ select: false })
  deleted: Date;

  @OneToMany(() => Ad, (ad) => ad.user)
  ads: Ad[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}

export default User;

import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    Generated,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import User from './User';


@Entity()
class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true })
    @Generated('uuid')
    token: string;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => User, (user) => user.sessions)
    user: User;
}

export default Session;
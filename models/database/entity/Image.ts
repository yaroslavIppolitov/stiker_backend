import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    DeleteDateColumn,
    ManyToMany
} from "typeorm";
import Ad from "./Ad";


@Entity()
class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ unique: true })
    link: string;

    @DeleteDateColumn()
    deleted: Date;

    @ManyToMany(() => Ad, (ad) => ad.images)
    ads: Ad[];
}

export default Image;
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  DeleteDateColumn
} from 'typeorm';
import Ad from './Ad';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToMany(() => Ad, (ad) => ad.categories)
  ads: Ad[];

  @DeleteDateColumn({ select: false })
  deleted: Date;
}

export default Category;

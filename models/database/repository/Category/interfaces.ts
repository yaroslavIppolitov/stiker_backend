import { IPagination } from "../../../../common/interfaces";

export interface ICategory {
  id: number;
  title: string;
  deleted: Date;
}

export type ICategoryCreateParams = Pick<ICategory, 'title'>;
export type ICategoryFindParams = Partial<Pick<ICategory, 'id' | 'title'>> & IPagination;
export type ICategoryUpdateParams = Pick<ICategory, 'id' | 'title'>;
export type ICategorySoftDeleteParams = Pick<ICategory, 'id'>;

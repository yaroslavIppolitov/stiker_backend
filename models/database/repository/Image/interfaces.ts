import { IPagination } from "../../../../common/interfaces";

export interface IImage {
  id: number;
  title: string;
  link: string;
  deleted: Date;
}

export type IIMageCreateParams = Pick<IImage, 'title' | 'link'>;
export type IIMageFindParams = Partial<Pick<IImage, 'id' | 'title' | 'link'>> & IPagination;
export type IIMageUpdateParams = Pick<IImage, 'id' | 'title' | 'link'>;
export type IIMageSoftDeleteParams = Pick<IImage, 'id'>;
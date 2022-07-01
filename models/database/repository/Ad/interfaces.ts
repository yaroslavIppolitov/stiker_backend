import { IPagination } from '../../../../common/interfaces';

interface IAdBase {
  title: string;
  description: string;
  cost: string;
  phone: string;
  address: string;
  viewCount: number;
  isVisible?: boolean;
  publicDate?: string;
}

export type IAdCreateParams = Omit<IAdBase, 'publicDate'> & {
  categoryIds?: number[];
  imageIds?: number[];
}

export type IAdFindParams = Partial<IAdBase> &
{
  id?: number;
  categoryIds?: number[];
}
  & IPagination;

export type IAdUpdateParams = Partial<IAdBase> & {
  id: number;
  categoryIds?: number[];
};

export interface IAdSoftDeleteParams {
  id: number;
}

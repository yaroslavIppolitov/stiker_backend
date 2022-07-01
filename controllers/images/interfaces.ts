import { Decorate } from '../../common/interfaces';
import {
  IIMageCreateParams,
  IIMageFindParams,
  IIMageUpdateParams,
  IIMageSoftDeleteParams,
} from '../../models/database/repository/Image/interfaces';

export type FindImageRequest = Decorate<{
  query: IIMageFindParams;
}>;

export type CreateImageRequest = Decorate<{
  payload: IIMageCreateParams;
}>;

export type UpdateImageRequest = Decorate<{
  payload: IIMageUpdateParams;
}>;

export type SoftDeleteImageRequest = Decorate<{
  params: IIMageSoftDeleteParams;
}>;

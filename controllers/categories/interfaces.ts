import { Decorate } from '../../common/interfaces';
import {
  ICategoryCreateParams,
  ICategoryFindParams,
  ICategoryUpdateParams,
  ICategorySoftDeleteParams,
} from '../../models/database/repository/Category/interfaces';

export type FindCategoryRequest = Decorate<{
  query: ICategoryFindParams;
}>;

export type CreateCategoryRequest = Decorate<{
  payload: ICategoryCreateParams;
}>;

export type UpdateCategoryRequest = Decorate<{
  payload: ICategoryUpdateParams;
}>;

export type SoftDeleteCategoryRequest = Decorate<{
  params: ICategorySoftDeleteParams;
}>;

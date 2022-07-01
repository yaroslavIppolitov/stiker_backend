import { Decorate } from '../../common/interfaces';

import {
  IUserCreateParams,
  IUserFindParams,
  IUserUpdateParams,
  IUserSoftDeleteParams,
  IUserLoginParams
} from '../../models/database/repository/User/interfaces';

export type CreateUserRequest = Decorate<{
  payload: IUserCreateParams;
}>;

export type FindUserRequest = Decorate<{
  query: IUserFindParams;
}>;

export type UpdateUserRequest = Decorate<{
  payload: IUserUpdateParams;
}>;

export type SoftDeleteUserRequest = Decorate<{
  payload: IUserSoftDeleteParams;
}>;

export type LoginUserRequest = Decorate<{
  payload: IUserLoginParams;
}>;

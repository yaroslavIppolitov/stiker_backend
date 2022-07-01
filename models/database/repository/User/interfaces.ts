import { IPagination } from '../../../../common/interfaces';

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  godMode: boolean;
  email: string;
  password: string;
}

export type IUserCreateParams = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>;
export type IUserFindParams = Partial<Pick<IUser, 'firstName' | 'lastName'>> & IPagination;
export type IUserUpdateParams = Partial<IUser>;
export type IUserSoftDeleteParams = Pick<IUser, 'id'>;
export type IUserLoginParams = Pick<IUser, 'email' | 'password'>;
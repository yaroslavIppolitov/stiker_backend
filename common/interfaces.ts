import * as Hapi from '@hapi/hapi';

export interface IPagination {
  limit: number;
  offset: number;
}

export interface ISort {
  sortDestination: 'ASC' | 'DESC';
  OrderBy: string;
}

export type Decorate<T> = Readonly<T> & Hapi.Request;

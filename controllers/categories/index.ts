import * as Boom from '@hapi/boom';
import CategoryRepository from '../../models/database/repository/Category';
import {
  CreateCategoryRequest,
  FindCategoryRequest,
  UpdateCategoryRequest,
  SoftDeleteCategoryRequest
} from './interfaces';

export default {
  createCategory: async (request: CreateCategoryRequest) => {
    try {
      return await CategoryRepository.create(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  findCategory: async (request: FindCategoryRequest) => {
    try {
      return CategoryRepository.find(request.query);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  changeCategory: async (request: UpdateCategoryRequest) => {
    try {
      return await CategoryRepository.update(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  softDeleteCategory: async (request: SoftDeleteCategoryRequest) => {
    try {
      return CategoryRepository.softDelete(request.params);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },
};

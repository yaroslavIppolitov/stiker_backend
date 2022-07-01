import * as Boom from '@hapi/boom';
import UserRepository from '../../models/database/repository/User';
import { CreateUserRequest, FindUserRequest, UpdateUserRequest, SoftDeleteUserRequest, LoginUserRequest } from './interfaces';

export default {
  createUser: async (request: CreateUserRequest) => {
    try {
      return await UserRepository.create(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  findUser: async (request: FindUserRequest) => {
    try {
      return UserRepository.find(request.query);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  updateUser: async (request: UpdateUserRequest) => {
    try {
      return await UserRepository.update(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  softDeleteUser: async (request: SoftDeleteUserRequest) => {
    try {
      return await UserRepository.softDelete(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  loginUser: async (request: LoginUserRequest) => {
    try {
      return await UserRepository.login(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },
  getSession: async (token: string) => {
    return await UserRepository.getSession(token);
  },
};

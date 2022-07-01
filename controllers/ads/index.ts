import * as Boom from '@hapi/boom';
import AdRepository from '../../models/database/repository/Ad';
import {
  CreateAdRequest,
  FindAdRequest,
  UpdateAdRequest,
  SoftDeleteAd,
} from './interfaces';

export default {
  create: async (request: CreateAdRequest) => {
    try {
      return await AdRepository.create(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  find: async (request: FindAdRequest) => {
    try {
      return AdRepository.find(request.query);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  update: async (request: UpdateAdRequest) => {
    try {
      return AdRepository.update(request.payload);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },

  softDelete: async (request: SoftDeleteAd) => {
    try {
      return AdRepository.softDelete(request.params);
    }
    catch (error) {
      return Boom.internal(error.message);
    }
  },
};
